const SPOTLIGHT_X = "--spotlight-x";
const SPOTLIGHT_Y = "--spotlight-y";
const SPOTLIGHT_SELECTOR = "[data-cursor-spotlight]";

function hasCoordinates(event) {
  return Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
}

export function initSpotlight(win = window, doc = document) {
  if (!win || !doc?.documentElement || !doc.body) {
    return false;
  }

  const spotlight =
    typeof doc.querySelector === "function" ? doc.querySelector(SPOTLIGHT_SELECTOR) : null;

  if (!spotlight) {
    return false;
  }

  const root = doc.documentElement;
  let frame = 0;

  const updatePosition = (event) => {
    if (!hasCoordinates(event)) {
      return;
    }

    win.cancelAnimationFrame(frame);
    frame = win.requestAnimationFrame(() => {
      root.style.setProperty(SPOTLIGHT_X, `${event.clientX}px`);
      root.style.setProperty(SPOTLIGHT_Y, `${event.clientY}px`);
      spotlight.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate3d(-50%, -50%, 0)`;
      spotlight.dataset.x = String(event.clientX);
      spotlight.dataset.y = String(event.clientY);
      doc.body.dataset.spotlight = "active";
    });
  };

  win.addEventListener("pointermove", updatePosition, { passive: true });
  win.addEventListener("mousemove", updatePosition, { passive: true });
  doc.body.dataset.spotlight = "ready";

  return true;
}
