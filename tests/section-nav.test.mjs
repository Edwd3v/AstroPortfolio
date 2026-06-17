import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getMostVisibleSection,
  getMostVisibleSectionFromRatios,
  initSectionNavigation,
} from "../src/scripts/section-nav.js";

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
    toggle(className, force) {
      if (force) {
        classes.add(className);
      } else {
        classes.delete(className);
      }
    },
  };
}

function createLink(sectionId) {
  return {
    attributes: new Map(),
    classList: createClassList(),
    dataset: { navSection: sectionId },
    events: new Map(),
    offsetWidth: 1,
    addEventListener(name, callback) {
      this.events.set(name, callback);
    },
    dispatchEvent(name) {
      this.events.get(name)?.();
    },
    removeAttribute(name) {
      this.attributes.delete(name);
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);
    },
  };
}

test("getMostVisibleSection selects the intersecting section with highest ratio", () => {
  const sectionId = getMostVisibleSection([
    { isIntersecting: true, intersectionRatio: 0.22, target: { id: "projects" } },
    { isIntersecting: true, intersectionRatio: 0.58, target: { id: "about" } },
    { isIntersecting: false, intersectionRatio: 0.9, target: { id: "contact" } },
  ]);

  assert.equal(sectionId, "about");
});

test("getMostVisibleSectionFromRatios selects from stable visibility state", () => {
  const sectionId = getMostVisibleSectionFromRatios(
    new Map([
      ["projects", 0.18],
      ["about", 0.42],
      ["contact", 0.31],
    ]),
  );

  assert.equal(sectionId, "about");
});

test("getMostVisibleSectionFromRatios returns undefined when no section is visible", () => {
  assert.equal(
    getMostVisibleSectionFromRatios(
      new Map([
        ["projects", 0],
        ["about", 0],
        ["contact", 0],
      ]),
    ),
    undefined,
  );
});

test("initSectionNavigation marks the current section and triggers distortion", () => {
  const links = [createLink("projects"), createLink("about"), createLink("contact")];
  const sections = {
    projects: { id: "projects" },
    about: { id: "about" },
    contact: { id: "contact" },
  };

  class FakeIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }

    disconnect() {}

    observe() {}
  }

  const doc = {
    getElementById(id) {
      return sections[id];
    },
    querySelectorAll(selector) {
      return selector === "[data-nav-section]" ? links : [];
    },
  };
  const win = {
    IntersectionObserver: FakeIntersectionObserver,
    location: { hash: "#about" },
    matchMedia() {
      return { matches: false };
    },
    setTimeout() {
      return 1;
    },
  };

  assert.equal(typeof initSectionNavigation(doc, win), "function");
  assert.equal(links[1].classList.contains("is-active"), true);
  assert.equal(links[1].classList.contains("is-distorting"), true);
  assert.equal(links[1].attributes.get("aria-current"), "location");
});

test("initSectionNavigation triggers distortion from hover and focus listeners", () => {
  const links = [createLink("projects"), createLink("about"), createLink("contact")];
  const sections = {
    projects: { id: "projects" },
    about: { id: "about" },
    contact: { id: "contact" },
  };

  class FakeIntersectionObserver {
    disconnect() {}

    observe() {}
  }

  const doc = {
    getElementById(id) {
      return sections[id];
    },
    querySelectorAll(selector) {
      return selector === "[data-nav-section]" ? links : [];
    },
  };
  const win = {
    IntersectionObserver: FakeIntersectionObserver,
    location: { hash: "" },
    matchMedia() {
      return { matches: false };
    },
    setTimeout() {
      return 1;
    },
  };

  initSectionNavigation(doc, win);
  links[2].dispatchEvent("pointerenter");

  assert.equal(links[2].classList.contains("is-distorting"), true);

  links[1].dispatchEvent("focus");

  assert.equal(links[1].classList.contains("is-distorting"), true);
});

test("initSectionNavigation keeps nav distortion when reduced motion is requested", () => {
  const links = [createLink("projects"), createLink("about"), createLink("contact")];
  const sections = {
    projects: { id: "projects" },
    about: { id: "about" },
    contact: { id: "contact" },
  };

  class FakeIntersectionObserver {
    disconnect() {}

    observe() {}
  }

  const doc = {
    getElementById(id) {
      return sections[id];
    },
    querySelectorAll(selector) {
      return selector === "[data-nav-section]" ? links : [];
    },
  };
  const win = {
    IntersectionObserver: FakeIntersectionObserver,
    location: { hash: "" },
    matchMedia() {
      return { matches: true };
    },
    setTimeout() {
      return 1;
    },
  };

  initSectionNavigation(doc, win);
  links[0].dispatchEvent("pointerenter");

  assert.equal(links[0].classList.contains("is-distorting"), true);
});
