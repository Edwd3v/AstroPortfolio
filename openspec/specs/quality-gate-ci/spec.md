# Especificacion: quality-gate-ci

## Proposito

Garantizar que `npm run test:ci` ejecute todos los archivos de test del proyecto, incluyendo `tests/footer.test.mjs`.

## Requisitos

### Requisito: Footer Test en Pipeline CI

El script `test:ci` en `package.json` DEBE incluir `tests/footer.test.mjs` en la cadena de ejecucion. El test DEBE ejecutarse despues de todos los tests existentes y el pipeline completo DEBE completar sin errores.

#### Escenario: test:ci incluye el test de footer

- GIVEN que `neural-network.test.mjs` pasa sin errores
- WHEN se ejecuta `npm run test:ci`
- THEN `tests/footer.test.mjs` se ejecuta
- AND los 8 tests de footer pasan

#### Escenario: test:ci fail-fast ante falla de neural-network

- GIVEN que `neural-network.test.mjs` falla
- WHEN se ejecuta `npm run test:ci`
- THEN la cadena se detiene antes de ejecutar tests subsecuentes
- AND el pipeline reporta error

#### Escenario: Pipeline completo en verde

- GIVEN que todos los tests individuales pasan
- WHEN se ejecuta `npm run test:ci`
- THEN los 5 archivos de test se ejecutan en orden
- AND el pipeline completa con exit code 0
