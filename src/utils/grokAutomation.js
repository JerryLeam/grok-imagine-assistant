// Centralizes DOM selectors and observation logic for Grok moderation toasts + retry button.
const MODERATION_SECTION_SELECTOR = 'section[aria-label="Notifications alt+T"][aria-live="polite"]';
const MODERATION_TOAST_SELECTOR = 'li.group.toast[data-type="error"]';
const MODERATION_TEXT = 'Content Moderated. Try a different idea.';
const QUOTA_KEYWORDS = ['limit reached', 'quota', 'upgrade to unlock'];

// Button classes are fairly stable, but we scope tightly so stray controls are ignored.
const RETRY_BUTTON_SELECTOR =
  'button[data-slot="button"][aria-label="生成视频"].bg-button-filled';
const PROGRESS_BUTTON_SELECTOR = 'button[aria-label="视频预设"]';
const VIDEO_SELECTOR = '#sd-video, #hd-video';
const PROGRESS_CHECK_DELAY_MS = 500;
const PROGRESS_REARM_WINDOW_MS = 2000;
const MORE_OPTIONS_BUTTON_SELECTOR = 'button[data-slot="button"][aria-label="更多选项"]';
const MENU_SELECTOR = 'div[role="menu"][data-state="open"]';
const MENU_ITEM_SELECTOR = 'div[role="menuitem"]';
const UPSCALE_MENU_INDEX = 2; // Zero-based: third entry is "升级视频" today.
const MENU_POLL_INTERVAL_MS = 50;
const MENU_WAIT_TIMEOUT_MS = 2500;

const TOAST_SELECTOR = 'li.group.toast[data-type="error"]';

function dispatchPointerClick(element) {
  if (!element) {
    return false;
  }
  const events = ['pointerdown', 'pointerup', 'click'];
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
  const message = toast.textContent || '';
  if (!message.includes(MODERATION_TEXT)) {
    return null;
  }
  return { toast, message: message.trim() || MODERATION_TEXT };
}

function matchQuotaToast(element) {
  const toast = locateToast(element);
  if (!toast) return null;
  const message = toast.textContent || '';
  const lower = message.toLowerCase();
  const matched = QUOTA_KEYWORDS.some((keyword) => lower.includes(keyword));
  if (!matched) {
    return null;
  }
  return { toast, message: message.trim() };
}

function startToastMonitor(matchFn, onEvent, label) {
  if (typeof onEvent !== 'function') {
    throw new Error(`${label || 'startToastMonitor'} requires a callback`);
  }

  let stopped = false;
  let toastObserver;
  let pollId;
  const seenToasts = new WeakSet();

  const notify = ({ toast, message }) => {
    if (!toast || seenToasts.has(toast)) return;
    seenToasts.add(toast);
    onEvent({ message: message || '', timestamp: Date.now(), toast });
  };

  const handleNodes = (nodes) => {
    nodes.forEach((node) => {
      const match = matchFn(node);
      if (match) {
        notify(match);
        return;
      }
      node.querySelectorAll?.(TOAST_SELECTOR).forEach((inner) => {
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
        if (mutation.addedNodes?.length) {
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
        pollId = undefined;
      }
    }, 1000);
  }

  return () => {
    stopped = true;
    toastObserver?.disconnect();
    if (pollId) {
      clearInterval(pollId);
      pollId = undefined;
    }
  };
}

export function startModerationMonitor(onModeration) {
  return startToastMonitor(matchModerationToast, onModeration, 'startModerationMonitor');
}

export function startQuotaLimitMonitor(onQuotaLimit) {
  return startToastMonitor(matchQuotaToast, onQuotaLimit, 'startQuotaLimitMonitor');
}

function hasRenderedVideo() {
  const candidate = document.querySelector(VIDEO_SELECTOR);
  if (!candidate) {
    return false;
  }
  if (candidate.tagName !== 'VIDEO') {
    return false;
  }
  return true;
}

function findProgressValueElement() {
  const button = document.querySelector(PROGRESS_BUTTON_SELECTOR);
  if (!button) {
    return null;
  }
  const divs = button.querySelectorAll('div');
  for (const div of divs) {
    const text = div.textContent?.trim();
    if (!text) continue;
    if (/%$/.test(text)) {
      return div;
    }
  }
  return null;
}

export function startGenerationStatusMonitor(onAnomaly) {
  if (typeof onAnomaly !== 'function') {
    throw new Error('onAnomaly callback is required');
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
      message: 'Progress completed without detected video playback.',
      reason: 'no-video',
      timestamp: now,
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
    return () => {};
  }

  observer = new MutationObserver(() => {
    evaluateProgressState();
  });
  observer.observe(target, { childList: true, subtree: true, characterData: true });
  evaluateProgressState();

  return () => {
    stopped = true;
    observer?.disconnect();
    if (pendingCheckId) {
      clearTimeout(pendingCheckId);
      pendingCheckId = null;
    }
  };
}

export function findRetryButton() {
  // Callers may inspect the element before clicking to ensure visibility.
  return document.querySelector(RETRY_BUTTON_SELECTOR);
}

export function triggerRetry() {
  const button = findRetryButton();
  if (!button || button.disabled) {
    return false;
  }
  button.click();
  return true;
}
function createLifecycleObserver({ onGenerationStart, onGenerationComplete, onGenerationAbort } = {}) {
  if (
    typeof onGenerationStart !== 'function' &&
    typeof onGenerationComplete !== 'function' &&
    typeof onGenerationAbort !== 'function'
  ) {
    throw new Error('createLifecycleObserver requires at least one callback');
  }

  let observer;
  let generationActive = false;
  let completionNotified = false;
  const target = document.body || document.documentElement;
  if (!target) {
    return () => {};
  }

  const notifyStart = () => {
    if (generationActive) return;
    generationActive = true;
    completionNotified = false;
    onGenerationStart?.({ timestamp: Date.now() });
  };

  const notifyComplete = () => {
    if (!generationActive || completionNotified) return;
    completionNotified = true;
    generationActive = false;
    onGenerationComplete?.({ timestamp: Date.now(), reason: 'video-detected' });
  };

  const notifyAbort = () => {
    if (!generationActive) return;
    generationActive = false;
    completionNotified = false;
    onGenerationAbort?.({ timestamp: Date.now(), reason: 'progress-lost' });
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
    observer?.disconnect();
    generationActive = false;
    completionNotified = false;
  };
}

export function startAutoStartMonitor({ onGenerationStart, onGenerationComplete } = {}) {
  if (typeof onGenerationStart !== 'function' && typeof onGenerationComplete !== 'function') {
    throw new Error('startAutoStartMonitor requires at least one callback');
  }
  return createLifecycleObserver({ onGenerationStart, onGenerationComplete });
}

export function startGenerationCompletionMonitor(onGenerationComplete) {
  if (typeof onGenerationComplete !== 'function') {
    throw new Error('startGenerationCompletionMonitor requires a callback');
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

export async function triggerVideoUpscale({
  menuIndex = UPSCALE_MENU_INDEX,
  timeoutMs = MENU_WAIT_TIMEOUT_MS,
  clickDelayMs = 500,
} = {}) {
  const button = document.querySelector(MORE_OPTIONS_BUTTON_SELECTOR);
  if (!button || button.disabled) {
    return false;
  }

  const opened = dispatchPointerClick(button);
  if (!opened) {
    button.click?.();
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
    target.click?.();
  }
  return true;
}
