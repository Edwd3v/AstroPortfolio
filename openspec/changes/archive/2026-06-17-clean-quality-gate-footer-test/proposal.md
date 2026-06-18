# Propuesta: clean-quality-gate-footer-test

## Intención

El quality gate (`npm run test:ci`) está roto porque `neural-network.test.mjs` tiene 2 fallas preexistentes que bloquean la cadena `&&`. Además, `footer.test.mjs` pasa 8/8 pero no está conectado al gate. El objetivo es corregir la causa raíz de las fallas en el algoritmo neural-network y luego cablear el test de footer al pipeline de CI.

## Problema

### Falla 1 — Degree gate bypass (test #2, seed 11)
`connect()` en `src/scripts/neural-network.js:195` aplica el chequeo de `maxDegree` solo cuando `!route`. Las conexiones con `route: true` pueden exceder el límite de grado, violando la aserción `degree <= 3` para nodos `secondary`.

### Falla 2 — Route contract violation (test #3, seed 13)
Las rutas locales (líneas 306-307) crean segmentos `hub→secondary` (spoke) y `secondary→secondary` (branch) marcados como `route: true`. El test "keeps structural routes between hub connections only" exige que **todos** los segmentos de ruta sean `hub↔hub`. El código viola este contrato.

### Gate incompleto
`footer.test.mjs` no forma parte de `test:ci`, dejando el componente footer sin cobertura automática en el pipeline.

## Alcance

### In Scope
- Corregir degree gate bypass en `connect()` para que todas las conexiones respeten `maxDegree`
- Corregir route contract: eliminar rutas locales del array `routes` y remover flag `route: true` de spoke/branch
- Cablear `tests/footer.test.mjs` al script `test:ci`
- Validar build + typecheck + test:ci en verde

### Out of Scope
- Cambiar el comportamiento visual del canvas (las conexiones spoke/branch siguen existiendo, solo pierden el flag `route`)
- Modificar expectativas de los tests existentes
- Reestructurar el sistema de rutas más allá de la corrección mínima
- Optimizar el build duplicado en footer test (deuda técnica menor, no blocker)

## Capacidades

> Esta sección es el CONTRATO entre proposal y specs.
> El agente sdd-spec lee esto para saber qué specs crear o actualizar.

### Nuevas capacidades

- `neural-network-connection`: Restricciones de grado máximo y contrato de rutas hub-to-hub en el algoritmo `connect()` de `src/scripts/neural-network.js`.
- `quality-gate-ci`: Cobertura completa del pipeline `test:ci` incluyendo `tests/footer.test.mjs`.

### Capacidades modificadas

- Ninguna.

## Enfoque técnico

### Fix 1: Degree gate universal
**Archivo**: `src/scripts/neural-network.js:195`
**Cambio**: Remover la condición `!route` del guard de grado. Todas las conexiones (route y no-route) deben respetar `maxDegree`.

### Fix 2: Route contract compliance
**Archivo**: `src/scripts/neural-network.js:306-319`
**Cambio**: Remover `route: true` de spoke y branch. No push al array `routes`.

### Fix 3: Wire footer test
**Archivo**: `package.json:8`
**Cambio**: Agregar `tests/footer.test.mjs` al final de la cadena `test:ci`.

## Áreas afectadas

| Área | Impacto | Descripción |
|------|---------|-------------|
| `src/scripts/neural-network.js` | Modificado | Fix degree gate (línea 195) + remover route flag de spoke/branch (líneas 306-307) |
| `package.json` | Modificado | Agregar footer test a `test:ci` |

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Regresión visual en canvas (menos señales animadas al remover rutas locales) | Media | Las conexiones estáticas se preservan; validar en browser post-fix. |
| Build duplicado en footer test (before hook ejecuta `npm run build`) | Baja | No es blocker. El build es idempotente. |

## Plan de rollback

Revertir los 3 cambios (2 en `neural-network.js`, 1 en `package.json`). El código actual compila y renderiza; solo falla en tests. Rollback es seguro y sin pérdida de datos.

## Dependencias

Ninguna. No se introducen nuevas dependencias.

## Criterios de éxito

- [ ] `npm run test:ci` pasa completo (5 archivos, 0 fallas)
- [ ] `npm run build` sin errores
- [ ] `npm run typecheck` sin errores
- [ ] neural-network.test.mjs: 3/3 tests pasan
- [ ] footer.test.mjs: 8/8 tests pasan
- [ ] Canvas neural-network sigue renderizando correctamente en browser (validación manual)
