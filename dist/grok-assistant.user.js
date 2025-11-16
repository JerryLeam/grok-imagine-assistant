// ==UserScript==
// @name         grok-assistant
// @namespace    npm/vite-plugin-monkey
// @version      0.1.0
// @author       Huipp
// @icon         https://vitejs.dev/logo.svg
// @downloadURL  https://github.com/JerryLeam/grok-imagine-assistant/raw/refs/heads/main/dist/grok-assistant.user.js
// @updateURL    https://github.com/JerryLeam/grok-imagine-assistant/raw/refs/heads/main/dist/grok-assistant.user.js
// @match        https://grok.com/imagine/post/*
// @require      https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js
// @require      https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const r=document.createElement("style");r.textContent=o,document.head.append(r)})(" .grok-panel{position:fixed;bottom:20px;right:20px;width:320px;padding:16px;border-radius:16px;background:#09090be6;color:#f8fafc;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 10px 30px #00000059;border:1px solid rgba(148,163,184,.35);z-index:2147483647;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}.grok-title{margin:0 0 12px;font-size:1.1rem}.grok-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px}.grok-label{font-size:.85rem;color:#cbd5f5}.grok-status{font-size:.95rem;font-weight:600;margin-top:4px}.grok-slider-block{margin-bottom:14px}.grok-slider-block label{display:block;margin-bottom:6px;font-size:.85rem;color:#e2e8f0}.grok-slider-block input[type=range]{width:100%;cursor:pointer;accent-color:#38bdf8}.grok-input-block{margin-bottom:14px}.grok-input-block label{display:block;margin-bottom:6px;font-size:.85rem;color:#e2e8f0}.grok-input-block input{width:100%;border-radius:10px;border:1px solid rgba(148,163,184,.5);background:#0f172a99;color:#f8fafc;padding:6px 10px;font-size:.95rem;outline:none}.grok-input-block input:focus{border-color:#38bdf8;box-shadow:0 0 0 1px #38bdf866}.grok-progress{position:relative;width:100%;height:8px;background:#94a3b84d;border-radius:999px;overflow:hidden;margin-bottom:8px}.grok-progress span{display:block;margin-top:8px;font-size:.8rem;color:#94a3b8}.grok-toggle{display:flex;flex-direction:column;gap:6px}.grok-toggle input[type=checkbox]{width:18px;height:18px;cursor:pointer}.grok-hint{font-size:.75rem;color:#94a3b8}.grok-inline-button{align-self:flex-start;padding:6px 12px;border-radius:999px;border:1px solid rgba(148,163,184,.4);background:#38bdf826;color:#f8fafc;font-size:.8rem;font-weight:600;cursor:pointer;transition:background .15s ease,border-color .15s ease,opacity .15s ease}.grok-inline-button:hover:not(:disabled){border-color:#38bdf8cc;background:#38bdf84d}.grok-inline-button:disabled{opacity:.45;cursor:not-allowed}.grok-progress-bar{position:absolute;top:0;left:0;bottom:0;width:0;background:linear-gradient(90deg,#38bdf8,#8b5cf6);transition:width 80ms linear}.grok-actions{display:flex;justify-content:space-between;gap:12px;margin-top:8px}.grok-actions button{flex:1;padding:8px 0;border:none;border-radius:999px;background:#38bdf8;color:#0f172a;font-weight:600;font-size:.95rem;cursor:pointer;transition:background .15s ease,opacity .15s ease}.grok-actions button:disabled{opacity:.5;cursor:not-allowed}.grok-actions button:nth-of-type(2){background:#f8fafc26;color:#f8fafc}.grok-settings{margin:12px 0}.grok-settings-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;border:1px solid rgba(148,163,184,.4);border-radius:12px;background:#0f172a99;color:#f8fafc;font-weight:600;padding:8px 12px;cursor:pointer;transition:border-color .15s ease,background .15s ease}.grok-settings-toggle:hover{border-color:#38bdf8b3;background:#0f172abf}.grok-settings-toggle:focus-visible{outline:none;border-color:#38bdf8e6;box-shadow:0 0 0 1px #38bdf880}.grok-settings-icon{font-size:1.2rem;line-height:1}.grok-settings-drawer{margin-top:10px;padding:12px;border-radius:12px;background:#0f172ad9;border:1px solid rgba(56,189,248,.25);display:flex;flex-direction:column;gap:12px}@media (max-width: 480px){.grok-panel{width:calc(100vw - 32px);right:16px;left:16px}} ");

