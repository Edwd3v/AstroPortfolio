# Especificación: quality-gate-ci

## Propósito

Garantizar que `npm run test:ci` ejecute todos los archivos de test del proyecto, incluyendo `tests/footer.test.mjs`.

## ADDED Requirements

### Requirement: Footer Test en Pipeline CI

El script `test:ci` en `package.json` MUST incluir `tests/footer.test.mjs` en la cadena de ejecución. El test SHALL ejecutarse después de todos los tests existentes y el pipeline completo MUST completar sin errores.

#### Scenario: test:ci includes footer test
- GIVEN que `neural-network.test.mjs` pasa sin errores
- WHEN se ejecuta `npm run test:ci`
- THEN `tests/footer.test.mjs` se ejecuta
- AND los 8 tests de footer pasan

#### Scenario: test:ci fail-fast on neural-network failure
- GIVEN que `neural-network.test.mjs` falla
- WHEN se ejecuta `npm run test:ci`
- THEN la cadena se detiene antes de ejecutar tests subsecuentes
- AND el pipeline reporta error

#### Scenario: Full pipeline green
- GIVEN que todos los tests individuales pasan
- WHEN se ejecuta `npm run test:ci`
- THEN los 5 archivos de test se ejecutan en orden
- AND el pipeline completa con exit code 0
