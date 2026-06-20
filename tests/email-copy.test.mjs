import assert from "node:assert/strict";
import { test } from "node:test";
import { copyTextToClipboard, initEmailCopy } from "../src/scripts/email-copy.js";

test("copyTextToClipboard uses the Clipboard API when available", async () => {
  let copiedValue = "";
  const ok = await copyTextToClipboard(
    "edwd3v@gmail.com",
    {},
    {
      clipboard: {
        async writeText(value) {
          copiedValue = value;
        },
      },
    },
  );

  assert.equal(ok, true);
  assert.equal(copiedValue, "edwd3v@gmail.com");
});

test("copyTextToClipboard falls back to execCommand copy", async () => {
  const appended = [];
  const doc = {
    body: {
      append(node) {
        appended.push(node);
      },
    },
    createElement() {
      return {
        value: "",
        style: {},
        setAttribute() {},
        select() {},
        remove() {},
      };
    },
    execCommand(command) {
      return command === "copy";
    },
  };

  const ok = await copyTextToClipboard("edwd3v@gmail.com", doc, {});

  assert.equal(ok, true);
  assert.equal(appended.length, 1);
});

test("initEmailCopy updates live status after copying", async () => {
  const status = { textContent: "" };
  const listeners = new Map();
  let scheduledReset;
  const button = {
    dataset: {
      copyEmailDefault: "",
      copyEmailSuccess: "Email copied",
      copyEmailValue: "edwd3v@gmail.com",
    },
    getAttribute(name) {
      return name === "aria-describedby" ? "contact-copy-status" : null;
    },
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    removeEventListener(name) {
      listeners.delete(name);
    },
    querySelector() {
      return null;
    },
  };
  const doc = {
    getElementById(id) {
      return id === "contact-copy-status" ? status : null;
    },
    querySelectorAll(selector) {
      return selector === "[data-copy-email-button]" ? [button] : [];
    },
  };
  const win = {
    clearTimeout() {},
    navigator: {
      clipboard: {
        async writeText() {},
      },
    },
    setTimeout(callback) {
      scheduledReset = callback;
      return 1;
    },
  };

  const cleanup = initEmailCopy(doc, win);

  await listeners.get("click")();

  assert.equal(typeof cleanup, "function");
  assert.equal(status.textContent, "Email copied");

  scheduledReset();
  assert.equal(status.textContent, "");
});

test("initEmailCopy does not show success feedback when copying fails", async () => {
  const status = { textContent: "" };
  const listeners = new Map();
  let scheduledReset;
  const button = {
    dataset: {
      copyEmailDefault: "",
      copyEmailSuccess: "Email copied",
      copyEmailValue: "edwd3v@gmail.com",
    },
    getAttribute(name) {
      return name === "aria-describedby" ? "contact-copy-status" : null;
    },
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    removeEventListener(name) {
      listeners.delete(name);
    },
    querySelector() {
      return null;
    },
  };
  const doc = {
    getElementById(id) {
      return id === "contact-copy-status" ? status : null;
    },
    querySelectorAll(selector) {
      return selector === "[data-copy-email-button]" ? [button] : [];
    },
  };
  const win = {
    clearTimeout() {},
    navigator: {
      clipboard: {
        async writeText() {
          throw new Error("denied");
        },
      },
    },
    setTimeout(callback) {
      scheduledReset = callback;
      return 1;
    },
  };

  initEmailCopy(doc, win);

  await listeners.get("click")();

  assert.equal(status.textContent, "");
  assert.equal("copied" in button.dataset, false);

  scheduledReset();
  assert.equal(status.textContent, "");
});
