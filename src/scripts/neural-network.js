function createRandom(seed = 24) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function getCanvasSize(canvas, win = window) {
  const rect = canvas.getBoundingClientRect();
  return {
    width: Math.max(1, Math.floor(rect.width || win.innerWidth)),
    height: Math.max(1, Math.floor(rect.height || win.innerHeight)),
  };
}

export function createNeuralNetwork({
  height,
  nodeCount,
  seed = 24,
  width,
} = {}) {
  const random = createRandom(seed);
  const resolvedWidth = width ?? 1280;
  const resolvedHeight = height ?? 720;
  const clusterNodeCount = nodeCount ?? Math.round(Math.min(54, Math.max(38, resolvedWidth / 30)));
  const nodes = [];
  const connections = [];
  const degree = new Map();
  const routes = [];

  const createNode = ({ cluster = -1, radius, type, x, y }) => {
    const node = {
      cluster,
      phase: random() * Math.PI * 2,
      radius,
      type,
      x,
      y,
    };

    nodes.push(node);
    degree.set(node, 0);

    return node;
  };

  const maxDegree = (node) => {
    if (node.type === "hub") {
      return 7;
    }

    return node.type === "secondary" ? 3 : 2;
  };

  const connect = (start, end, { route = false, strength = 1 } = {}) => {
    if (!start || !end || start === end) {
      return null;
    }

    const exists = connections.find(
      (connection) =>
        (connection.start === start && connection.end === end) ||
        (connection.start === end && connection.end === start),
    );

    if (exists) {
      return exists;
    }

    if (!route && (degree.get(start) >= maxDegree(start) || degree.get(end) >= maxDegree(end))) {
      return null;
    }

    const distance = Math.hypot(start.x - end.x, start.y - end.y);
    const connection = {
      distance,
      end,
      route,
      start,
      strength,
    };

    connections.push(connection);
    degree.set(start, degree.get(start) + 1);
    degree.set(end, degree.get(end) + 1);

    return connection;
  };

  const hubBlueprints = [
    { x: 0.26, y: 0.18 },
    { x: 0.72, y: 0.24 },
    { x: 1.06, y: 0.5 },
    { x: 0.58, y: 0.76 },
    { x: 0.08, y: 0.86 },
  ];
  const hubs = hubBlueprints.map((hub, index) =>
    createNode({
      cluster: index,
      radius: 2.8 + random() * 0.8,
      type: "hub",
      x: resolvedWidth * hub.x,
      y: resolvedHeight * hub.y,
    }),
  );

  const clusters = hubs.map((hub, cluster) => {
    const count = Math.max(4, Math.round(clusterNodeCount / hubs.length + (random() - 0.5) * 3));

    return Array.from({ length: count }, () => {
      const angle = random() * Math.PI * 2;
      const distance = resolvedWidth * (0.045 + random() * 0.12);
      const heroSafePush = hub.x < resolvedWidth * 0.34 && hub.y < resolvedHeight * 0.42 ? 0.18 : 0;

      return createNode({
        cluster,
        radius: 1.25 + random() * 0.75,
        type: "secondary",
        x: hub.x + Math.cos(angle) * distance + resolvedWidth * heroSafePush,
        y: hub.y + Math.sin(angle) * distance * 0.68,
      });
    });
  });

  const ambientCount = Math.round(Math.min(24, Math.max(14, resolvedWidth / 78)));
  const ambientNodes = Array.from({ length: ambientCount }, () =>
    createNode({
      radius: 0.85 + random() * 0.55,
      type: "ambient",
      x: resolvedWidth * (-0.16 + random() * 1.24),
      y: resolvedHeight * (-0.12 + random() * 1.24),
    }),
  );
  const leftAmbientNodes = Array.from({ length: 9 }, () =>
    createNode({
      radius: 0.8 + random() * 0.5,
      type: "ambient",
      x: resolvedWidth * (-0.08 + random() * 0.36),
      y: resolvedHeight * (0.18 + random() * 0.78),
    }),
  );

  for (const [index, hub] of hubs.entries()) {
    const sortedCluster = [...clusters[index]].sort(
      (first, second) =>
        Math.hypot(first.x - hub.x, first.y - hub.y) -
        Math.hypot(second.x - hub.x, second.y - hub.y),
    );

    for (const node of sortedCluster.slice(0, 3)) {
      connect(hub, node, { strength: 1.1 });
    }

    for (const node of sortedCluster) {
      const candidates = sortedCluster
        .filter((candidate) => candidate !== node)
        .map((candidate) => ({
          candidate,
          distance: Math.hypot(candidate.x - node.x, candidate.y - node.y),
        }))
        .sort((first, second) => first.distance - second.distance);

      for (const { candidate } of candidates.slice(0, 2)) {
        connect(node, candidate, { strength: 0.75 });
      }
    }
  }

  const allStructuredNodes = clusters.flat();

  for (const ambient of [...ambientNodes, ...leftAmbientNodes]) {
    const nearby = allStructuredNodes
      .map((node) => ({
        node,
        distance: Math.hypot(node.x - ambient.x, node.y - ambient.y),
      }))
      .sort((first, second) => first.distance - second.distance);

    for (const { node } of nearby.slice(0, 2)) {
      connect(ambient, node, { strength: 0.45 });
    }
  }

  const structuralPairs = [
    [hubs[0], hubs[1]],
    [hubs[1], hubs[2]],
    [hubs[1], hubs[3]],
    [hubs[3], hubs[4]],
    [hubs[0], hubs[4]],
  ];

  for (const [index, [start, end]] of structuralPairs.entries()) {
    const connection = connect(start, end, {
      route: true,
      strength: 1.1,
    });

    if (connection) {
      routes.push({
        delay: index * 0.23,
        segments: [connection],
        speed: 0.08 + random() * 0.04,
      });
    }
  }

  return { connections, hubs, nodes, routes };
}

