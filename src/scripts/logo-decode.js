const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DECODING_CLASS = "is-decoding";
const STABILIZED_CLASS = "is-decoded";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*_+-=/<>[]{}|~^▮▯▰▱▸◂◇◆";
export const DEFAULT_DURATION = 1500;
const FRAME_INTERVAL = 56;
const START_DELAY = 130;
const RESOLVE_TIMES = [500, 675, 850, 1025, 1200, 1400];

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

function renderLogoFrame(element, target, elapsedMs, random = Math.random) {
  const doc = element.ownerDocument ?? document;
  const fragment = doc.createDocumentFragment();

  for (const { character, isResolved } of getDecodedCharacters(target, elapsedMs, random)) {
    fragment.append(createCharacterElement(doc, character, isResolved));
  }

  element.replaceChildren(fragment);
}

function stabilizeLogo(element, target, win, debug = false) {
  element.textContent = target;
  element.removeAttribute("aria-label");
  element.dataset.logoDecodeState = "done";
  element.classList.remove(DECODING_CLASS);
  element.classList.add(STABILIZED_CLASS);

  if (debug) {
    win.console?.log?.("logo decode finished", target);
  }
}

function decodeLogo(element, win, target, duration, debug = false) {
  const start = win.performance?.now?.() ?? Date.now();
  let lastFrame = 0;
  let lastDebugFrame = 0;

  const tick = (timestamp) => {
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

    stabilizeLogo(element, target, win, debug);
  };

  win.requestAnimationFrame(tick);
}

export function initLogoDecode(doc = document, win = window) {
  const logos = [...doc.querySelectorAll("[data-logo-decode]")];

  if (!logos.length) {
    return false;
  }

  const debug = isDebugEnabled(win);
  const reduceMotion =
    typeof win.matchMedia === "function" && win.matchMedia(MOTION_QUERY).matches;

  if (debug) {
    win.console?.log?.("logo decode loaded", {
      count: logos.length,
      reduceMotion,
    });
  }

  for (const logo of logos) {
    const target = String(logo.dataset.logoFinal || logo.textContent || "").trim().toUpperCase();

    if (!target) {
      continue;
    }

    logo.textContent = target;

    if (typeof win.requestAnimationFrame !== "function") {
      stabilizeLogo(logo, target, win, debug);
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

    const startDecode = () => decodeLogo(logo, win, target, DEFAULT_DURATION, debug);

    if (!reduceMotion && typeof win.setTimeout === "function") {
      win.setTimeout(startDecode, START_DELAY);
    } else {
      startDecode();
    }
  }

  return true;
}
