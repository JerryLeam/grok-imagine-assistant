// Type declarations for untyped JavaScript modules
// @ts-ignore - grokAutomation.js is plain JavaScript without type definitions
import {
  startAutoStartMonitor,
  startGenerationCompletionMonitor,
  startGenerationStatusMonitor,
  startModerationMonitor,
  startQuotaLimitMonitor,
  triggerRetry,
  triggerVideoUpscale,
} from './grokAutomation.js';
// @ts-ignore - storage.js is plain JavaScript without type definitions
import {
  DEFAULT_AUTO_START,
  DEFAULT_AUTO_UPSCALE,
  DEFAULT_COOLDOWN_MS,
  DEFAULT_ENHANCED_DETECTION,
  DEFAULT_MAX_RETRIES,
} from './storage.js';

/*
TypeScript State Machine with Lifecycle Hooks
----------------------------------------------
This module implements a strongly-typed finite state machine for generation retry automation
with explicit state/transition management and lifecycle hooks for validation and side effects.

Architecture:
  - STATES: Registry of all valid states with allowed transitions
  - TRANSITIONS: Comprehensive list of all valid state transitions
  - Lifecycle hooks: onExitState → onBeforeTransition → state mutation → onAfterTransition → onEnterState
  - Global mutable context: allows config/state changes at any time while exposing immutable snapshots

Hook execution order (for each transitionTo call):
  1. onExitState[fromState]?.()     - cleanup for leaving state
  2. onBeforeTransition?.()          - validation (throws to abort transition)
  3. context mutation                - update global state
  4. onAfterTransition?.()           - side effects after state change
  5. onEnterState[toState]?.()       - setup for entering new state
*/

// ============================================================================
// Type Definitions
// ============================================================================

export type State = 'idle' | 'monitoring' | 'moderation' | 'waiting-video' | 'generating' | 'terminal';

export interface StateMachineConfig {
  maxRetries?: number;
  cooldownMs?: number;
  enhancedDetection?: boolean;
  autoStartEnabled?: boolean;
  autoUpscaleEnabled?: boolean;
}

export interface StateMachineContext {
  // State
  phase: State;
  status: string;
  attempts: number;
  
  // Cooldown tracking
  cooldownActive: boolean;
  cooldownRemainingMs: number;
  cooldownProgress: number;
  
  // Session tracking
  autoSession: boolean;
  terminalReason: string | null;
  
  // Configuration
  maxRetries: number;
  cooldownMs: number;
  enhancedDetection: boolean;
  autoStartEnabled: boolean;
  autoUpscaleEnabled: boolean;
}

export type TransitionHook = (
  from: State,
  to: State,
  context: Readonly<StateMachineContext>
) => void | Promise<void>;

export interface LifecycleHooks {
  onBeforeTransition?: TransitionHook;
  onAfterTransition?: TransitionHook;
  onEnterState?: Partial<Record<State, TransitionHook>>;
  onExitState?: Partial<Record<State, TransitionHook>>;
}

export interface RetryTriggerEvent {
  reason?: 'moderation' | 'no-video';
  message?: string;
}

export interface QuotaLimitEvent {
  message?: string;
}

interface StateDefinition {
  description: string;
  allowedTransitions: State[];
}

type SubscriberCallback = (context: StateMachineContext) => void;
type CleanupFunction = () => void;

// ============================================================================
// State & Transition Registry
// ============================================================================

/**
 * Centralized registry of all states with their metadata and allowed outbound transitions.
 * This provides compile-time guarantees that only valid transitions are attempted.
 */