(function (require$$0, require$$0$1) {
  'use strict';

  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var client = {};
  var m = require$$0$1;
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  const MODERATION_SECTION_SELECTOR = 'section[aria-label="Notifications alt+T"][aria-live="polite"]';
  const MODERATION_TEXT = "Content Moderated. Try a different idea.";
  const QUOTA_KEYWORDS = ["limit reached", "quota", "upgrade to unlock"];
  const RETRY_BUTTON_SELECTOR = 'button[data-slot="button"][aria-label="生成视频"].bg-button-filled';
  const PROGRESS_BUTTON_SELECTOR = 'button[aria-label="视频预设"]';
  const VIDEO_SELECTOR = "#sd-video, #hd-video";
  const PROGRESS_CHECK_DELAY_MS = 500;
  const PROGRESS_REARM_WINDOW_MS = 2e3;
  const MORE_OPTIONS_BUTTON_SELECTOR = 'button[data-slot="button"][aria-label="更多选项"]';
  const MENU_SELECTOR = 'div[role="menu"][data-state="open"]';
  const MENU_ITEM_SELECTOR = 'div[role="menuitem"]';
  const UPSCALE_MENU_INDEX = 2;
  const MENU_POLL_INTERVAL_MS = 50;
  const MENU_WAIT_TIMEOUT_MS = 2500;
  const TOAST_SELECTOR = 'li.group.toast[data-type="error"]';
  function dispatchPointerClick(element) {
    if (!element) {
      return false;
    }
    const events = ["pointerdown", "pointerup", "click"];
    const options = { bubbles: true, cancelable: true };
    events.forEach((type) => {
      element.dispatchEvent(new MouseEvent(type, options));
    });
    return true;
  }
  function isElement(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }
  function locateToast(element) {
    if (!isElement(element)) return null;
    if (element.matches(TOAST_SELECTOR)) {
      return element;
    }
    return element.closest(TOAST_SELECTOR);
  }
  function matchModerationToast(element) {
    const toast = locateToast(element);
    if (!toast) return null;
    const message = toast.textContent || "";
    if (!message.includes(MODERATION_TEXT)) {
      return null;
    }
    return { toast, message: message.trim() || MODERATION_TEXT };
  }
  function matchQuotaToast(element) {
    const toast = locateToast(element);
    if (!toast) return null;
    const message = toast.textContent || "";
    const lower = message.toLowerCase();
    const matched = QUOTA_KEYWORDS.some((keyword) => lower.includes(keyword));
    if (!matched) {
      return null;
    }
    return { toast, message: message.trim() };
  }
  function startToastMonitor(matchFn, onEvent, label) {
    if (typeof onEvent !== "function") {
      throw new Error(`${label || "startToastMonitor"} requires a callback`);
    }
    let stopped = false;
    let toastObserver;
    let pollId;
    const seenToasts = /* @__PURE__ */ new WeakSet();
    const notify = ({ toast, message }) => {
      if (!toast || seenToasts.has(toast)) return;
      seenToasts.add(toast);
      onEvent({ message: message || "", timestamp: Date.now(), toast });
    };
    const handleNodes = (nodes) => {
      nodes.forEach((node) => {
        var _a;
        const match = matchFn(node);
        if (match) {
          notify(match);
          return;
        }
        (_a = node.querySelectorAll) == null ? void 0 : _a.call(node, TOAST_SELECTOR).forEach((inner) => {
          const nestedMatch = matchFn(inner);
          if (nestedMatch) {
            notify(nestedMatch);
          }
        });
      });
    };
    const attachObserver = (section) => {
      toastObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          var _a;
          if ((_a = mutation.addedNodes) == null ? void 0 : _a.length) {
            handleNodes(mutation.addedNodes);
          }
        });
      });
      toastObserver.observe(section, { childList: true, subtree: true });
      section.querySelectorAll(TOAST_SELECTOR).forEach((toast) => {
        const match = matchFn(toast);
        if (match) {
          notify(match);
        }
      });
    };
    const tryAttach = () => {
      if (stopped) return true;
      const section = document.querySelector(MODERATION_SECTION_SELECTOR);
      if (section) {
        attachObserver(section);
        return true;
      }
      return false;
    };
    if (!tryAttach()) {
      pollId = window.setInterval(() => {
        if (tryAttach() && pollId) {
          clearInterval(pollId);
          pollId = void 0;
        }
      }, 1e3);
    }
    return () => {
      stopped = true;
      toastObserver == null ? void 0 : toastObserver.disconnect();
      if (pollId) {
        clearInterval(pollId);
        pollId = void 0;
      }
    };
  }
  function startModerationMonitor(onModeration) {
    return startToastMonitor(matchModerationToast, onModeration, "startModerationMonitor");
  }
  function startQuotaLimitMonitor(onQuotaLimit) {
    return startToastMonitor(matchQuotaToast, onQuotaLimit, "startQuotaLimitMonitor");
  }
  function hasRenderedVideo() {
    const candidate = document.querySelector(VIDEO_SELECTOR);
    if (!candidate) {
      return false;
    }
    if (candidate.tagName !== "VIDEO") {
      return false;
    }
    return true;
  }
  function findProgressValueElement() {
    var _a;
    const button = document.querySelector(PROGRESS_BUTTON_SELECTOR);
    if (!button) {
      return null;
    }
    const divs = button.querySelectorAll("div");
    for (const div of divs) {
      const text = (_a = div.textContent) == null ? void 0 : _a.trim();
      if (!text) continue;
      if (/%$/.test(text)) {
        return div;
      }
    }
    return null;
  }
  function startGenerationStatusMonitor(onAnomaly) {
    if (typeof onAnomaly !== "function") {
      throw new Error("onAnomaly callback is required");
    }
    let observer;
    let stopped = false;
    let progressActive = false;
    let pendingCheckId = null;
    let lastTriggerTs = 0;
    const maybeTrigger = () => {
      if (stopped) return;
      const now = Date.now();
      if (now - lastTriggerTs < PROGRESS_REARM_WINDOW_MS) return;
      lastTriggerTs = now;
      onAnomaly({
        message: "Progress completed without detected video playback.",
        reason: "no-video",
        timestamp: now
      });
    };
    const runCheck = () => {
      if (pendingCheckId) {
        clearTimeout(pendingCheckId);
        pendingCheckId = null;
      }
      pendingCheckId = window.setTimeout(() => {
        pendingCheckId = null;
        if (stopped) return;
        if (!hasRenderedVideo()) {
          maybeTrigger();
        }
      }, PROGRESS_CHECK_DELAY_MS);
    };
    const evaluateProgressState = () => {
      if (stopped) return;
      const hasProgress = Boolean(findProgressValueElement());
      if (hasProgress) {
        progressActive = true;
        return;
      }
      if (progressActive && !hasProgress) {
        progressActive = false;
        runCheck();
      }
    };
    const target = document.body || document.documentElement;
    if (!target) {
      return () => {
      };
    }
    observer = new MutationObserver(() => {
      evaluateProgressState();
    });
    observer.observe(target, { childList: true, subtree: true, characterData: true });
    evaluateProgressState();
    return () => {
      stopped = true;
      observer == null ? void 0 : observer.disconnect();
      if (pendingCheckId) {
        clearTimeout(pendingCheckId);
        pendingCheckId = null;
      }
    };
  }
  function findRetryButton() {
    return document.querySelector(RETRY_BUTTON_SELECTOR);
  }
  function triggerRetry() {
    const button = findRetryButton();
    if (!button || button.disabled) {
      return false;
    }
    button.click();
    return true;
  }
  function createLifecycleObserver({ onGenerationStart, onGenerationComplete, onGenerationAbort } = {}) {
    if (typeof onGenerationStart !== "function" && typeof onGenerationComplete !== "function" && typeof onGenerationAbort !== "function") {
      throw new Error("createLifecycleObserver requires at least one callback");
    }
    let observer;
    let generationActive = false;
    let completionNotified = false;
    const target = document.body || document.documentElement;
    if (!target) {
      return () => {
      };
    }
    const notifyStart = () => {
      if (generationActive) return;
      generationActive = true;
      completionNotified = false;
      onGenerationStart == null ? void 0 : onGenerationStart({ timestamp: Date.now() });
    };
    const notifyComplete = () => {
      if (!generationActive || completionNotified) return;
      completionNotified = true;
      generationActive = false;
      onGenerationComplete == null ? void 0 : onGenerationComplete({ timestamp: Date.now(), reason: "video-detected" });
    };
    const notifyAbort = () => {
      if (!generationActive) return;
      generationActive = false;
      completionNotified = false;
      onGenerationAbort == null ? void 0 : onGenerationAbort({ timestamp: Date.now(), reason: "progress-lost" });
    };
    const evaluate = () => {
      const hasProgress = Boolean(findProgressValueElement());
      const hasVideo = hasRenderedVideo();
      if (hasProgress) {
        notifyStart();
        return;
      }
      if (!hasProgress && generationActive) {
        if (hasVideo) {
          notifyComplete();
        } else {
          notifyAbort();
        }
      } else if (!generationActive) {
        completionNotified = false;
      }
    };
    observer = new MutationObserver(evaluate);
    observer.observe(target, { childList: true, subtree: true, characterData: true });
    evaluate();
    return () => {
      observer == null ? void 0 : observer.disconnect();
      generationActive = false;
      completionNotified = false;
    };
  }
  function startAutoStartMonitor({ onGenerationStart, onGenerationComplete } = {}) {
    if (typeof onGenerationStart !== "function" && typeof onGenerationComplete !== "function") {
      throw new Error("startAutoStartMonitor requires at least one callback");
    }
    return createLifecycleObserver({ onGenerationStart, onGenerationComplete });
  }
  function startGenerationCompletionMonitor(onGenerationComplete) {
    if (typeof onGenerationComplete !== "function") {
      throw new Error("startGenerationCompletionMonitor requires a callback");
    }
    return createLifecycleObserver({ onGenerationComplete });
  }
  function waitForMenuElement(getter, timeoutMs = MENU_WAIT_TIMEOUT_MS) {
    return new Promise((resolve) => {
      const start = Date.now();
      const tick = () => {
        const node = getter();
        if (node) {
          resolve(node);
          return;
        }
        if (Date.now() - start >= timeoutMs) {
          resolve(null);
          return;
        }
        window.setTimeout(tick, MENU_POLL_INTERVAL_MS);
      };
      tick();
    });
  }
  async function triggerVideoUpscale({
    menuIndex = UPSCALE_MENU_INDEX,
    timeoutMs = MENU_WAIT_TIMEOUT_MS,
    clickDelayMs = 500
  } = {}) {
    var _a, _b;
    const button = document.querySelector(MORE_OPTIONS_BUTTON_SELECTOR);
    if (!button || button.disabled) {
      return false;
    }
    const opened = dispatchPointerClick(button);
    if (!opened) {
      (_a = button.click) == null ? void 0 : _a.call(button);
    }
    const menu = await waitForMenuElement(() => document.querySelector(MENU_SELECTOR), timeoutMs);
    if (!menu) {
      return false;
    }
    const menuItems = menu.querySelectorAll(MENU_ITEM_SELECTOR);
    if (!menuItems.length || menuItems.length <= menuIndex) {
      return false;
    }
    const target = menuItems[menuIndex];
    if (!target) {
      return false;
    }
    if (clickDelayMs > 0) {
      await new Promise((resolve) => window.setTimeout(resolve, clickDelayMs));
    }
    const clicked = dispatchPointerClick(target);
    if (!clicked) {
      (_b = target.click) == null ? void 0 : _b.call(target);
    }
    return true;
  }
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const STORAGE_KEY = "grok_max_retries";
  const DEFAULT_MAX_RETRIES = 5;
  const COOLDOWN_KEY = "grok_retry_cooldown_ms";
  const DEFAULT_COOLDOWN_MS = 5e3;
  const ENHANCED_DETECTION_KEY = "grok_enhanced_detection_enabled";
  const DEFAULT_ENHANCED_DETECTION = false;
  const AUTO_START_KEY = "grok_auto_start_enabled";
  const DEFAULT_AUTO_START = false;
  const AUTO_UPSCALE_KEY = "grok_auto_upscale_enabled";
  const DEFAULT_AUTO_UPSCALE = false;
  function loadMaxRetries(fallback = DEFAULT_MAX_RETRIES) {
    const parsedFallback = Number.isFinite(fallback) && fallback > 0 ? fallback : DEFAULT_MAX_RETRIES;
    if (typeof _GM_getValue === "function") {
      const stored = _GM_getValue(STORAGE_KEY, parsedFallback);
      const numeric = Number(stored);
      return Number.isFinite(numeric) && numeric > 0 ? numeric : parsedFallback;
    }
    return parsedFallback;
  }
  function saveMaxRetries(value) {
    if (typeof _GM_setValue === "function" && Number.isFinite(value) && value > 0) {
      _GM_setValue(STORAGE_KEY, value);
    }
  }
  function loadCooldownMs(fallback = DEFAULT_COOLDOWN_MS) {
    const parsedFallback = Number.isFinite(fallback) && fallback > 0 ? fallback : DEFAULT_COOLDOWN_MS;
    if (typeof _GM_getValue === "function") {
      const stored = _GM_getValue(COOLDOWN_KEY, parsedFallback);
      const numeric = Number(stored);
      return Number.isFinite(numeric) && numeric > 0 ? numeric : parsedFallback;
    }
    return parsedFallback;
  }
  function saveCooldownMs(value) {
    if (typeof _GM_setValue === "function" && Number.isFinite(value) && value > 0) {
      _GM_setValue(COOLDOWN_KEY, value);
    }
  }
  function loadEnhancedDetection(fallback = DEFAULT_ENHANCED_DETECTION) {
    const parsedFallback = Boolean(fallback);
    if (typeof _GM_getValue === "function") {
      const stored = _GM_getValue(ENHANCED_DETECTION_KEY, parsedFallback);
      return Boolean(stored);
    }
    return parsedFallback;
  }
  function saveEnhancedDetection(enabled) {
    if (typeof _GM_setValue === "function") {
      _GM_setValue(ENHANCED_DETECTION_KEY, Boolean(enabled));
    }
  }
  function loadAutoStartEnabled(fallback = DEFAULT_AUTO_START) {
    const parsedFallback = Boolean(fallback);
    if (typeof _GM_getValue === "function") {
      const stored = _GM_getValue(AUTO_START_KEY, parsedFallback);
      return Boolean(stored);
    }
    return parsedFallback;
  }
  function saveAutoStartEnabled(enabled) {
    if (typeof _GM_setValue === "function") {
      _GM_setValue(AUTO_START_KEY, Boolean(enabled));
    }
  }
  function loadAutoUpscaleEnabled(fallback = DEFAULT_AUTO_UPSCALE) {
    const parsedFallback = Boolean(fallback);
    if (typeof _GM_getValue === "function") {
      const stored = _GM_getValue(AUTO_UPSCALE_KEY, parsedFallback);
      return Boolean(stored);
    }
    return parsedFallback;
  }
  function saveAutoUpscaleEnabled(enabled) {
    if (typeof _GM_setValue === "function") {
      _GM_setValue(AUTO_UPSCALE_KEY, Boolean(enabled));
    }
  }
  const STATES = {
    idle: {
      description: "System disarmed; Start or auto-start events transition to monitoring.",
      allowedTransitions: ["monitoring"]
    },
    monitoring: {
      description: "Observers armed; moderation/anomaly events schedule retries; stop returns to idle.",
      allowedTransitions: ["idle", "moderation", "waiting-video", "generating", "terminal"]
    },
    moderation: {
      description: "Cooldown running because a moderation toast fired; transitions to retry once timer fires.",
      allowedTransitions: ["idle", "generating"]
    },
    "waiting-video": {
      description: "Cooldown running because progress vanished without video; transitions to retry once timer fires.",
      allowedTransitions: ["idle", "generating"]
    },
    generating: {
      description: "Retry button clicked; when Grok shows progress we stay in monitoring, otherwise auto-complete resets to idle.",
      allowedTransitions: ["idle", "monitoring"]
    },
    terminal: {
      description: "Automation halted due to quota limit or external signal; Stop moves back to idle.",
      allowedTransitions: ["idle"]
    }
  };
  let globalRetryCount = 0;
  const SUCCESS_DEBOUNCE_MS = 1e3;
  function sanitizePositiveInteger(value, fallback) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) {
      return Math.floor(numeric);
    }
    return fallback;
  }
  function sanitizeCooldown(value) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric >= 500) {
      return numeric;
    }
    return Math.max(500, DEFAULT_COOLDOWN_MS);
  }
  function asBoolean(value, fallback) {
    if (typeof value === "boolean") {
      return value;
    }
    return Boolean(fallback);
  }
  function getGlobalRetryCount() {
    return globalRetryCount;
  }
  function createGenerationStateMachine(initialConfig = {}) {
    const subscribers = /* @__PURE__ */ new Set();
    const contextDefaults = {
      phase: "idle",
      status: "Idle",
      attempts: 0,
      cooldownActive: false,
      cooldownRemainingMs: 0,
      cooldownProgress: 0,
      autoSession: false,
      terminalReason: null
    };
    let context = {
      ...contextDefaults,
      maxRetries: sanitizePositiveInteger(initialConfig.maxRetries, DEFAULT_MAX_RETRIES),
      cooldownMs: sanitizeCooldown(initialConfig.cooldownMs ?? DEFAULT_COOLDOWN_MS),
      enhancedDetection: asBoolean(initialConfig.enhancedDetection, DEFAULT_ENHANCED_DETECTION),
      autoStartEnabled: asBoolean(initialConfig.autoStartEnabled, DEFAULT_AUTO_START),
      autoUpscaleEnabled: asBoolean(initialConfig.autoUpscaleEnabled, DEFAULT_AUTO_UPSCALE)
    };
    let moderationCleanup = null;
    let anomalyCleanup = null;
    let quotaCleanup = null;
    let successCleanup = null;
    let autoStartCleanup = null;
    let cooldownInterval = null;
    let cooldownTimeout = null;
    let pendingRetry = false;
    let autoUpscaleInFlight = false;
    let lastSuccessTs = 0;
    const notify = () => {
      const snapshot = { ...context };
      subscribers.forEach((listener) => {
        try {
          listener(snapshot);
        } catch (error) {
          console.error("[generationStateMachine] subscriber error", error);
        }
      });
    };
    const setContext = (patch) => {
      context = { ...context, ...patch };
      notify();
    };
    const lifecycleHooks = {
      onExitState: {},
      onEnterState: {}
    };
    const transitionTo = async (newState, contextPatch = {}, customHooks) => {
      var _a, _b, _c, _d;
      const fromState = context.phase;
      if (!STATES[fromState].allowedTransitions.includes(newState)) {
        const error = new Error(
          `Invalid transition from "${fromState}" to "${newState}". Allowed transitions: ${STATES[fromState].allowedTransitions.join(", ")}`
        );
        console.error("[generationStateMachine]", error.message);
        throw error;
      }
      try {
        const exitHook = ((_a = customHooks == null ? void 0 : customHooks.onExitState) == null ? void 0 : _a[fromState]) ?? ((_b = lifecycleHooks.onExitState) == null ? void 0 : _b[fromState]);
        if (exitHook) {
          await exitHook(fromState, newState, context);
        }
        const beforeHook = (customHooks == null ? void 0 : customHooks.onBeforeTransition) ?? lifecycleHooks.onBeforeTransition;
        if (beforeHook) {
          await beforeHook(fromState, newState, context);
        }
        context = {
          ...context,
          ...contextPatch,
          phase: newState
        };
        notify();
        const afterHook = (customHooks == null ? void 0 : customHooks.onAfterTransition) ?? lifecycleHooks.onAfterTransition;
        if (afterHook) {
          await afterHook(fromState, newState, context);
        }
        const enterHook = ((_c = customHooks == null ? void 0 : customHooks.onEnterState) == null ? void 0 : _c[newState]) ?? ((_d = lifecycleHooks.onEnterState) == null ? void 0 : _d[newState]);
        if (enterHook) {
          await enterHook(fromState, newState, context);
        }
      } catch (error) {
        console.error("[generationStateMachine] transition hook error:", error);
        if (error instanceof Error && error.message.includes("validation")) {
          throw error;
        }
        console.warn("[generationStateMachine] continuing despite side-effect error");
      }
    };
    const transitionToSync = (newState, contextPatch = {}) => {
      transitionTo(newState, contextPatch).catch((error) => {
        console.error("[generationStateMachine] async transition error:", error);
      });
    };
    const stopCooldownTimers = () => {
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
    const stopPrimaryMonitors = () => {
      moderationCleanup == null ? void 0 : moderationCleanup();
      moderationCleanup = null;
      anomalyCleanup == null ? void 0 : anomalyCleanup();
      anomalyCleanup = null;
      quotaCleanup == null ? void 0 : quotaCleanup();
      quotaCleanup = null;
      successCleanup == null ? void 0 : successCleanup();
      successCleanup = null;
      lastSuccessTs = 0;
      autoUpscaleInFlight = false;
    };
    const startPrimaryMonitors = () => {
      stopPrimaryMonitors();
      moderationCleanup = startModerationMonitor(handleRetryTrigger);
      if (context.enhancedDetection) {
        anomalyCleanup = startGenerationStatusMonitor(handleRetryTrigger);
      }
      quotaCleanup = startQuotaLimitMonitor((event) => {
        var _a;
        const message = ((_a = event == null ? void 0 : event.message) == null ? void 0 : _a.trim()) || "Image limit reached. Upgrade to continue.";
        enterTerminal("quota-limit", message);
      });
      successCleanup = startGenerationCompletionMonitor(handleGenerationSuccess);
    };
    const cleanupAll = () => {
      stopCooldownTimers();
      stopPrimaryMonitors();
      autoStartCleanup == null ? void 0 : autoStartCleanup();
      autoStartCleanup = null;
    };
    lifecycleHooks.onExitState = {
      monitoring: () => {
        if (context.phase === "moderation" || context.phase === "waiting-video" || context.phase === "generating") {
          return;
        }
        stopPrimaryMonitors();
      },
      moderation: () => {
        stopCooldownTimers();
      },
      "waiting-video": () => {
        stopCooldownTimers();
      },
      terminal: () => {
        stopPrimaryMonitors();
      }
    };
    lifecycleHooks.onEnterState = {
      monitoring: () => {
        startPrimaryMonitors();
      },
      idle: () => {
        pendingRetry = false;
      }
    };
    const transitionToIdle = (statusMessage = "Idle") => {
      stopCooldownTimers();
      stopPrimaryMonitors();
      pendingRetry = false;
      const patch = {
        ...contextDefaults,
        status: statusMessage,
        maxRetries: context.maxRetries,
        cooldownMs: context.cooldownMs,
        enhancedDetection: context.enhancedDetection,
        autoStartEnabled: context.autoStartEnabled,
        autoUpscaleEnabled: context.autoUpscaleEnabled
      };
      transitionToSync("idle", patch);
    };
    const enterTerminal = (reason = "unknown", message = "Terminal state reached") => {
      stopCooldownTimers();
      stopPrimaryMonitors();
      pendingRetry = false;
      transitionToSync("terminal", {
        status: message,
        autoSession: false,
        terminalReason: reason,
        cooldownActive: false,
        cooldownRemainingMs: 0,
        cooldownProgress: 0
      });
    };
    const performRetry = () => {
      const nextAttempt = context.attempts + 1;
      if (nextAttempt > context.maxRetries) {
        transitionToIdle(`Reached max retries (${context.maxRetries})`);
        return;
      }
      const clicked = triggerRetry();
      if (!clicked) {
        transitionToIdle("Retry button not available");
        return;
      }
      globalRetryCount += 1;
      transitionToSync("generating", {
        attempts: nextAttempt,
        status: `Retry ${nextAttempt}/${context.maxRetries} sent`
      });
      if (nextAttempt >= context.maxRetries) {
        transitionToIdle(`Reached max retries (${context.maxRetries})`);
      }
    };
    const scheduleRetry = (reason = "moderation") => {
      if (pendingRetry) return;
      if (context.attempts >= context.maxRetries) {
        transitionToIdle(`Reached max retries (${context.maxRetries})`);
        return;
      }
      pendingRetry = true;
      const waitMs = Math.max(500, context.cooldownMs || DEFAULT_COOLDOWN_MS);
      const startTs = Date.now();
      const statusMessage = reason === "no-video" ? "Progress finished without video. Scheduling retry..." : "Content moderated. Scheduling retry...";
      const targetState = reason === "no-video" ? "waiting-video" : "moderation";
      transitionToSync(targetState, {
        status: statusMessage,
        cooldownActive: true,
        cooldownRemainingMs: waitMs,
        cooldownProgress: 0
      });
      cooldownInterval = window.setInterval(() => {
        const elapsed = Date.now() - startTs;
        const pct = Math.min(100, elapsed / waitMs * 100);
        setContext({
          cooldownRemainingMs: Math.max(0, waitMs - elapsed),
          cooldownProgress: pct
        });
      }, 100);
      cooldownTimeout = window.setTimeout(() => {
        stopCooldownTimers();
        performRetry();
      }, waitMs);
    };
    const handleRetryTrigger = (event) => {
      if (context.phase === "idle" || context.phase === "terminal") {
        return;
      }
      if (context.attempts >= context.maxRetries) {
        transitionToIdle(`Reached max retries (${context.maxRetries})`);
        return;
      }
      if (pendingRetry) {
        return;
      }
      scheduleRetry((event == null ? void 0 : event.reason) === "no-video" ? "no-video" : "moderation");
    };
    const queueAutoUpscale = ({ force = false, reason = "auto" } = {}) => {
      if (!force && !context.autoUpscaleEnabled) return null;
      if (!force && (context.phase === "idle" || context.phase === "terminal")) return null;
      if (autoUpscaleInFlight) return null;
      autoUpscaleInFlight = true;
      const label = reason === "manual" ? "Manual" : "Auto";
      setContext({ status: `${label} upscale triggered. Opening menu…` });
      const operation = Promise.resolve(triggerVideoUpscale()).then((clicked) => {
        if (!force && (context.phase === "idle" || context.phase === "terminal")) {
          return clicked;
        }
        setContext({
          status: clicked ? `${label} upscale requested successfully.` : `${label} upscale unavailable (menu entry missing).`
        });
        return clicked;
      }).catch((error) => {
        console.error("[generationStateMachine] auto-upscale error", error);
        if (!force && (context.phase === "idle" || context.phase === "terminal")) {
          return false;
        }
        setContext({ status: `${label} upscale failed. Check console for details.` });
        return false;
      }).finally(() => {
        autoUpscaleInFlight = false;
      });
      return operation;
    };
    const handleGenerationSuccess = () => {
      if (context.phase === "idle" || context.phase === "terminal") {
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
    const arm = (source = "manual") => {
      if (context.phase !== "idle") {
        return false;
      }
      transitionToSync("monitoring", {
        status: source === "auto" ? "Auto start armed. Watching this generation." : "Armed. Waiting for moderation.",
        attempts: 0,
        autoSession: source === "auto",
        terminalReason: null
      });
      return true;
    };
    const handleAutoGenerationStart = () => {
      if (!context.autoStartEnabled) return;
      arm("auto");
    };
    const handleAutoGenerationComplete = () => {
      if (!context.autoStartEnabled) return;
      if (!context.autoSession) return;
      transitionToIdle("Generation succeeded. Auto start idle.");
    };
    const refreshAutoStartMonitor = () => {
      autoStartCleanup == null ? void 0 : autoStartCleanup();
      autoStartCleanup = null;
      if (!context.autoStartEnabled) {
        return;
      }
      autoStartCleanup = startAutoStartMonitor({
        onGenerationStart: handleAutoGenerationStart,
        onGenerationComplete: handleAutoGenerationComplete
      });
    };
    refreshAutoStartMonitor();
    const updateConfig = (partial = {}) => {
      const next = { ...context };
      if (Object.prototype.hasOwnProperty.call(partial, "maxRetries")) {
        next.maxRetries = sanitizePositiveInteger(partial.maxRetries, context.maxRetries);
      }
      if (Object.prototype.hasOwnProperty.call(partial, "cooldownMs")) {
        next.cooldownMs = sanitizeCooldown(partial.cooldownMs);
      }
      if (Object.prototype.hasOwnProperty.call(partial, "enhancedDetection")) {
        next.enhancedDetection = Boolean(partial.enhancedDetection);
      }
      if (Object.prototype.hasOwnProperty.call(partial, "autoStartEnabled")) {
        next.autoStartEnabled = Boolean(partial.autoStartEnabled);
      }
      if (Object.prototype.hasOwnProperty.call(partial, "autoUpscaleEnabled")) {
        next.autoUpscaleEnabled = Boolean(partial.autoUpscaleEnabled);
      }
      context = next;
      notify();
      if (context.phase !== "idle" && context.phase !== "terminal") {
        startPrimaryMonitors();
      }
      if (Object.prototype.hasOwnProperty.call(partial, "autoStartEnabled")) {
        refreshAutoStartMonitor();
      }
    };
    return {
      getSnapshot() {
        return { ...context };
      },
      subscribe(listener) {
        if (typeof listener !== "function") {
          return () => {
          };
        }
        subscribers.add(listener);
        listener({ ...context });
        return () => {
          subscribers.delete(listener);
        };
      },
      armManual() {
        return arm("manual");
      },
      stop(message = "Stopped") {
        transitionToIdle(message);
      },
      updateConfig(partial) {
        updateConfig(partial);
      },
      signalTerminal(reason, message) {
        enterTerminal(reason, message);
      },
      triggerManualUpscale() {
        return queueAutoUpscale({ force: true, reason: "manual" });
      },
      destroy() {
        cleanupAll();
        subscribers.clear();
      }
    };
  }
  function buildInitialSnapshot() {
    return {
      phase: "idle",
      status: "Idle",
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
      autoUpscaleEnabled: loadAutoUpscaleEnabled()
    };
  }
  function App() {
    const initialSnapshotRef = require$$0.useRef(null);
    if (!initialSnapshotRef.current) {
      initialSnapshotRef.current = buildInitialSnapshot();
    }
    const [machineState, setMachineState] = require$$0.useState(initialSnapshotRef.current);
    const [totalRetries, setTotalRetries] = require$$0.useState(() => getGlobalRetryCount());
    const [settingsOpen, setSettingsOpen] = require$$0.useState(false);
    const machineRef = require$$0.useRef(null);
    require$$0.useEffect(() => {
      const machine = createGenerationStateMachine({
        maxRetries: initialSnapshotRef.current.maxRetries,
        cooldownMs: initialSnapshotRef.current.cooldownMs,
        enhancedDetection: initialSnapshotRef.current.enhancedDetection,
        autoStartEnabled: initialSnapshotRef.current.autoStartEnabled,
        autoUpscaleEnabled: initialSnapshotRef.current.autoUpscaleEnabled
      });
      machineRef.current = machine;
      const unsubscribe = machine.subscribe((snapshot) => {
        setMachineState(snapshot);
        setTotalRetries(getGlobalRetryCount());
      });
      return () => {
        unsubscribe == null ? void 0 : unsubscribe();
        machine.destroy();
        machineRef.current = null;
      };
    }, []);
    require$$0.useEffect(() => {
      saveMaxRetries(machineState.maxRetries || DEFAULT_MAX_RETRIES);
    }, [machineState.maxRetries]);
    require$$0.useEffect(() => {
      saveCooldownMs(machineState.cooldownMs || DEFAULT_COOLDOWN_MS);
    }, [machineState.cooldownMs]);
    require$$0.useEffect(() => {
      saveEnhancedDetection(
        typeof machineState.enhancedDetection === "boolean" ? machineState.enhancedDetection : DEFAULT_ENHANCED_DETECTION
      );
    }, [machineState.enhancedDetection]);
    require$$0.useEffect(() => {
      saveAutoStartEnabled(
        typeof machineState.autoStartEnabled === "boolean" ? machineState.autoStartEnabled : DEFAULT_AUTO_START
      );
    }, [machineState.autoStartEnabled]);
    require$$0.useEffect(() => {
      saveAutoUpscaleEnabled(
        typeof machineState.autoUpscaleEnabled === "boolean" ? machineState.autoUpscaleEnabled : DEFAULT_AUTO_UPSCALE
      );
    }, [machineState.autoUpscaleEnabled]);
    const updateMachineConfig = require$$0.useCallback((patch) => {
      if (machineRef.current) {
        machineRef.current.updateConfig(patch);
      } else {
        setMachineState((prev) => ({ ...prev, ...patch }));
      }
    }, []);
    const handleStart = require$$0.useCallback(() => {
      var _a;
      (_a = machineRef.current) == null ? void 0 : _a.armManual();
    }, []);
    const handleStop = require$$0.useCallback(() => {
      var _a;
      (_a = machineRef.current) == null ? void 0 : _a.stop("Stopped");
    }, []);
    const handleSliderChange = require$$0.useCallback(
      (event) => {
        const value = Number(event.target.value);
        const safeValue = Number.isFinite(value) && value > 0 ? value : DEFAULT_MAX_RETRIES;
        updateMachineConfig({ maxRetries: safeValue });
      },
      [updateMachineConfig]
    );
    const handleCooldownChange = require$$0.useCallback(
      (event) => {
        const value = Number(event.target.value);
        const safeValue = Number.isFinite(value) && value > 0 ? value : DEFAULT_COOLDOWN_MS;
        updateMachineConfig({ cooldownMs: Math.max(500, safeValue) });
      },
      [updateMachineConfig]
    );
    const handleEnhancedDetectionChange = require$$0.useCallback(
      (event) => {
        updateMachineConfig({ enhancedDetection: Boolean(event.target.checked) });
      },
      [updateMachineConfig]
    );
    const handleAutoStartChange = require$$0.useCallback(
      (event) => {
        updateMachineConfig({ autoStartEnabled: Boolean(event.target.checked) });
      },
      [updateMachineConfig]
    );
    const handleAutoUpscaleChange = require$$0.useCallback(
      (event) => {
        updateMachineConfig({ autoUpscaleEnabled: Boolean(event.target.checked) });
      },
      [updateMachineConfig]
    );
    const handleManualUpscale = require$$0.useCallback(() => {
      var _a, _b;
      (_b = (_a = machineRef.current) == null ? void 0 : _a.triggerManualUpscale) == null ? void 0 : _b.call(_a);
    }, []);
    const toggleSettingsDrawer = require$$0.useCallback(() => {
      setSettingsOpen((prev) => !prev);
    }, []);
    const progress = machineState.cooldownProgress || 0;
    const attempts = machineState.attempts ?? 0;
    const maxRetries = machineState.maxRetries || DEFAULT_MAX_RETRIES;
    const cooldownMsValue = machineState.cooldownMs || DEFAULT_COOLDOWN_MS;
    const cooldownRemainingMs = machineState.cooldownRemainingMs || 0;
    const cooldownSeconds = (cooldownRemainingMs / 1e3).toFixed(1);
    const statusText = machineState.status || "Idle";
    const canStart = machineState.phase === "idle";
    const canStop = machineState.phase !== "idle";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "grok-title", children: "Grok Assistant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grok-label", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grok-status", children: statusText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-label", children: [
          "Attempts: ",
          attempts,
          "/",
          maxRetries
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-label", children: [
          "Total retries sent: ",
          totalRetries
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-label", children: [
          "Phase: ",
          machineState.phase
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-slider-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "grok-retries", children: [
          "Max retries: ",
          maxRetries
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "grok-retries",
            type: "range",
            min: "1",
            max: "20",
            value: maxRetries,
            onChange: handleSliderChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-input-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "grok-cooldown", children: [
          "Cooldown (ms): ",
          cooldownMsValue
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "grok-cooldown",
            type: "number",
            min: "500",
            step: "250",
            value: cooldownMsValue,
            onChange: handleCooldownChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-progress", "aria-live": "polite", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grok-progress-bar", style: { width: `${progress}%` } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: machineState.cooldownActive ? `Retry in ${cooldownSeconds}s` : `No retry scheduled • ${Math.round(cooldownMsValue / 100) / 10}s cooldown` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-settings", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "grok-settings-toggle",
            onClick: toggleSettingsDrawer,
            "aria-expanded": settingsOpen,
            "aria-controls": "grok-settings-drawer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grok-settings-icon", "aria-hidden": "true", children: settingsOpen ? "−" : "+" })
            ]
          }
        ),
        settingsOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "grok-settings-drawer", className: "grok-settings-drawer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-input-block grok-toggle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "grok-enhanced", className: "grok-label", children: "Enhanced detection (progress + video checks)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "grok-enhanced",
                type: "checkbox",
                checked: Boolean(machineState.enhancedDetection),
                onChange: handleEnhancedDetectionChange
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grok-hint", children: "When enabled, retries fire if the progress pill disappears but no video renders." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-input-block grok-toggle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "grok-auto-start", className: "grok-label", children: "Auto start when Grok begins generating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "grok-auto-start",
                type: "checkbox",
                checked: Boolean(machineState.autoStartEnabled),
                onChange: handleAutoStartChange
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grok-hint", children: "Automatically arms monitoring once the percentage pill appears and stops after a successful video render." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-input-block grok-toggle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "grok-auto-upscale", className: "grok-label", children: "Auto upscale after successful generations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "grok-auto-upscale",
                type: "checkbox",
                checked: Boolean(machineState.autoUpscaleEnabled),
                onChange: handleAutoUpscaleChange
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grok-hint", children: "When enabled, the script opens the more options menu and clicks the third entry to trigger Grok's video upscaler after every detected success." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "grok-inline-button",
                onClick: handleManualUpscale,
                disabled: !machineRef.current,
                children: "Trigger upscale now"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grok-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleStart, disabled: !canStart, children: "Start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleStop, disabled: !canStop, children: "Stop" })
      ] })
    ] });
  }
  client.createRoot(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  ).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(require$$0.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );

})(React, ReactDOM);