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

function getNodePosition(node, time = 0) {
  const depth = node.depth ?? 0.5;

  if (!time) {
    return {
      x: node.x,
      y: node.y + (depth - 0.5) * 18,
    };
  }

  const drift = (node.type === "hub" ? 1.25 : node.type === "secondary" ? 1.8 : 2.4) * (0.75 + depth * 0.6);
  const speed = node.type === "hub" ? 0.00018 : node.type === "secondary" ? 0.00024 : 0.00032;

  return {
    x: node.x + Math.cos(time * speed + node.phase) * drift + (depth - 0.5) * 10,
    y: node.y + Math.sin(time * speed * 1.2 + node.phase) * drift * 0.7 + (depth - 0.5) * 18,
  };
}

function getPointOnConnection(connection, progress, time = 0) {
  const start = getNodePosition(connection.start, time);
  const end = getNodePosition(connection.end, time);

  return {
    x: start.x + (end.x - start.x) * progress,
    y: start.y + (end.y - start.y) * progress,
  };
}

function getRouteLength(route) {
  return route.segments.reduce((total, segment) => total + segment.distance, 0);
}

function getRoutePointAtDistance(route, distance, time = 0) {
  let traversed = 0;

  for (const segment of route.segments) {
    const nextDistance = traversed + segment.distance;

    if (distance <= nextDistance) {
      return {
        point: getPointOnConnection(segment, Math.max(0, (distance - traversed) / segment.distance), time),
        segment,
        traversed,
      };
    }

    traversed = nextDistance;
  }

  const segment = route.segments.at(-1);
  return {
    point: segment ? getPointOnConnection(segment, 1, time) : { x: 0, y: 0 },
    segment,
    traversed,
  };
}

