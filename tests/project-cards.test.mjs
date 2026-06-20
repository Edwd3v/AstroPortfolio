import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function readHtml(locale) {
  return readFileSync(resolve(root, `dist/${locale}/index.html`), "utf8");
}

function getProjectCardBlocks(html) {
  return [...html.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)].filter(
    ([, attributes]) => /class="[^"]*\bproject-card\b[^"]*"/.test(attributes),
  );
}

function hasBooleanAttribute(attributes, name) {
  const withoutQuotedValues = attributes.replace(/="[^"]*"/g, "");

  return new RegExp(`(?:^|\\s)${name}(?:\\s|=|$)`, "i").test(withoutQuotedValues);
}

function assertProjectCards(locale, cueText, labels) {
  const html = readHtml(locale);
  const cards = getProjectCardBlocks(html);

  assert.ok(cards.length > 0, `Expected project card <details> blocks in ${locale}`);

  for (const match of cards) {
    const attributes = match[1] ?? "";
    const cardHtml = match[0];

    assert.equal(
      hasBooleanAttribute(attributes, "open"),
      false,
      `Expected closed project card by default in ${locale}`,
    );
    assert.match(
      cardHtml,
      new RegExp(`<summary[^>]*>[\\s\\S]*?${cueText}[\\s\\S]*?<\\/summary>`),
      `Expected localized summary cue in ${locale}`,
    );

    for (const label of labels) {
      assert.match(
        cardHtml,
        new RegExp(`>\\s*${label}\\s*<`),
        `Expected ${label} label in ${locale} project card details`,
      );
    }
  }
}

test("Spanish project cards render closed details with localized summary cues", () => {
  assertProjectCards("es", "Ver detalles →", ["Problema", "Solución", "Resultado"]);
});

test("English project cards render closed details with localized summary cues", () => {
  assertProjectCards("en", "View details →", ["Problem", "Solution", "Result"]);
});