const STATES: Record<State, StateDefinition> = {
  idle: {
    description: 'System disarmed; Start or auto-start events transition to monitoring.',
    allowedTransitions: ['monitoring'],
  },
  monitoring: {
    description: 'Observers armed; moderation/anomaly events schedule retries; stop returns to idle.',
    allowedTransitions: ['idle', 'moderation', 'waiting-video', 'generating', 'terminal'],
  },
  moderation: {
    description: 'Cooldown running because a moderation toast fired; transitions to retry once timer fires.',
    allowedTransitions: ['idle', 'generating'],
  },
  'waiting-video': {
    description: 'Cooldown running because progress vanished without video; transitions to retry once timer fires.',
    allowedTransitions: ['idle', 'generating'],
  },
  generating: {
    description: 'Retry button clicked; when Grok shows progress we stay in monitoring, otherwise auto-complete resets to idle.',
    allowedTransitions: ['idle', 'monitoring'],
  },
  terminal: {
    description: 'Automation halted due to quota limit or external signal; Stop moves back to idle.',
    allowedTransitions: ['idle'],
  },
} as const;

/**
 * Comprehensive list of all valid state transitions with descriptions.
 * This serves as documentation and can be used for transition validation or visualization.
 */
export const TRANSITIONS = [
  { from: 'idle', to: 'monitoring', description: 'Manual arm or auto-start trigger' },
  { from: 'monitoring', to: 'idle', description: 'Manual stop or config change' },
  { from: 'monitoring', to: 'moderation', description: 'Moderation toast detected' },
  { from: 'monitoring', to: 'waiting-video', description: 'Progress lost without video' },
  { from: 'monitoring', to: 'generating', description: 'Direct retry trigger' },
  { from: 'monitoring', to: 'terminal', description: 'Quota limit reached' },
  { from: 'moderation', to: 'generating', description: 'Cooldown expired, retry scheduled' },
  { from: 'moderation', to: 'idle', description: 'Max retries reached or manual stop' },
  { from: 'waiting-video', to: 'generating', description: 'Cooldown expired, retry scheduled' },
  { from: 'waiting-video', to: 'idle', description: 'Max retries reached or manual stop' },
  { from: 'generating', to: 'idle', description: 'Generation complete or max retries reached' },
  { from: 'generating', to: 'monitoring', description: 'Retry successful, continue monitoring' },
  { from: 'terminal', to: 'idle', description: 'Manual stop to reset' },
] as const;

// ============================================================================
// Module-Level State (Global Mutable Context)
// ============================================================================

let globalRetryCount = 0;
const SUCCESS_DEBOUNCE_MS = 1000;

// Sanitization utilities
function sanitizePositiveInteger(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return Math.floor(numeric);
  }
  return fallback;
}

function sanitizeCooldown(value: unknown): number {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric >= 500) {
    return numeric;
  }
  return Math.max(500, DEFAULT_COOLDOWN_MS);
}

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  return Boolean(fallback);
}

export function getGlobalRetryCount(): number {
  return globalRetryCount;
}

// ============================================================================
// State Machine Factory
// ============================================================================

