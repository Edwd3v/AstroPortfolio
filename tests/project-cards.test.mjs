import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function readHtml(locale) {
  return readFileSync(resolve(root, `dist/${locale}/index.html`), "utf8");
}

function readCssBundle(html) {
  const match = html.match(/<link rel="stylesheet" href="([^"]+\.css)">/);

  assert.ok(match, "Expected built HTML to reference a CSS bundle");

  return readFileSync(resolve(root, `dist${match[1]}`), "utf8");
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

function getSummaryHtml(cardHtml) {
  const match = cardHtml.match(/<summary[^>]*>([\s\S]*?)<\/summary>/);

  assert.ok(match, "Expected project card summary markup");

  return match[1];
}

function getReducedMotionCss(css) {
  const match = css.match(/@media\(prefers-reduced-motion:reduce\)\{([\s\S]*?)\}\}/);

  assert.ok(match, "Expected reduced-motion CSS block");

  return match[1];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertProjectCards(locale, cueText, labels, expectedCards) {
  const html = readHtml(locale);
  const css = readCssBundle(html);
  const reducedMotionCss = getReducedMotionCss(css);
  const cards = getProjectCardBlocks(html);

  assert.ok(cards.length > 0, `Expected project card <details> blocks in ${locale}`);
  assert.equal(cards.length, expectedCards.length, `Expected ${expectedCards.length} project cards in ${locale}`);

  for (const [index, match] of cards.entries()) {
    const attributes = match[1] ?? "";
    const cardHtml = match[0];
    const summaryHtml = getSummaryHtml(cardHtml);
    const expectedCard = expectedCards[index];

    assert.equal(
      hasBooleanAttribute(attributes, "open"),
      false,
      `Expected closed project card by default in ${locale}`,
    );
    assert.match(
      summaryHtml,
      new RegExp(escapeRegExp(cueText)),
      `Expected localized summary cue in ${locale}`,
    );
    assert.match(
      summaryHtml,
      />\s*\+\s*</,
      `Expected visible disclosure plus symbol in ${locale} project card ${expectedCard.title}`,
    );
    assert.doesNotMatch(
      summaryHtml,
      /<(?:div|p|ul|li)\b/i,
      `Expected summary to avoid block/list elements in ${locale} project card ${expectedCard.title}`,
    );

    assert.match(
      summaryHtml,
      new RegExp(`>\\s*${escapeRegExp(expectedCard.status)}\\s*<`),
      `Expected status badge inside summary in ${locale} project card ${expectedCard.title}`,
    );

    for (const tech of expectedCard.stack) {
      assert.doesNotMatch(
        summaryHtml,
        new RegExp(`>\\s*${escapeRegExp(tech)}\\s*<`),
        `Expected collapsed summary to avoid repeated stack item ${tech} in ${locale} project card ${expectedCard.title}`,
      );
    }

      for (const label of labels) {
        assert.match(
          cardHtml,
          new RegExp(`>\\s*${label}\\s*<`),
          `Expected ${label} label in ${locale} project card details`,
        );
      }

    assert.match(
      cardHtml,
      new RegExp(`>\\s*${escapeRegExp(expectedCard.title)}\\s*<`),
      `Expected localized title for ${locale} project card ${index + 1}`,
    );

    for (const snippet of expectedCard.snippets) {
      assert.match(
        cardHtml,
        new RegExp(escapeRegExp(snippet)),
        `Expected localized content snippet in ${locale} project card ${expectedCard.title}`,
      );
    }
  }

  assert.match(
    reducedMotionCss,
    /\.project-card(?:\[[^\]]+\])?,\.project-card__summary(?:\[[^\]]+\])?,\.project-card__reveal(?:\[[^\]]+\])?\{transition:none/,
    `Expected reduced-motion summary transition override in ${locale}`,
  );
  for (const declaration of ["max-height:none", "opacity:1", "transform:none"]) {
    assert.match(
      reducedMotionCss,
      new RegExp(`\\.project-card__reveal(?:\\[[^\\]]+\\])?\\{[\\s\\S]*?${declaration}`),
      `Expected reduced-motion reveal override '${declaration}' in ${locale}`,
    );
  }
}

test("Spanish project cards render closed details with localized summary cues", () => {
  assertProjectCards(
    "es",
    "Ver detalles",
    ["Problema", "Solución", "Resultado"],
    [
      {
        title: "Mensajes Masivos por WhatsApp",
        snippets: [
          "Había que contactar cerca de 400 personas para depurar errores del SISBÉN",
          "Construí una automatización sobre WhatsApp Web",
        ],
        status: "Funcional / Mantenimiento",
        stack: ["Python", "Selenium", "PyAutoGUI"],
      },
      {
        title: "Automatización de Indicadores SISBEN",
        snippets: [
          "no mostraba tiempos de respuesta, pendientes, rechazos ni evolución de gestión",
          "Procesé los datos históricos con scripts en Python",
        ],
        status: "Funcional / En evolución",
        stack: ["Python", "Pandas", "OpenPyXL"],
      },
      {
        title: "Dashboard de Portafolio de Inversión",
        snippets: [
          "La app del bróker no segmentaba la información como se necesitaba",
          "Estoy construyendo un dashboard en Django",
        ],
        status: "Beta / Desarrollo activo",
        stack: ["Django", "PostgreSQL", "HTMX"],
      },
    ],
  );
});

test("English project cards render closed details with localized summary cues", () => {
  assertProjectCards(
    "en",
    "View details",
    ["Problem", "Solution", "Result"],
    [
      {
        title: "Mass WhatsApp Messaging",
        snippets: [
          "I needed to contact around 400 people to clean SISBÉN data errors",
          "I built a WhatsApp Web automation",
        ],
        status: "Functional / Maintenance",
        stack: ["Python", "Selenium", "PyAutoGUI"],
      },
      {
        title: "SISBEN Indicators Automation",
        snippets: [
          "it did not show response times, pending work, rejections, or process evolution",
          "I processed historical request data with Python scripts",
        ],
        status: "Functional / Evolving",
        stack: ["Python", "Pandas", "OpenPyXL"],
      },
      {
        title: "Investment Portfolio Dashboard",
        snippets: [
          "The broker app did not segment information the way we needed",
          "each participant signs in to see only their own data",
        ],
        status: "Beta / Active development",
        stack: ["Django", "PostgreSQL", "HTMX"],
      },
    ],
  );
});
