import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function readHtml(locale) {
  return readFileSync(resolve(root, `dist/${locale}/index.html`), "utf8");
}

test("Spanish home uses the shorter hero positioning and copy-email contact button", () => {
  const html = readHtml("es");

  assert.match(html, /Transformo procesos manuales en herramientas claras, útiles y medibles\./);
  assert.match(html, /data-copy-email-button/);
  assert.match(html, /Copiado/);
  assert.match(html, /Problema primero/);
  assert.doesNotMatch(html, /Una selección de proyectos reales enfocados/);
});

test("English home uses the shorter hero positioning and copy-email contact button", () => {
  const html = readHtml("en");

  assert.match(html, /I turn manual processes into clear, useful, measurable tools\./);
  assert.match(html, /Copied/);
  assert.match(html, /Problem first/);
  assert.doesNotMatch(html, /A selection of real projects focused on software/);
});