export function createGenerationStateMachine(initialConfig: StateMachineConfig = {}) {
  const subscribers = new Set<SubscriberCallback>();

  const contextDefaults: Omit<StateMachineContext, 'maxRetries' | 'cooldownMs' | 'enhancedDetection' | 'autoStartEnabled' | 'autoUpscaleEnabled'> = {
    phase: 'idle',
    status: 'Idle',
    attempts: 0,
    cooldownActive: false,
    cooldownRemainingMs: 0,
    cooldownProgress: 0,
    autoSession: false,
    terminalReason: null,
  };

  // Global mutable context - can be modified at any time
  let context: StateMachineContext = {
    ...contextDefaults,
    maxRetries: sanitizePositiveInteger(initialConfig.maxRetries, DEFAULT_MAX_RETRIES),
    cooldownMs: sanitizeCooldown(initialConfig.cooldownMs ?? DEFAULT_COOLDOWN_MS),
    enhancedDetection: asBoolean(initialConfig.enhancedDetection, DEFAULT_ENHANCED_DETECTION),
    autoStartEnabled: asBoolean(initialConfig.autoStartEnabled, DEFAULT_AUTO_START),
    autoUpscaleEnabled: asBoolean(initialConfig.autoUpscaleEnabled, DEFAULT_AUTO_UPSCALE),
  };

  // Side-effect state (timers, cleanup functions)
  let moderationCleanup: CleanupFunction | null = null;
  let anomalyCleanup: CleanupFunction | null = null;
  let quotaCleanup: CleanupFunction | null = null;
  let successCleanup: CleanupFunction | null = null;
  let autoStartCleanup: CleanupFunction | null = null;
  let cooldownInterval: number | null = null;
  let cooldownTimeout: number | null = null;
  let pendingRetry = false;
  let autoUpscaleInFlight = false;
  let lastSuccessTs = 0;

  // ============================================================================
  // Notification System
  // ============================================================================

  const notify = (): void => {
    const snapshot = { ...context };
    subscribers.forEach((listener) => {
      try {
        listener(snapshot);
      } catch (error) {
        console.error('[generationStateMachine] subscriber error', error);
      }
    });
  };

  const setContext = (patch: Partial<StateMachineContext>): void => {
    context = { ...context, ...patch };
    notify();
  };

  // ============================================================================
  // Lifecycle Hook Infrastructure
  // ============================================================================

  const lifecycleHooks: LifecycleHooks = {
    onExitState: {},
    onEnterState: {},
  };

  /**
   * Core transition function with lifecycle hook execution.
   * Validates transition, executes hooks in order, and mutates global context.
   * 
   * Hook execution order:
   *   1. onExitState[from] - cleanup
   *   2. onBeforeTransition - validation (throws to abort)
   *   3. context mutation
   *   4. onAfterTransition - side effects
   *   5. onEnterState[to] - setup
   */
  const transitionTo = async (
    newState: State,
    contextPatch: Partial<StateMachineContext> = {},
    customHooks?: Partial<LifecycleHooks>
  ): Promise<void> => {
    const fromState = context.phase;

    // Validate transition
    if (!STATES[fromState].allowedTransitions.includes(newState)) {
      const error = new Error(
        `Invalid transition from "${fromState}" to "${newState}". ` +
        `Allowed transitions: ${STATES[fromState].allowedTransitions.join(', ')}`
      );
      console.error('[generationStateMachine]', error.message);
      throw error;
    }

    try {
      // 1. onExitState hook for cleanup
      const exitHook = customHooks?.onExitState?.[fromState] ?? lifecycleHooks.onExitState?.[fromState];
      if (exitHook) {
        await exitHook(fromState, newState, context);
      }

      // 2. onBeforeTransition hook for validation
      const beforeHook = customHooks?.onBeforeTransition ?? lifecycleHooks.onBeforeTransition;
      if (beforeHook) {
        await beforeHook(fromState, newState, context);
      }

      // 3. Mutate context
      context = {
        ...context,
        ...contextPatch,
        phase: newState,
      };
      notify();

      // 4. onAfterTransition hook for side effects
      const afterHook = customHooks?.onAfterTransition ?? lifecycleHooks.onAfterTransition;
      if (afterHook) {
        await afterHook(fromState, newState, context);
      }

      // 5. onEnterState hook for setup
      const enterHook = customHooks?.onEnterState?.[newState] ?? lifecycleHooks.onEnterState?.[newState];
      if (enterHook) {
        await enterHook(fromState, newState, context);
      }
    } catch (error) {
      // Hook errors during validation (onBeforeTransition) should abort transition
      // Hook errors during side effects should log but not rollback
      console.error('[generationStateMachine] transition hook error:', error);
      
      // Re-throw validation errors to prevent transition
      if (error instanceof Error && error.message.includes('validation')) {
        throw error;
      }
      
      // Log side-effect errors but continue
      console.warn('[generationStateMachine] continuing despite side-effect error');
    }
  };

  /**
   * Synchronous transition wrapper for simpler non-async cases.
   * Schedules async hook execution but returns immediately.
   */
  const transitionToSync = (
    newState: State,
    contextPatch: Partial<StateMachineContext> = {}
  ): void => {
    transitionTo(newState, contextPatch).catch((error) => {
      console.error('[generationStateMachine] async transition error:', error);
    });
  };

  // ============================================================================
  // Cleanup & Setup Functions (Used by Lifecycle Hooks)
  // ============================================================================

  const stopCooldownTimers = (): void => {
    if (cooldownInterval !== null) {
      clearInterval(cooldownInterval);
      cooldownInterval = null;
    }
    if (cooldownTimeout !== null) {
      clearTimeout(cooldownTimeout);
      cooldownTimeout = null;
    }
    pendingRetry = false;
    setContext({ cooldownActive: false, cooldownRemainingMs: 0, cooldownProgress: 0 });
  };

  const stopPrimaryMonitors = (): void => {
    moderationCleanup?.();
    moderationCleanup = null;
    anomalyCleanup?.();
    anomalyCleanup = null;
    quotaCleanup?.();
    quotaCleanup = null;
    successCleanup?.();
    successCleanup = null;
    lastSuccessTs = 0;
    autoUpscaleInFlight = false;
  };

  const startPrimaryMonitors = (): void => {
    stopPrimaryMonitors();
    moderationCleanup = startModerationMonitor(handleRetryTrigger);
    if (context.enhancedDetection) {
      anomalyCleanup = startGenerationStatusMonitor(handleRetryTrigger);
    }
    quotaCleanup = startQuotaLimitMonitor((event: QuotaLimitEvent) => {
      const message = event?.message?.trim() || 'Image limit reached. Upgrade to continue.';
      enterTerminal('quota-limit', message);
    });
    successCleanup = startGenerationCompletionMonitor(handleGenerationSuccess);
  };

  const cleanupAll = (): void => {
    stopCooldownTimers();
    stopPrimaryMonitors();
    autoStartCleanup?.();
    autoStartCleanup = null;
  };

  // ============================================================================
  // State-Specific Lifecycle Hooks
  // ============================================================================

  // Cleanup hooks for states that manage resources
  lifecycleHooks.onExitState = {
    monitoring: () => {
      // Keep monitors running if transitioning to active retry states
      if (context.phase === 'moderation' || context.phase === 'waiting-video' || context.phase === 'generating') {
        return;
      }
      stopPrimaryMonitors();
    },
    moderation: () => {
      stopCooldownTimers();
    },
    'waiting-video': () => {
      stopCooldownTimers();
    },
    terminal: () => {
      stopPrimaryMonitors();
    },
  };

  // Setup hooks for states that need initialization
  lifecycleHooks.onEnterState = {
    monitoring: () => {
      startPrimaryMonitors();
    },
    idle: () => {
      // Reset retry-specific state when returning to idle
      pendingRetry = false;
    },
  };

  // ============================================================================
  // State Transition Helpers
  // ============================================================================

  const transitionToIdle = (statusMessage = 'Idle'): void => {
    stopCooldownTimers();
    stopPrimaryMonitors();
    pendingRetry = false;
    
    const patch: Partial<StateMachineContext> = {
      ...contextDefaults,
      status: statusMessage,
      maxRetries: context.maxRetries,
      cooldownMs: context.cooldownMs,
      enhancedDetection: context.enhancedDetection,
      autoStartEnabled: context.autoStartEnabled,
      autoUpscaleEnabled: context.autoUpscaleEnabled,
    };
    
    transitionToSync('idle', patch);
  };

  const enterTerminal = (reason: string = 'unknown', message = 'Terminal state reached'): void => {
    stopCooldownTimers();
    stopPrimaryMonitors();
    pendingRetry = false;
    
    transitionToSync('terminal', {
      status: message,
      autoSession: false,
      terminalReason: reason,
      cooldownActive: false,
      cooldownRemainingMs: 0,
      cooldownProgress: 0,
    });
  };

  // ============================================================================
  // Retry Logic
  // ============================================================================

  const performRetry = (): void => {
    const nextAttempt = context.attempts + 1;
    if (nextAttempt > context.maxRetries) {
      transitionToIdle(`Reached max retries (${context.maxRetries})`);
      return;
    }

    const clicked = triggerRetry();
    if (!clicked) {
      transitionToIdle('Retry button not available');
      return;
    }

    globalRetryCount += 1;
    transitionToSync('generating', {
      attempts: nextAttempt,
      status: `Retry ${nextAttempt}/${context.maxRetries} sent`,
    });

    if (nextAttempt >= context.maxRetries) {
      transitionToIdle(`Reached max retries (${context.maxRetries})`);
    }
  };

  const scheduleRetry = (reason: 'moderation' | 'no-video' = 'moderation'): void => {
    if (pendingRetry) return;
    if (context.attempts >= context.maxRetries) {
      transitionToIdle(`Reached max retries (${context.maxRetries})`);
      return;
    }

    pendingRetry = true;
    const waitMs = Math.max(500, context.cooldownMs || DEFAULT_COOLDOWN_MS);
    const startTs = Date.now();
    const statusMessage =
      reason === 'no-video'
        ? 'Progress finished without video. Scheduling retry...'
        : 'Content moderated. Scheduling retry...';
    
    const targetState: State = reason === 'no-video' ? 'waiting-video' : 'moderation';
    
    transitionToSync(targetState, {
      status: statusMessage,
      cooldownActive: true,
      cooldownRemainingMs: waitMs,
      cooldownProgress: 0,
    });

    cooldownInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTs;
      const pct = Math.min(100, (elapsed / waitMs) * 100);
      setContext({
        cooldownRemainingMs: Math.max(0, waitMs - elapsed),
        cooldownProgress: pct,
      });
    }, 100);

    cooldownTimeout = window.setTimeout(() => {
      stopCooldownTimers();
      performRetry();
    }, waitMs);
  };

  const handleRetryTrigger = (event?: RetryTriggerEvent): void => {
    if (context.phase === 'idle' || context.phase === 'terminal') {
      return;
    }
    if (context.attempts >= context.maxRetries) {
      transitionToIdle(`Reached max retries (${context.maxRetries})`);
      return;
    }
    if (pendingRetry) {
      return;
    }
    scheduleRetry(event?.reason === 'no-video' ? 'no-video' : 'moderation');
  };

  // ============================================================================
  // Auto-Upscale Logic
  // ============================================================================

  const queueAutoUpscale = ({ force = false, reason = 'auto' }: { force?: boolean; reason?: 'auto' | 'manual' } = {}): Promise<boolean> | null => {
    if (!force && !context.autoUpscaleEnabled) return null;
    if (!force && (context.phase === 'idle' || context.phase === 'terminal')) return null;
    if (autoUpscaleInFlight) return null;
    
    autoUpscaleInFlight = true;
    const label = reason === 'manual' ? 'Manual' : 'Auto';
    setContext({ status: `${label} upscale triggered. Opening menu…` });

    const operation = Promise.resolve(triggerVideoUpscale())
      .then((clicked) => {
        if (!force && (context.phase === 'idle' || context.phase === 'terminal')) {
          return clicked;
        }
        setContext({
          status: clicked
            ? `${label} upscale requested successfully.`
            : `${label} upscale unavailable (menu entry missing).`,
        });
        return clicked;
      })
      .catch((error) => {
        console.error('[generationStateMachine] auto-upscale error', error);
        if (!force && (context.phase === 'idle' || context.phase === 'terminal')) {
          return false;
        }
        setContext({ status: `${label} upscale failed. Check console for details.` });
        return false;
      })
      .finally(() => {
        autoUpscaleInFlight = false;
      });

    return operation;
  };

  const handleGenerationSuccess = (): void => {
    if (context.phase === 'idle' || context.phase === 'terminal') {
      return;
    }
    const now = Date.now();
    if (now - lastSuccessTs < SUCCESS_DEBOUNCE_MS) {
      return;
    }
    lastSuccessTs = now;
    if (context.autoUpscaleEnabled) {
      queueAutoUpscale();
    }
  };

  // ============================================================================
  // Auto-Start Logic
  // ============================================================================

  const arm = (source: 'manual' | 'auto' = 'manual'): boolean => {
    if (context.phase !== 'idle') {
      return false;
    }
    
    transitionToSync('monitoring', {
      status:
        source === 'auto'
          ? 'Auto start armed. Watching this generation.'
          : 'Armed. Waiting for moderation.',
      attempts: 0,
      autoSession: source === 'auto',
      terminalReason: null,
    });
    
    return true;
  };

  const handleAutoGenerationStart = (): void => {
    if (!context.autoStartEnabled) return;
    arm('auto');
  };

  const handleAutoGenerationComplete = (): void => {
    if (!context.autoStartEnabled) return;
    if (!context.autoSession) return;
    transitionToIdle('Generation succeeded. Auto start idle.');
  };

  const refreshAutoStartMonitor = (): void => {
    autoStartCleanup?.();
    autoStartCleanup = null;
    if (!context.autoStartEnabled) {
      return;
    }
    autoStartCleanup = startAutoStartMonitor({
      onGenerationStart: handleAutoGenerationStart,
      onGenerationComplete: handleAutoGenerationComplete,
    });
  };

  refreshAutoStartMonitor();

  // ============================================================================
  // Configuration Updates
  // ============================================================================

  const updateConfig = (partial: StateMachineConfig = {}): void => {
    const next = { ...context };
    
    if (Object.prototype.hasOwnProperty.call(partial, 'maxRetries')) {
      next.maxRetries = sanitizePositiveInteger(partial.maxRetries, context.maxRetries);
    }
    if (Object.prototype.hasOwnProperty.call(partial, 'cooldownMs')) {
      next.cooldownMs = sanitizeCooldown(partial.cooldownMs);
    }
    if (Object.prototype.hasOwnProperty.call(partial, 'enhancedDetection')) {
      next.enhancedDetection = Boolean(partial.enhancedDetection);
    }
    if (Object.prototype.hasOwnProperty.call(partial, 'autoStartEnabled')) {
      next.autoStartEnabled = Boolean(partial.autoStartEnabled);
    }
    if (Object.prototype.hasOwnProperty.call(partial, 'autoUpscaleEnabled')) {
      next.autoUpscaleEnabled = Boolean(partial.autoUpscaleEnabled);
    }
    
    context = next;
    notify();

    if (context.phase !== 'idle' && context.phase !== 'terminal') {
      startPrimaryMonitors();
    }
    if (Object.prototype.hasOwnProperty.call(partial, 'autoStartEnabled')) {
      refreshAutoStartMonitor();
    }
  };

  // ============================================================================
  // Public API
  // ============================================================================

  return {
    getSnapshot(): StateMachineContext {
      return { ...context };
    },
    
    subscribe(listener: SubscriberCallback): CleanupFunction {
      if (typeof listener !== 'function') {
        return () => {};
      }
      subscribers.add(listener);
      listener({ ...context });
      return () => {
        subscribers.delete(listener);
      };
    },
    
    armManual(): boolean {
      return arm('manual');
    },
    
    stop(message = 'Stopped'): void {
      transitionToIdle(message);
    },
    
    updateConfig(partial: StateMachineConfig): void {
      updateConfig(partial);
    },
    
    signalTerminal(reason: string, message: string): void {
      enterTerminal(reason, message);
    },
    
    triggerManualUpscale(): Promise<boolean> | null {
      return queueAutoUpscale({ force: true, reason: 'manual' });
    },
    
    destroy(): void {
      cleanupAll();
      subscribers.clear();
    },
  };
}
