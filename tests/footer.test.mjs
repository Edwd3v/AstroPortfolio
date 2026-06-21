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

test("Spanish page does not render a footer landmark", () => {
  assert.doesNotMatch(readHtml(distEs), /<footer\b/i);
});

test("English page does not render a footer landmark", () => {
  assert.doesNotMatch(readHtml(distEn), /<footer\b/i);
});
