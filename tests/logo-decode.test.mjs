import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DEFAULT_DURATION,
  createDecodedText,
  getDecodedCharacters,
  initLogoDecode,
} from "../src/scripts/logo-decode.js";

function createClassList() {
  const classes = new Set();

  return {
    add(className) {
      classes.add(className);
    },
    contains(className) {
      return classes.has(className);
    },
    remove(className) {
      classes.delete(className);
    },
  };
}

function createLogo(text = "Edwd3v") {
  const doc = createFakeDocument();

  return {
    ariaLabel: "",
    children: [],
    classList: createClassList(),
    dataset: { logoDecodeState: "", logoFinal: text.toUpperCase() },
    ownerDocument: doc,
    textContent: text,
    removeAttribute(name) {
      if (name === "aria-label") {
        this.ariaLabel = "";
      }
    },
    replaceChildren(fragment) {
      this.children = fragment.children;
      this.textContent = fragment.children.map((child) => child.textContent).join("");
    },
    setAttribute(name, value) {
      if (name === "aria-label") {
        this.ariaLabel = value;
      }
    },
  };
}

function createFakeDocument() {
  return {
    createDocumentFragment() {
      return {
        children: [],
        append(child) {
          this.children.push(child);
        },
      };
    },
    createElement() {
      return {
        className: "",
        textContent: "",
        attributes: new Map(),
        setAttribute(name, value) {
          this.attributes.set(name, value);
        },
      };
    },
  };
}

test("createDecodedText resolves to the final logo when progress is complete", () => {
  assert.equal(createDecodedText("EDWD3V", 1500, () => 0), "EDWD3V");
});

test("createDecodedText keeps unrevealed characters within the technical glyph set", () => {
  const decoded = createDecodedText("EDWD3V", 0, () => 0);

  assert.equal(decoded, "AAAAAA");
});

test("createDecodedText keeps characters mutating before the reveal window starts", () => {
  const decoded = createDecodedText("EDWD3V", 450, () => 0);

  assert.equal(decoded, "AAAAAA");
});

test("createDecodedText resolves characters progressively by index", () => {
  assert.equal(createDecodedText("EDWD3V", 500, () => 0), "EAAAAA");
  assert.equal(createDecodedText("EDWD3V", 850, () => 0), "EDWAAA");
  assert.equal(createDecodedText("EDWD3V", 1200, () => 0), "EDWD3A");
  assert.equal(createDecodedText("EDWD3V", 1400, () => 0), "EDWD3V");
});

test("getDecodedCharacters exposes resolved state per character", () => {
  assert.deepEqual(getDecodedCharacters("EDWD3V", 850, () => 0), [
    { character: "E", isResolved: true },
    { character: "D", isResolved: true },
    { character: "W", isResolved: true },
    { character: "A", isResolved: false },
    { character: "A", isResolved: false },
    { character: "A", isResolved: false },
  ]);
});

test("default logo decode duration is close to one and a half seconds", () => {
  assert.equal(DEFAULT_DURATION, 1500);
});

test("initLogoDecode keeps character decoding when reduced motion is requested", () => {
  const logo = createLogo();
  const callbacks = [];
  let currentTime = 0;
  const doc = {
    querySelectorAll(selector) {
      return selector === "[data-logo-decode]" ? [logo] : [];
    },
  };
  const win = {
    matchMedia() {
      return { matches: true };
    },
    performance: {
      now() {
        return currentTime;
      },
    },
    requestAnimationFrame(callback) {
      callbacks.push(callback);
      return callbacks.length;
    },
  };

  assert.equal(initLogoDecode(doc, win), true);
  assert.equal(logo.classList.contains("is-decoding"), true);
  assert.equal(logo.dataset.logoDecodeState, "active");
  assert.notEqual(logo.textContent, "EDWD3V");

  currentTime = 1500;
  callbacks.shift()(currentTime);

  assert.equal(logo.textContent, "EDWD3V");
  assert.equal(logo.dataset.logoDecodeState, "done");
  assert.equal(logo.classList.contains("is-decoded"), true);
});

test("initLogoDecode decodes the logo and stabilizes at the final text", () => {
  const logo = createLogo();
  const callbacks = [];
  let currentTime = 0;
  const doc = {
    querySelectorAll(selector) {
      return selector === "[data-logo-decode]" ? [logo] : [];
    },
  };
  const win = {
    matchMedia() {
      return { matches: false };
    },
    URLSearchParams,
    location: { search: "" },
    localStorage: {
      getItem() {
        return null;
      },
    },
    performance: {
      now() {
        return currentTime;
      },
    },
    requestAnimationFrame(callback) {
      callbacks.push(callback);
      return callbacks.length;
    },
    setTimeout(callback) {
      callback();
      return 1;
    },
  };

  assert.equal(initLogoDecode(doc, win), true);
  assert.equal(logo.classList.contains("is-decoding"), true);
  assert.equal(logo.dataset.logoDecodeState, "active");
  assert.equal(logo.ariaLabel, "EDWD3V");
  assert.equal(logo.children.length, 6);

  currentTime = 750;
  callbacks.shift()(currentTime);

  assert.notEqual(logo.textContent, "EDWD3V");
  assert.equal(logo.children.length, 6);
  assert.equal(logo.classList.contains("is-decoding"), true);
  assert.equal(logo.classList.contains("is-decoded"), false);

  currentTime = 1500;
  callbacks.shift()(currentTime);

  assert.equal(logo.textContent, "EDWD3V");
  assert.equal(logo.ariaLabel, "");
  assert.equal(logo.dataset.logoDecodeState, "done");
  assert.equal(logo.classList.contains("is-decoding"), false);
  assert.equal(logo.classList.contains("is-decoded"), true);
});

test("initLogoDecode exposes debug logs when logo-debug query is present", () => {
  const logo = createLogo();
  const callbacks = [];
  const logs = [];
  let currentTime = 0;
  const doc = {
    querySelectorAll(selector) {
      return selector === "[data-logo-decode]" ? [logo] : [];
    },
  };
  const win = {
    console: {
      log(...args) {
        logs.push(args);
      },
    },
    matchMedia() {
      return { matches: false };
    },
    URLSearchParams,
    location: { search: "?logo-debug" },
    localStorage: {
      getItem() {
        return null;
      },
    },
    performance: {
      now() {
        return currentTime;
      },
    },
    requestAnimationFrame(callback) {
      callbacks.push(callback);
      return callbacks.length;
    },
    setTimeout(callback) {
      callback();
      return 1;
    },
  };

  initLogoDecode(doc, win);
  currentTime = 1500;
  callbacks.shift()(currentTime);

  assert.equal(logs.some(([message]) => message === "logo decode loaded"), true);
  assert.equal(logs.some(([message]) => message === "logo decode start"), true);
  assert.equal(logs.some(([message]) => message === "logo decode finished"), true);
});
