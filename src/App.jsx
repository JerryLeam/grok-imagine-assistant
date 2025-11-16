import { useCallback, useEffect, useRef, useState } from 'react';
import { createGenerationStateMachine, getGlobalRetryCount } from './utils/generationStateMachine.ts';
import {
  DEFAULT_COOLDOWN_MS,
  DEFAULT_MAX_RETRIES,
  DEFAULT_ENHANCED_DETECTION,
  DEFAULT_AUTO_START,
  DEFAULT_AUTO_UPSCALE,
  loadCooldownMs,
  loadEnhancedDetection,
  loadAutoStartEnabled,
  loadAutoUpscaleEnabled,
  loadMaxRetries,
  saveCooldownMs,
  saveEnhancedDetection,
  saveAutoStartEnabled,
  saveAutoUpscaleEnabled,
  saveMaxRetries,
} from './utils/storage.js';
import './App.css';

function buildInitialSnapshot() {
  return {
    phase: 'idle',
    status: 'Idle',
    attempts: 0,
    cooldownActive: false,
    cooldownRemainingMs: 0,
    cooldownProgress: 0,
    autoSession: false,
    terminalReason: null,
    maxRetries: loadMaxRetries(),
    cooldownMs: loadCooldownMs(),
    enhancedDetection: loadEnhancedDetection(),
    autoStartEnabled: loadAutoStartEnabled(),
    autoUpscaleEnabled: loadAutoUpscaleEnabled(),
  };
}

// Floating controller powered by the generation state machine so Grok retries stay in sync.