function drawNetwork(context, network, { offsetY = 0 } = {}) {
  const { connections, nodes } = network;

  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.restore();

  context.lineCap = "round";
  context.save();
  context.translate(0, offsetY);

  for (const connection of connections) {
    const alpha = connection.route
      ? Math.max(0.04, 0.1 - connection.distance / 4600)
      : Math.max(0.024, 0.105 - connection.distance / 2800);

    context.beginPath();
    context.moveTo(connection.start.x, connection.start.y);
    context.lineTo(connection.end.x, connection.end.y);
    context.strokeStyle = `rgba(108, 196, 199, ${alpha})`;
    context.lineWidth = connection.route ? 0.8 : 0.55 * connection.strength;
    context.stroke();
  }

  for (const node of nodes) {
    const typeWeight = node.type === "hub" ? 1.8 : node.type === "secondary" ? 1 : 0.55;
    const glow = 0.034 * typeWeight;

    context.fillStyle = `rgba(205, 204, 204, ${glow})`;
    context.beginPath();
    context.arc(node.x, node.y, node.radius + (node.type === "hub" ? 4 : 2), 0, Math.PI * 2);
    context.fill();

    context.fillStyle =
      node.type === "hub" ? "rgba(205, 204, 204, 0.26)" : "rgba(108, 196, 199, 0.2)";
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

export function initNeuralNetwork(canvas, win = window) {
  if (!canvas || typeof canvas.getContext !== "function") {
    return false;
  }

  const context = canvas.getContext("2d", { alpha: true });

  if (!context) {
    return false;
  }

  const pixelRatio = Math.min(win.devicePixelRatio || 1, 1.5);
  let network = null;

  const resize = () => {
    const { width, height } = getCanvasSize(canvas, win);

    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    network = createNeuralNetwork({
      height,
      seed: 42,
      width,
    });

    drawNetwork(context, network);
  };

  resize();
  win.addEventListener("resize", resize, { passive: true });

  return () => {
    win.removeEventListener("resize", resize);
  };
}
