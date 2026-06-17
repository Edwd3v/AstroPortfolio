# Tasks: clean-quality-gate-footer-test

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 25-70 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Fix neural-network root cause and wire footer into CI | PR 1 | Single slice; include validations and manual canvas check |

## Phase 1: Foundation

- [x] 1.1 Revisar `src/scripts/neural-network.js` y ubicar `connect()` y la construcción de spoke/branch para mapear exactamente dónde hoy se salta `maxDegree` y dónde se asigna `route: true`.
- [x] 1.2 Confirmar en `tests/neural-network.test.mjs` los contratos a preservar: límite de grado por tipo y rutas estructurales solo `hub↔hub`.

## Phase 2: Core Fix

- [x] 2.1 Modificar `src/scripts/neural-network.js` para que `connect()` aplique `maxDegree` a TODA conexión, incluyendo `route: true`.
- [x] 2.2 Ajustar en `src/scripts/neural-network.js` las conexiones spoke (`hub→secondary`) y branch (`secondary→secondary`) para que sigan siendo estáticas pero no marquen `route: true` ni alimenten `routes`.
- [x] 2.3 Verificar en el mismo archivo que `createNeuralNetwork()` siga retornando `{ connections, hubs, nodes, routes }` y que `routes` conserve solo segmentos `hub↔hub`.

## Phase 3: CI Wiring

- [x] 3.1 Actualizar `package.json` para agregar `node tests/footer.test.mjs` al final de `scripts.test:ci`, manteniendo `&&` fail-fast.
- [x] 3.2 Tocar `tests/neural-network.test.mjs` o `tests/footer.test.mjs` SOLO si aparece una ambigüedad contractual real; si no, dejarlos sin cambios.

## Phase 4: Verification

- [x] 4.1 Ejecutar `node tests/neural-network.test.mjs` y comprobar 3/3 pass para los escenarios de degree gate y rutas `hub↔hub`.
- [x] 4.2 Ejecutar `npm run typecheck`, `npm run build`, `node tests/footer.test.mjs` y luego `npm run test:ci`; registrar que las 5 suites pasan en orden.
- [x] 4.3 Validar manualmente el canvas neural network en browser para confirmar que las conexiones locales siguen visibles y que no hay regresión visual obvia.