function App() {
  const initialSnapshotRef = useRef(null);
  if (!initialSnapshotRef.current) {
    initialSnapshotRef.current = buildInitialSnapshot();
  }

  const [machineState, setMachineState] = useState(initialSnapshotRef.current);
  const [totalRetries, setTotalRetries] = useState(() => getGlobalRetryCount());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const machineRef = useRef(null);

  useEffect(() => {
    const machine = createGenerationStateMachine({
      maxRetries: initialSnapshotRef.current.maxRetries,
      cooldownMs: initialSnapshotRef.current.cooldownMs,
      enhancedDetection: initialSnapshotRef.current.enhancedDetection,
      autoStartEnabled: initialSnapshotRef.current.autoStartEnabled,
      autoUpscaleEnabled: initialSnapshotRef.current.autoUpscaleEnabled,
    });
    machineRef.current = machine;
    const unsubscribe = machine.subscribe((snapshot) => {
      setMachineState(snapshot);
      setTotalRetries(getGlobalRetryCount());
    });
    return () => {
      unsubscribe?.();
      machine.destroy();
      machineRef.current = null;
    };
  }, []);

  useEffect(() => {
    saveMaxRetries(machineState.maxRetries || DEFAULT_MAX_RETRIES);
  }, [machineState.maxRetries]);

  useEffect(() => {
    saveCooldownMs(machineState.cooldownMs || DEFAULT_COOLDOWN_MS);
  }, [machineState.cooldownMs]);

  useEffect(() => {
    saveEnhancedDetection(
      typeof machineState.enhancedDetection === 'boolean'
        ? machineState.enhancedDetection
        : DEFAULT_ENHANCED_DETECTION,
    );
  }, [machineState.enhancedDetection]);

  useEffect(() => {
    saveAutoStartEnabled(
      typeof machineState.autoStartEnabled === 'boolean'
        ? machineState.autoStartEnabled
        : DEFAULT_AUTO_START,
    );
  }, [machineState.autoStartEnabled]);

  useEffect(() => {
    saveAutoUpscaleEnabled(
      typeof machineState.autoUpscaleEnabled === 'boolean'
        ? machineState.autoUpscaleEnabled
        : DEFAULT_AUTO_UPSCALE,
    );
  }, [machineState.autoUpscaleEnabled]);

  const updateMachineConfig = useCallback((patch) => {
    if (machineRef.current) {
      machineRef.current.updateConfig(patch);
    } else {
      setMachineState((prev) => ({ ...prev, ...patch }));
    }
  }, []);

  const handleStart = useCallback(() => {
    machineRef.current?.armManual();
  }, []);

  const handleStop = useCallback(() => {
    machineRef.current?.stop('Stopped');
  }, []);

  const handleSliderChange = useCallback(
    (event) => {
      const value = Number(event.target.value);
      const safeValue = Number.isFinite(value) && value > 0 ? value : DEFAULT_MAX_RETRIES;
      updateMachineConfig({ maxRetries: safeValue });
    },
    [updateMachineConfig],
  );

  const handleCooldownChange = useCallback(
    (event) => {
      const value = Number(event.target.value);
      const safeValue = Number.isFinite(value) && value > 0 ? value : DEFAULT_COOLDOWN_MS;
      updateMachineConfig({ cooldownMs: Math.max(500, safeValue) });
    },
    [updateMachineConfig],
  );

  const handleEnhancedDetectionChange = useCallback(
    (event) => {
      updateMachineConfig({ enhancedDetection: Boolean(event.target.checked) });
    },
    [updateMachineConfig],
  );

  const handleAutoStartChange = useCallback(
    (event) => {
      updateMachineConfig({ autoStartEnabled: Boolean(event.target.checked) });
    },
    [updateMachineConfig],
  );

  const handleAutoUpscaleChange = useCallback(
    (event) => {
      updateMachineConfig({ autoUpscaleEnabled: Boolean(event.target.checked) });
    },
    [updateMachineConfig],
  );

  const handleManualUpscale = useCallback(() => {
    machineRef.current?.triggerManualUpscale?.();
  }, []);

  const toggleSettingsDrawer = useCallback(() => {
    setSettingsOpen((prev) => !prev);
  }, []);

  const progress = machineState.cooldownProgress || 0;
  const attempts = machineState.attempts ?? 0;
  const maxRetries = machineState.maxRetries || DEFAULT_MAX_RETRIES;
  const cooldownMsValue = machineState.cooldownMs || DEFAULT_COOLDOWN_MS;
  const cooldownRemainingMs = machineState.cooldownRemainingMs || 0;
  const cooldownSeconds = (cooldownRemainingMs / 1000).toFixed(1);
  const statusText = machineState.status || 'Idle';
  const canStart = machineState.phase === 'idle';
  const canStop = machineState.phase !== 'idle';

  return (
    <div className="grok-panel">
      <h1 className="grok-title">Grok Assistant</h1>
      <div className="grok-row">
        <div>
          <div className="grok-label">Status</div>
          <div className="grok-status">{statusText}</div>
        </div>
        <div className="grok-label">
          Attempts: {attempts}/{maxRetries}
        </div>
      </div>
      <div className="grok-row">
        <div className="grok-label">Total retries sent: {totalRetries}</div>
        <div className="grok-label">Phase: {machineState.phase}</div>
      </div>
      <div className="grok-slider-block">
        <label htmlFor="grok-retries">Max retries: {maxRetries}</label>
        <input
          id="grok-retries"
          type="range"
          min="1"
          max="20"
          value={maxRetries}
          onChange={handleSliderChange}
        />
      </div>
      <div className="grok-input-block">
        <label htmlFor="grok-cooldown">Cooldown (ms): {cooldownMsValue}</label>
        <input
          id="grok-cooldown"
          type="number"
          min="500"
          step="250"
          value={cooldownMsValue}
          onChange={handleCooldownChange}
        />
      </div>
      <div className="grok-progress" aria-live="polite">
        <div className="grok-progress-bar" style={{ width: `${progress}%` }} />
        <span>
          {machineState.cooldownActive
            ? `Retry in ${cooldownSeconds}s`
            : `No retry scheduled • ${Math.round(cooldownMsValue / 100) / 10}s cooldown`}
        </span>
      </div>
      <div className="grok-settings">
        <button
          type="button"
          className="grok-settings-toggle"
          onClick={toggleSettingsDrawer}
          aria-expanded={settingsOpen}
          aria-controls="grok-settings-drawer"
        >
          <span>Settings</span>
          <span className="grok-settings-icon" aria-hidden="true">
            {settingsOpen ? '−' : '+'}
          </span>
        </button>
        {settingsOpen && (
          <div id="grok-settings-drawer" className="grok-settings-drawer">
            <div className="grok-input-block grok-toggle">
              <label htmlFor="grok-enhanced" className="grok-label">
                Enhanced detection (progress + video checks)
              </label>
              <input
                id="grok-enhanced"
                type="checkbox"
                checked={Boolean(machineState.enhancedDetection)}
                onChange={handleEnhancedDetectionChange}
              />
              <span className="grok-hint">
                When enabled, retries fire if the progress pill disappears but no video renders.
              </span>
            </div>
            <div className="grok-input-block grok-toggle">
              <label htmlFor="grok-auto-start" className="grok-label">
                Auto start when Grok begins generating
              </label>
              <input
                id="grok-auto-start"
                type="checkbox"
                checked={Boolean(machineState.autoStartEnabled)}
                onChange={handleAutoStartChange}
              />
              <span className="grok-hint">
                Automatically arms monitoring once the percentage pill appears and stops after a
                successful video render.
              </span>
            </div>
            <div className="grok-input-block grok-toggle">
              <label htmlFor="grok-auto-upscale" className="grok-label">
                Auto upscale after successful generations
              </label>
              <input
                id="grok-auto-upscale"
                type="checkbox"
                checked={Boolean(machineState.autoUpscaleEnabled)}
                onChange={handleAutoUpscaleChange}
              />
              <span className="grok-hint">
                When enabled, the script opens the more options menu and clicks the third entry to
                trigger Grok's video upscaler after every detected success.
              </span>
              <button
                type="button"
                className="grok-inline-button"
                onClick={handleManualUpscale}
                disabled={!machineRef.current}
              >
                Trigger upscale now
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grok-actions">
        <button onClick={handleStart} disabled={!canStart}>
          Start
        </button>
        <button onClick={handleStop} disabled={!canStop}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
