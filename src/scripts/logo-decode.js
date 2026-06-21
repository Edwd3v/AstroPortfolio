const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DECODING_CLASS = "is-decoding";
const STABILIZED_CLASS = "is-decoded";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*_+-=/<>[]{}|~^▮▯▰▱▸◂◇◆";
export const DEFAULT_DURATION = 1500;
const FRAME_INTERVAL = 56;
const START_DELAY = 130;
const RESOLVE_TIMES = [500, 675, 850, 1025, 1200, 1400];
const CYCLE_INTERVAL = 3000;
const CYCLE_SCRAMBLE_DURATION = 400;
const LOGO_MARK_SELECTOR = "[data-logo-mark]";
const TEXT_LOGO_SELECTOR = "[data-logo-decode]";

function isDebugEnabled(win) {
  try {
    return (
      new win.URLSearchParams(win.location.search).has("logo-debug") ||
      win.localStorage?.getItem("logo-debug") === "true"
    );
  } catch {
    return false;
  }
}

function getRandomGlyph(random = Math.random) {
  return GLYPHS[Math.floor(random() * GLYPHS.length)];
}

function getResolveTime(index, totalCharacters) {
  if (index < RESOLVE_TIMES.length) {
    return RESOLVE_TIMES[index];
  }

  const firstResolve = RESOLVE_TIMES[0];
  const lastResolve = RESOLVE_TIMES[RESOLVE_TIMES.length - 1];
  const ratio = totalCharacters <= 1 ? 1 : index / (totalCharacters - 1);
  return firstResolve + (lastResolve - firstResolve) * ratio;
}

export function createDecodedText(target, elapsedMs, random = Math.random) {
  return [...target]
    .map((character, index) => {
      if (character === " ") {
        return " ";
      }

      return elapsedMs >= getResolveTime(index, target.length)
        ? character
        : getRandomGlyph(random);
    })
    .join("");
}

function createCharacterElement(doc, character, isResolved) {
  const characterElement = doc.createElement("span");
  characterElement.className = isResolved ? "logo-decode__char is-resolved" : "logo-decode__char";
  characterElement.textContent = character;
  characterElement.setAttribute("aria-hidden", "true");
  return characterElement;
}

export function getDecodedCharacters(target, elapsedMs, random = Math.random) {
  return [...target].map((character, index) => {
    const isResolved = character === " " || elapsedMs >= getResolveTime(index, target.length);
    return {
      character: isResolved ? character : getRandomGlyph(random),
      isResolved,
    };
  });
}

function cycleWithScramble(element, values, win) {
  if (values.length < 2) return null;

  const reduceMotion = typeof win.matchMedia === "function" && win.matchMedia(MOTION_QUERY).matches;
  let index = 0;
  let handle = null;
  let active = true;

  function toggle() {
    if (!active) return;

    const fromIdx = index;
    const toIdx = (index + 1) % values.length;
    const fromValue = values[fromIdx];
    const toValue = values[toIdx];

    if (reduceMotion) {
      element.textContent = toValue;
      element.setAttribute("aria-label", toValue);
      index = toIdx;
      handle = win.setTimeout(toggle, CYCLE_INTERVAL);
      return;
    }

    const start = win.performance?.now?.() ?? Date.now();
    const maxLen = Math.max(fromValue.length, toValue.length);
    const varying = [];

    for (let i = 0; i < maxLen; i++) {
      if (fromValue[i] !== toValue[i]) varying.push(i);
    }

    function frame(timestamp) {
      if (!active) return;
      const elapsed = timestamp - start;

      if (elapsed >= CYCLE_SCRAMBLE_DURATION) {
        element.textContent = toValue;
        element.setAttribute("aria-label", toValue);
        index = toIdx;
        handle = win.setTimeout(toggle, CYCLE_INTERVAL);
        return;
      }

      const chars = [...toValue];
      for (const i of varying) {
        chars[i] = getRandomGlyph();
      }
      element.textContent = chars.join("");
      win.requestAnimationFrame(frame);
    }

    win.requestAnimationFrame(frame);
  }

  handle = win.setTimeout(toggle, CYCLE_INTERVAL);

  return function cleanup() {
    active = false;
    if (handle !== null) {
      win.clearTimeout(handle);
      handle = null;
    }
  };
}

function renderLogoFrame(element, target, elapsedMs, random = Math.random) {
  const doc = element.ownerDocument ?? document;
  const fragment = doc.createDocumentFragment();

  for (const { character, isResolved } of getDecodedCharacters(target, elapsedMs, random)) {
    fragment.append(createCharacterElement(doc, character, isResolved));
  }

  element.replaceChildren(fragment);
}

function getRunId(runId) {
  return String(runId);
}

function isCurrentRun(element, runId) {
  return element.dataset.logoDecodeRun === getRunId(runId);
}

function markRun(element, runId) {
  element.dataset.logoDecodeRun = getRunId(runId);
}

