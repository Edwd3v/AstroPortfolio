import assert from "node:assert/strict";
import { test, before } from "node:test";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const distEs = resolve(root, "dist/es/index.html");
const distEn = resolve(root, "dist/en/index.html");
const skipBuild = process.env.FOOTER_TEST_SKIP_BUILD === "1";

before(() => {
  if (!skipBuild) {
    execSync("npm run build", { cwd: root, stdio: "pipe" });
  }
});

function readHtml(path) {
  return readFileSync(path, "utf8");
}

function getFooter(html) {
  const start = html.indexOf("<footer");
  const end = html.indexOf("</footer>", start);
  if (start === -1 || end === -1) return null;
  return html.slice(start, end + "</footer>".length);
}

const currentYear = new Date().getFullYear();

test("footer landmark exists outside <main> in the Spanish page", () => {
  const html = readHtml(distEs);
  const footerOpen = html.indexOf("<footer");
  const mainClose = html.indexOf("</main>");

  assert.notEqual(footerOpen, -1, "Expected a <footer> element");
  assert.ok(
    mainClose !== -1 && mainClose < footerOpen,
    "Expected <footer> to appear after </main>",
  );
});

test("Spanish footer shows copyright with name, location and current year", () => {
  const footer = getFooter(readHtml(distEs));
  assert.notEqual(footer, null, "Expected a <footer> element");
  assert.match(footer, new RegExp(`© ${currentYear} Edwd3v — Colombia`));
});

test("Spanish footer shows the localized AI First tagline", () => {
  const footer = getFooter(readHtml(distEs));
  assert.notEqual(footer, null, "Expected a <footer> element");
  assert.match(footer, /Construyo con Python, datos e IA\./);
});

test("English footer shows the localized AI First tagline", () => {
  const footer = getFooter(readHtml(distEn));
  assert.notEqual(footer, null, "Expected a <footer> element");
  assert.match(footer, /Built with Python, data, and AI\./);
});

test("footer includes the GitHub link from the social config", () => {
  const footer = getFooter(readHtml(distEs));
  assert.notEqual(footer, null, "Expected a <footer> element");
  assert.match(footer, /https:\/\/github\.com\/Edwd3v/);
});

test("footer does not expose the email address as visible text", () => {
  const footer = getFooter(readHtml(distEs));
  assert.notEqual(footer, null, "Expected a <footer> element");
  assert.doesNotMatch(footer, /edwd3v@gmail\.com/);
});

test("footer includes LinkedIn when URL is configured", () => {
  const footer = getFooter(readHtml(distEs));
  assert.notEqual(footer, null, "Expected a <footer> element");
  assert.match(footer, /linkedin\.com\/in\/edward-torres-b12b5b417/);
});

test("footer links are wrapped in a nav with a localized aria-label", () => {
  const esFooter = getFooter(readHtml(distEs));
  const enFooter = getFooter(readHtml(distEn));
  assert.notEqual(esFooter, null, "Expected Spanish <footer> element");
  assert.notEqual(enFooter, null, "Expected English <footer> element");
  assert.match(esFooter, /aria-label="Enlaces del pie"/);
  assert.match(enFooter, /aria-label="Footer links"/);
});
