import assert from "node:assert/strict";
import { test } from "node:test";
import { initSpotlight } from "../src/scripts/spotlight.js";

function createHarness({ reducedMotion = false } = {}) {
  const listeners = new Map();
  const styles = new Map();
  const spotlight = {
    dataset: {},
    style: {},
  };

  const win = {
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
    cancelAnimationFrame() {},
    matchMedia(query) {
      return {
        matches: query === "(prefers-reduced-motion: reduce)" && reducedMotion,
      };
    },
    requestAnimationFrame(callback) {
      callback();
      return 1;
    },
    removeEventListener(type, handler) {
      if (listeners.get(type) === handler) {
        listeners.delete(type);
      }
    },
  };

  const doc = {
    body: {
      dataset: {},
    },
    documentElement: {
      style: {
        getPropertyValue(property) {
          return styles.get(property) ?? "";
        },
        setProperty(property, value) {
          styles.set(property, value);
        },
      },
    },
    querySelector(selector) {
      return selector === "[data-cursor-spotlight]" ? spotlight : null;
    },
  };

  return { doc, listeners, spotlight, win };
}

test("initSpotlight updates CSS variables on pointer movement", () => {
  const { doc, listeners, spotlight, win } = createHarness();

  assert.equal(typeof initSpotlight(win, doc), "function");
  assert.equal(doc.body.dataset.spotlight, "ready");
  assert.equal(typeof listeners.get("pointermove"), "function");

  listeners.get("pointermove")({ clientX: 320, clientY: 180 });

  assert.equal(doc.documentElement.style.getPropertyValue("--spotlight-x"), "320px");
  assert.equal(doc.documentElement.style.getPropertyValue("--spotlight-y"), "180px");
  assert.equal(
    spotlight.style.transform,
    "translate3d(320px, 180px, 0) translate3d(-50%, -50%, 0)",
  );
  assert.equal(spotlight.dataset.x, "320");
  assert.equal(spotlight.dataset.y, "180");
  assert.equal(doc.body.dataset.spotlight, "active");
});

test("initSpotlight also supports mousemove fallback", () => {
  const { doc, listeners, win } = createHarness();

  initSpotlight(win, doc);
  listeners.get("mousemove")({ clientX: 48, clientY: 96 });

  assert.equal(doc.documentElement.style.getPropertyValue("--spotlight-x"), "48px");
  assert.equal(doc.documentElement.style.getPropertyValue("--spotlight-y"), "96px");
});

test("initSpotlight keeps cursor tracking when reduced motion is requested", () => {
  const { doc, listeners, win } = createHarness({ reducedMotion: true });

  assert.equal(typeof initSpotlight(win, doc), "function");
  assert.equal(doc.body.dataset.spotlight, "ready");
  assert.equal(typeof listeners.get("pointermove"), "function");
});

test("initSpotlight cleanup removes cursor listeners", () => {
  const { listeners, win, doc } = createHarness();
  const cleanup = initSpotlight(win, doc);

  assert.equal(typeof listeners.get("pointermove"), "function");
  assert.equal(typeof listeners.get("mousemove"), "function");

  cleanup();

  assert.equal(listeners.has("pointermove"), false);
  assert.equal(listeners.has("mousemove"), false);
});
