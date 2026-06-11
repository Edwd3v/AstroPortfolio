import assert from "node:assert/strict";
import { test } from "node:test";
import { createNeuralNetwork } from "../src/scripts/neural-network.js";

function countDegrees(connections) {
  const degrees = new Map();

  for (const connection of connections) {
    degrees.set(connection.start, (degrees.get(connection.start) ?? 0) + 1);
    degrees.set(connection.end, (degrees.get(connection.end) ?? 0) + 1);
  }

  return degrees;
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

test("createNeuralNetwork limits node degree outside primary hubs", () => {
  const network = createNeuralNetwork({
    height: 720,
    seed: 11,
    width: 1280,
  });
  const degrees = countDegrees(network.connections);

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

test("createNeuralNetwork keeps structural routes between hub connections only", () => {
  const network = createNeuralNetwork({
    height: 720,
    seed: 13,
    width: 1280,
  });

  assert.ok(network.routes.length >= 4);

  for (const route of network.routes) {
    assert.ok(route.speed > 0);
    assert.ok(route.delay >= 0);

    for (const segment of route.segments) {
      assert.equal(segment.route, true);
      assert.equal(segment.start.type, "hub");
      assert.equal(segment.end.type, "hub");
    }
  }
});
