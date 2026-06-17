import assert from "node:assert/strict";
import { test } from "node:test";
import { createNeuralNetwork, initNeuralNetwork } from "../src/scripts/neural-network.js";

function countDegrees(connections, { includeRoutes = true } = {}) {
  const degrees = new Map();

  for (const connection of connections) {
    if (!includeRoutes && connection.route) {
      continue;
    }

    degrees.set(connection.start, (degrees.get(connection.start) ?? 0) + 1);
    degrees.set(connection.end, (degrees.get(connection.end) ?? 0) + 1);
  }

  return degrees;
}

function createCanvasHarness({ reducedMotion = false } = {}) {
  let animationFrames = 0;
  const context = {
    canvas: null,
    save() {},
    setTransform() {},
    clearRect() {},
    restore() {},
    translate() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    arc() {},
    fill() {},
    strokeRect() {},
    createRadialGradient() {
      return { addColorStop() {} };
    },
    createLinearGradient() {
      return { addColorStop() {} };
    },
    set fillStyle(_value) {},
    set lineCap(_value) {},
    set lineWidth(_value) {},
    set strokeStyle(_value) {},
  };
  const canvas = {
    height: 0,
    width: 0,
    getBoundingClientRect() {
      return { height: 720, width: 1280 };
    },
    getContext() {
      context.canvas = canvas;
      return context;
    },
  };
  const win = {
    cancelAnimationFrame() {},
    devicePixelRatio: 1,
    document: {
      hidden: false,
      addEventListener() {},
      removeEventListener() {},
    },
    innerHeight: 720,
    innerWidth: 1280,
    localStorage: {
      getItem() {
        return null;
      },
    },
    location: {
      search: "",
    },
    matchMedia(query) {
      return {
        matches: query === "(prefers-reduced-motion: reduce)" && reducedMotion,
      };
    },
    requestAnimationFrame() {
      animationFrames += 1;
      return animationFrames;
    },
    addEventListener() {},
    removeEventListener() {},
  };

  return {
    canvas,
    getAnimationFrames() {
      return animationFrames;
    },
    win,
  };
}

test("createNeuralNetwork generates a semi-hierarchical open topology", () => {
  const network = createNeuralNetwork({
    height: 720,
    seed: 7,
    width: 1280,
  });

  const hubs = network.nodes.filter((node) => node.type === "hub");
  const secondary = network.nodes.filter((node) => node.type === "secondary");
  const ambient = network.nodes.filter((node) => node.type === "ambient");
  const offscreen = network.nodes.filter(
    (node) => node.x < 0 || node.x > 1280 || node.y < 0 || node.y > 720,
  );
  const leftSide = network.nodes.filter((node) => node.x < 1280 * 0.42);

  assert.equal(hubs.length, 5);
  assert.ok(secondary.length > hubs.length);
  assert.ok(ambient.length > 0);
  assert.ok(offscreen.length > 0);
  assert.ok(leftSide.length > 0);
  assert.ok(network.routes.length > 0);
});

test("createNeuralNetwork limits non-route node degree outside primary hubs", () => {
  const network = createNeuralNetwork({
    height: 720,
    seed: 11,
    width: 1280,
  });
  const degrees = countDegrees(network.connections, { includeRoutes: false });

  assert.ok(network.connections.length > 0);

  for (const node of network.nodes) {
    const degree = degrees.get(node) ?? 0;

    if (node.type === "hub") {
      assert.ok(degree <= 7);
    } else if (node.type === "secondary") {
      assert.ok(degree <= 3);
    } else {
      assert.ok(degree <= 2);
    }
  }
});

test("createNeuralNetwork creates long animated routes between hubs", () => {
  const network = createNeuralNetwork({
    height: 720,
    seed: 13,
    width: 1280,
  });
  const longRoutes = network.routes.filter((route) => route.type === "long");

  assert.ok(longRoutes.length >= 4);

  for (const route of network.routes) {
    assert.ok(route.speed > 0);
    assert.ok(route.delay >= 0);

    for (const segment of route.segments) {
      assert.equal(segment.route, true);
    }
  }

  for (const route of longRoutes) {
    for (const segment of route.segments) {
      assert.equal(segment.start.type, "hub");
      assert.equal(segment.end.type, "hub");
    }
  }
});

test("initNeuralNetwork keeps a slower animation loop when reduced motion is requested", () => {
  const { canvas, getAnimationFrames, win } = createCanvasHarness({ reducedMotion: true });
  const cleanup = initNeuralNetwork(canvas, win);

  assert.equal(typeof cleanup, "function");
  assert.equal(canvas.width, 1280);
  assert.equal(canvas.height, 720);
  assert.equal(getAnimationFrames(), 1);

  cleanup();
});