function stabilizeLogo(element, target, win, runId, debug = false) {
  if (!isCurrentRun(element, runId)) {
    return;
  }

  element.textContent = target;
  element.removeAttribute("aria-label");
  element.dataset.logoDecodeState = "done";
  element.classList.remove(DECODING_CLASS);
  element.classList.add(STABILIZED_CLASS);

  if (element.dataset.logoCycle) {
    try {
      const values = JSON.parse(element.dataset.logoCycle);
      element.__logoCycleCleanup = cycleWithScramble(element, values, win);
    } catch {
      // invalid cycle data, skip
    }
  }

  if (debug) {
    win.console?.log?.("logo decode finished", target);
  }
}

function activateLogoMark(logoMark, runId) {
  markRun(logoMark, runId);
  logoMark.dataset.logoMarkState = "active";
  logoMark.classList.remove(STABILIZED_CLASS);
  logoMark.classList.add(DECODING_CLASS);
}

function stabilizeLogoMark(logoMark, runId) {
  if (!isCurrentRun(logoMark, runId)) {
    return;
  }

  logoMark.dataset.logoMarkState = "done";
  logoMark.classList.remove(DECODING_CLASS);
  logoMark.classList.add(STABILIZED_CLASS);
}

function scheduleLogoMark(logoMark, win, totalDuration, runId) {
  if (typeof win.setTimeout === "function") {
    win.setTimeout(() => stabilizeLogoMark(logoMark, runId), totalDuration);
    return;
  }

  if (typeof win.requestAnimationFrame !== "function") {
    stabilizeLogoMark(logoMark, runId);
    return;
  }

  const start = win.performance?.now?.() ?? Date.now();

  const tick = (timestamp) => {
    if (!isCurrentRun(logoMark, runId)) {
      return;
    }

    if (timestamp - start < totalDuration) {
      win.requestAnimationFrame(tick);
      return;
    }

    stabilizeLogoMark(logoMark, runId);
  };

  win.requestAnimationFrame(tick);
}

function decodeLogo(element, win, target, duration, runId, debug = false) {
  const start = win.performance?.now?.() ?? Date.now();
  let lastFrame = 0;
  let lastDebugFrame = 0;

  const tick = (timestamp) => {
    if (!isCurrentRun(element, runId)) {
      return;
    }

    const elapsed = timestamp - start;
    const elapsedMs = Math.min(elapsed, duration);

    if (timestamp - lastFrame >= FRAME_INTERVAL || elapsedMs === duration) {
      renderLogoFrame(element, target, elapsedMs);
      lastFrame = timestamp;

      if (debug && (elapsedMs - lastDebugFrame >= 300 || elapsedMs === duration)) {
        win.console?.log?.("logo decode frame", Math.round(elapsedMs), element.textContent);
        lastDebugFrame = elapsedMs;
      }
    }

    if (elapsedMs < duration) {
      win.requestAnimationFrame(tick);
      return;
    }

    stabilizeLogo(element, target, win, runId, debug);
  };

  if (typeof win.setTimeout === "function") {
    win.setTimeout(() => stabilizeLogo(element, target, win, runId, debug), duration + FRAME_INTERVAL);
  }

  win.requestAnimationFrame(tick);
}

export function initLogoDecode(doc = document, win = window) {
  const logos = [...doc.querySelectorAll(TEXT_LOGO_SELECTOR)];
  const logoMarks = [...doc.querySelectorAll(LOGO_MARK_SELECTOR)];

  if (!logos.length && !logoMarks.length) {
    return () => {};
  }

  const runId = (win.__logoDecodeRunId ?? 0) + 1;
  win.__logoDecodeRunId = runId;

  const debug = isDebugEnabled(win);
  const reduceMotion =
    typeof win.matchMedia === "function" && win.matchMedia(MOTION_QUERY).matches;
  const startDelay = !reduceMotion && typeof win.setTimeout === "function" ? START_DELAY : 0;

  if (debug) {
    win.console?.log?.("logo decode loaded", {
      count: logos.length,
      logoMarks: logoMarks.length,
      reduceMotion,
    });
  }

  for (const logoMark of logoMarks) {
    activateLogoMark(logoMark, runId);
    scheduleLogoMark(logoMark, win, startDelay + DEFAULT_DURATION, runId);
  }

  for (const logo of logos) {
    const target = String(logo.dataset.logoFinal || logo.textContent || "").trim().toUpperCase();

    if (!target) {
      continue;
    }

    markRun(logo, runId);
    logo.textContent = target;

    if (typeof win.requestAnimationFrame !== "function") {
      stabilizeLogo(logo, target, win, runId, debug);
      continue;
    }

    logo.setAttribute("aria-label", target);
    logo.dataset.logoDecodeState = "active";
    logo.classList.remove(STABILIZED_CLASS);
    logo.classList.add(DECODING_CLASS);
    renderLogoFrame(logo, target, 0);

    if (debug) {
      win.console?.log?.("logo decode start", {
        target,
        initialText: logo.textContent,
      });
    }

    const startDecode = () => decodeLogo(logo, win, target, DEFAULT_DURATION, runId, debug);

    if (startDelay > 0) {
      win.setTimeout(startDecode, startDelay);
    } else {
      startDecode();
    }
  }

  return function cleanup() {
    const cycling = doc.querySelectorAll("[data-logo-cycle]");
    for (const el of cycling) {
      if (typeof el.__logoCycleCleanup === "function") {
        el.__logoCycleCleanup();
        el.__logoCycleCleanup = null;
      }
    }
  };
}