function drawSignalBurst(context, point, intensity) {
  const resolvedIntensity = Math.min(1.2, Math.max(0.18, intensity));
  const radius = 30 * resolvedIntensity;
  const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
  gradient.addColorStop(0, `rgba(205, 204, 204, ${0.58 * resolvedIntensity})`);
  gradient.addColorStop(0.2, `rgba(108, 196, 199, ${0.42 * resolvedIntensity})`);
  gradient.addColorStop(0.62, `rgba(108, 196, 199, ${0.12 * resolvedIntensity})`);
  gradient.addColorStop(1, "rgba(108, 196, 199, 0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = `rgba(205, 204, 204, ${0.28 * resolvedIntensity})`;
  context.lineWidth = 0.9;
  context.beginPath();
  context.arc(point.x, point.y, Math.max(5, radius * 0.34), 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = `rgba(108, 196, 199, ${0.2 * resolvedIntensity})`;
  context.lineWidth = 0.65;
  for (let index = 0; index < 6; index += 1) {
    const angle = (Math.PI * 2 * index) / 6;
    const inner = radius * 0.24;
    const outer = radius * (0.46 + (index % 2) * 0.12);

    context.beginPath();
    context.moveTo(point.x + Math.cos(angle) * inner, point.y + Math.sin(angle) * inner);
    context.lineTo(point.x + Math.cos(angle) * outer, point.y + Math.sin(angle) * outer);
    context.stroke();
  }
}

function getZoneIntensity(point, canvas) {
  const width = canvas.width;
  const height = canvas.height;
  const contentCenterX = width * 0.57;
  const contentCenterY = height * 0.44;
  const normalizedX = (point.x - contentCenterX) / (width * 0.34);
  const normalizedY = (point.y - contentCenterY) / (height * 0.46);
  const contentPressure = Math.max(0, 1 - Math.hypot(normalizedX, normalizedY));

  return 1 - contentPressure * 0.42;
}

function hasDebugEnabled(win = window) {
  const params = new URLSearchParams(win.location.search);

  if (params.has("neural-debug")) {
    return true;
  }

  try {
    return win.localStorage.getItem("neural-debug") === "true";
  } catch {
    return false;
  }
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

  const createNode = ({ cluster = -1, depth = 0.5, radius, type, x, y }) => {
    const node = {
      cluster,
      depth,
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
      if (route) {
        exists.route = true;
        exists.strength = Math.max(exists.strength, strength);
      }
      return exists;
    }

    if (degree.get(start) >= maxDegree(start) || degree.get(end) >= maxDegree(end)) {
      return null;
    }

    const distance = Math.hypot(start.x - end.x, start.y - end.y);
    const connection = {
      depth: (start.depth + end.depth) / 2,
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
      depth: 0.32 + index * 0.1,
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
        depth: 0.24 + random() * 0.62,
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
      depth: 0.18 + random() * 0.74,
      radius: 0.85 + random() * 0.55,
      type: "ambient",
      x: resolvedWidth * (-0.16 + random() * 1.24),
      y: resolvedHeight * (-0.12 + random() * 1.24),
    }),
  );
  const leftAmbientNodes = Array.from({ length: 9 }, () =>
    createNode({
      depth: 0.2 + random() * 0.55,
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

    for (const node of sortedCluster.slice(0, 4)) {
      const localCandidates = sortedCluster
        .filter((candidate) => candidate !== node)
        .map((candidate) => ({
          candidate,
          distance: Math.hypot(candidate.x - node.x, candidate.y - node.y),
        }))
        .sort((first, second) => first.distance - second.distance);

      connect(hub, node, { strength: 0.74 });
      connect(node, localCandidates[0]?.candidate, { strength: 0.58 });
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
  const routeConnections = new Map();

  for (const [start, end] of structuralPairs) {
    const connection = connect(start, end, {
      route: true,
      strength: 1.1,
    });

    if (connection) {
      routeConnections.set(`${start.cluster}:${end.cluster}`, connection);
      routeConnections.set(`${end.cluster}:${start.cluster}`, {
        ...connection,
        start: connection.end,
        end: connection.start,
      });
    }
  }

  const routeBlueprints = [
    [0, 1, 2],
    [4, 0, 1, 3],
    [2, 1, 3, 4],
    [0, 4, 3, 1],
    [4, 3, 1, 2],
  ];

  for (const [index, route] of routeBlueprints.entries()) {
    const segments = route
      .map((cluster, routeIndex) => {
        const nextCluster = route[routeIndex + 1];
        return typeof nextCluster === "number" ? routeConnections.get(`${cluster}:${nextCluster}`) : null;
      })
      .filter(Boolean);

    if (segments.length > 0) {
      routes.push({
        delay: index * 0.11 + random() * 0.18,
        idle: 0.34 + random() * 0.22,
        layer: segments.reduce((total, segment) => total + segment.depth, 0) / segments.length,
        segments,
        speed: 0.000038 + random() * 0.000016,
        type: "long",
      });
    }
  }

  return { connections, hubs, nodes, routes };
}

function drawNetwork(context, network, { debug = false, offsetY = 0, stats = null, time = 0 } = {}) {
  const { connections, nodes, routes } = network;

  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.restore();

  context.lineCap = "round";
  context.save();
  context.translate(0, offsetY);

  for (const connection of connections) {
    const start = getNodePosition(connection.start, time);
    const end = getNodePosition(connection.end, time);
    const midpoint = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
    const zoneIntensity = getZoneIntensity(midpoint, context.canvas);
    const depthWeight = 0.62 + connection.depth * 0.72;
    const alpha = (connection.route
      ? Math.max(0.035, 0.096 * depthWeight - connection.distance / 5600)
      : Math.max(0.018, 0.082 * depthWeight - connection.distance / 3200)) * zoneIntensity;

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = `rgba(108, 196, 199, ${alpha})`;
    context.lineWidth = (connection.route ? 0.75 : 0.5 * connection.strength) * depthWeight;
    context.stroke();
  }

  const activeSignalHeads = [];
  let burstCount = 0;
  let fadedSignalCount = 0;

  for (const route of routes) {
    const cycle = ((time * route.speed + route.delay) % 1 + 1) % 1;

    if (cycle < route.idle) {
      continue;
    }

    const activeProgress = (cycle - route.idle) / (1 - route.idle);
    const signalEnvelope = Math.sin(activeProgress * Math.PI);

    if (signalEnvelope < 0.035) {
      continue;
    }

    const routeLength = getRouteLength(route);
    const headDistance = activeProgress * routeLength;
    const tailDistance = route.type === "local" ? Math.min(120, routeLength * 0.2) : Math.min(210, routeLength * 0.28);
    const tailDistanceOnRoute = Math.max(0, headDistance - tailDistance);
    const tail = getRoutePointAtDistance(route, tailDistanceOnRoute, time).point;
    const head = getRoutePointAtDistance(route, headDistance, time).point;
    const collisionDistance = 112;
    const nearestSignalDistance = activeSignalHeads.reduce(
      (nearest, signal) => Math.min(nearest, Math.hypot(signal.x - head.x, signal.y - head.y)),
      Infinity,
    );
    const proximityFade = Math.min(1, Math.max(0, (nearestSignalDistance - 54) / (collisionDistance - 54)));

    if (proximityFade <= 0.04) {
      continue;
    }

    activeSignalHeads.push(head);

    const trail = context.createLinearGradient(tail.x, tail.y, head.x, head.y);

    const routeDepth = route.layer ?? 0.5;
    const zoneIntensity = getZoneIntensity(head, context.canvas);
    const routeScale = route.type === "local" ? 0.72 : 1.08;
    const routeAlpha = (0.76 + routeDepth * 0.42) * signalEnvelope * proximityFade * zoneIntensity * routeScale;

    if (proximityFade < 0.65) {
      fadedSignalCount += 1;
    }

    trail.addColorStop(0, "rgba(108, 196, 199, 0)");
    trail.addColorStop(0.36, `rgba(108, 196, 199, ${0.08 * routeAlpha})`);
    trail.addColorStop(0.78, `rgba(108, 196, 199, ${0.28 * routeAlpha})`);
    trail.addColorStop(1, `rgba(205, 204, 204, ${0.58 * routeAlpha})`);

    context.strokeStyle = trail;
    context.lineWidth = (route.type === "local" ? 0.78 : 1.18) * (1 + routeDepth * 0.72) * (0.55 + signalEnvelope * 0.45);
    context.beginPath();

    const samples = 14;
    for (let index = 0; index <= samples; index += 1) {
      const distance = tailDistanceOnRoute + ((headDistance - tailDistanceOnRoute) * index) / samples;
      const point = getRoutePointAtDistance(route, distance, time).point;

      if (index === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }

    context.stroke();

    const headGlow = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
    headGlow.addColorStop(0, `rgba(205, 204, 204, ${0.5 * routeAlpha})`);
    headGlow.addColorStop(0.34, `rgba(108, 196, 199, ${0.34 * routeAlpha})`);
    headGlow.addColorStop(1, "rgba(108, 196, 199, 0)");
    context.fillStyle = headGlow;
    context.beginPath();
    context.arc(head.x, head.y, 10, 0, Math.PI * 2);
    context.fill();

    let boundaryDistance = 0;
    for (const segment of route.segments.slice(0, -1)) {
      boundaryDistance += segment.distance;
      const burstWindow = 74;
      const distanceToBoundary = Math.abs(headDistance - boundaryDistance);

      if (distanceToBoundary <= burstWindow && burstCount < 2) {
        const boundary = getRoutePointAtDistance(route, boundaryDistance, time).point;
        drawSignalBurst(context, boundary, Math.sin((1 - distanceToBoundary / burstWindow) * Math.PI) * routeAlpha);
        burstCount += 1;
      }
    }
  }

  if (stats) {
    stats.activeSignals = activeSignalHeads.length;
    stats.bursts = burstCount;
    stats.fadedSignals = fadedSignalCount;
    stats.routes = routes.length;
  }

  if (debug) {
    context.strokeStyle = "rgba(255, 92, 205, 0.18)";
    context.lineWidth = 1;
    context.strokeRect(context.canvas.width * 0.23, context.canvas.height * 0.07, context.canvas.width * 0.68, context.canvas.height * 0.72);
  }

  for (const node of nodes) {
    const point = getNodePosition(node, time);
    const depthWeight = 0.7 + (node.depth ?? 0.5) * 0.7;
    const typeWeight = (node.type === "hub" ? 1.8 : node.type === "secondary" ? 1 : 0.55) * depthWeight;
    const pulse = node.type === "hub" ? (Math.sin(time * 0.0012 + node.phase) + 1) * 0.018 : 0;
    const zoneIntensity = getZoneIntensity(point, context.canvas);
    const glow = (0.034 * typeWeight + pulse) * zoneIntensity;

    context.fillStyle = `rgba(205, 204, 204, ${glow})`;
    context.beginPath();
    context.arc(point.x, point.y, node.radius + (node.type === "hub" ? 4 : 2), 0, Math.PI * 2);
    context.fill();

    context.fillStyle =
      node.type === "hub" ? "rgba(205, 204, 204, 0.27)" : "rgba(108, 196, 199, 0.2)";
    context.beginPath();
    context.arc(point.x, point.y, node.radius, 0, Math.PI * 2);
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

  const debug = hasDebugEnabled(win);
  const reducedMotion = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const pixelRatio = Math.min(win.devicePixelRatio || 1, 1.5);
  const stats = {
    activeSignals: 0,
    bursts: 0,
    fadedSignals: 0,
    lastLog: 0,
    routes: 0,
  };
  let animationFrame = 0;
  let network = null;

  const render = (time = 0) => {
    if (!network) {
      return;
    }

    drawNetwork(context, network, { debug, stats, time: reducedMotion ? 0 : time });

    if (debug && time - stats.lastLog > 1200) {
      stats.lastLog = time;
      console.info("neural-network", {
        activeSignals: stats.activeSignals,
        bursts: stats.bursts,
        fadedSignals: stats.fadedSignals,
        routes: stats.routes,
      });
    }

    if (!reducedMotion && !win.document.hidden) {
      animationFrame = win.requestAnimationFrame(render);
    }
  };

  const resize = () => {
    const { width, height } = getCanvasSize(canvas, win);

    win.cancelAnimationFrame(animationFrame);
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    network = createNeuralNetwork({
      height,
      seed: 42,
      width,
    });

    render(0);
  };

  const handleVisibilityChange = () => {
    win.cancelAnimationFrame(animationFrame);

    if (!reducedMotion && !win.document.hidden) {
      animationFrame = win.requestAnimationFrame(render);
    }
  };

  resize();
  win.addEventListener("resize", resize, { passive: true });
  win.document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    win.cancelAnimationFrame(animationFrame);
    win.removeEventListener("resize", resize);
    win.document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}
