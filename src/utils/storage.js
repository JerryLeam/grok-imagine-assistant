import { GM_getValue, GM_setValue } from 'vite-plugin-monkey/dist/client';

// Encapsulates Tampermonkey-backed persistence for Grok retry settings.

const STORAGE_KEY = 'grok_max_retries';
const DEFAULT_MAX_RETRIES = 5;
const COOLDOWN_KEY = 'grok_retry_cooldown_ms';
const DEFAULT_COOLDOWN_MS = 5000;
const ENHANCED_DETECTION_KEY = 'grok_enhanced_detection_enabled';
const DEFAULT_ENHANCED_DETECTION = false;
const AUTO_START_KEY = 'grok_auto_start_enabled';
const DEFAULT_AUTO_START = false;
const AUTO_UPSCALE_KEY = 'grok_auto_upscale_enabled';
const DEFAULT_AUTO_UPSCALE = false;

export function loadMaxRetries(fallback = DEFAULT_MAX_RETRIES) {
  // Sanitise the caller-provided fallback so storage always resolves to a safe int.
  const parsedFallback = Number.isFinite(fallback) && fallback > 0 ? fallback : DEFAULT_MAX_RETRIES;

  if (typeof GM_getValue === 'function') {
    const stored = GM_getValue(STORAGE_KEY, parsedFallback);
    const numeric = Number(stored);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : parsedFallback;
  }

  return parsedFallback;
}

export function saveMaxRetries(value) {
  // Skip writes when the GM API is missing (e.g., during local preview) or the value is invalid.
  if (typeof GM_setValue === 'function' && Number.isFinite(value) && value > 0) {
    GM_setValue(STORAGE_KEY, value);
  }
}

export function loadCooldownMs(fallback = DEFAULT_COOLDOWN_MS) {
  const parsedFallback = Number.isFinite(fallback) && fallback > 0 ? fallback : DEFAULT_COOLDOWN_MS;

  if (typeof GM_getValue === 'function') {
    const stored = GM_getValue(COOLDOWN_KEY, parsedFallback);
    const numeric = Number(stored);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : parsedFallback;
  }

  return parsedFallback;
}

export function saveCooldownMs(value) {
  if (typeof GM_setValue === 'function' && Number.isFinite(value) && value > 0) {
    GM_setValue(COOLDOWN_KEY, value);
  }
}

export function loadEnhancedDetection(fallback = DEFAULT_ENHANCED_DETECTION) {
  const parsedFallback = Boolean(fallback);

  if (typeof GM_getValue === 'function') {
    const stored = GM_getValue(ENHANCED_DETECTION_KEY, parsedFallback);
    return Boolean(stored);
  }

  return parsedFallback;
}

export function saveEnhancedDetection(enabled) {
  if (typeof GM_setValue === 'function') {
    GM_setValue(ENHANCED_DETECTION_KEY, Boolean(enabled));
  }
}

export function loadAutoStartEnabled(fallback = DEFAULT_AUTO_START) {
  const parsedFallback = Boolean(fallback);

  if (typeof GM_getValue === 'function') {
    const stored = GM_getValue(AUTO_START_KEY, parsedFallback);
    return Boolean(stored);
  }

  return parsedFallback;
}

export function saveAutoStartEnabled(enabled) {
  if (typeof GM_setValue === 'function') {
    GM_setValue(AUTO_START_KEY, Boolean(enabled));
  }
}

export function loadAutoUpscaleEnabled(fallback = DEFAULT_AUTO_UPSCALE) {
  const parsedFallback = Boolean(fallback);

  if (typeof GM_getValue === 'function') {
    const stored = GM_getValue(AUTO_UPSCALE_KEY, parsedFallback);
    return Boolean(stored);
  }

  return parsedFallback;
}

export function saveAutoUpscaleEnabled(enabled) {
  if (typeof GM_setValue === 'function') {
    GM_setValue(AUTO_UPSCALE_KEY, Boolean(enabled));
  }
}

export {
  DEFAULT_MAX_RETRIES,
  DEFAULT_COOLDOWN_MS,
  DEFAULT_ENHANCED_DETECTION,
  DEFAULT_AUTO_START,
  DEFAULT_AUTO_UPSCALE,
};
