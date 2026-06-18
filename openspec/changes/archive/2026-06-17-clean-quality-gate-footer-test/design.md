# Design: clean-quality-gate-footer-test

## Enfoque técnico

Corregir el quality gate desde la causa raíz: ajustar la generación de `createNeuralNetwork()` para que el contrato probado por `tests/neural-network.test.mjs` sea verdadero, y luego agregar `tests/footer.test.mjs` al script `test:ci`. No se agregan dependencias, no se cambia la intención de los tests y no se hace refactor amplio.

## Decisiones de arquitectura

| Opción | Tradeoff | Decisión |
|---|---|---|
| Arreglar `connect()` para aplicar `maxDegree` a toda conexión | Puede reducir algunas conexiones generadas, pero preserva el contrato de grado | Elegida: el límite de grado debe ser una invariante del grafo, no depender de `route` |
| Quitar rutas locales `hub→secondary` / `secondary→secondary` del array `routes` | Reduce señales animadas locales, pero conserva líneas estáticas de cluster | Elegida: `routes` queda reservado para rutas estructurales `hub↔hub`, como exige el test |
| Mantener `&&` en `test:ci` | Fail-fast oculta tests posteriores cuando hay fallas previas, pero es correcto con gate verde | Elegida: no cambiar semántica del gate; solo conectar footer al final |
| No modificar tests salvo necesidad contractual | Menor flexibilidad, mayor confianza | Elegida: los tests describen contratos válidos; el código actual los viola |

## Flujo de datos / algoritmo

```text
createNeuralNetwork()
  ├─ create nodes: hubs, secondary, ambient
  ├─ connect() enforces maxDegree for every connection
  ├─ cluster connections remain static graph edges
  ├─ structuralPairs create only hub↔hub route connections
  └─ routes[] contains animated structural routes only

test:ci ─→ spotlight ─→ neural-network ─→ section-nav ─→ logo-decode ─→ footer
```

Impacto esperado: `connections` sigue conteniendo el grafo visual base; `routes` deja de contener segmentos locales no estructurales. El canvas mantiene nodos y líneas, pero puede mostrar menos señales animadas dentro de clusters locales.

## Cambios de archivos

| Archivo | Acción | Descripción |
|---|---|---|
| `src/scripts/neural-network.js` | Modify | En `connect()`, eliminar el bypass `!route` del guard de grado. En la construcción de rutas locales, no marcar `spoke`/`branch` como `route: true` ni empujarlas a `routes`. |
| `package.json` | Modify | Agregar `node tests/footer.test.mjs` al final de `scripts.test:ci`. |
| `tests/neural-network.test.mjs` | No change expected | Mantener contrato: degree limits y rutas estructurales solo `hub↔hub`. |
| `tests/footer.test.mjs` | No change expected | Ya valida 8 escenarios y ejecuta build en `before()`. |

## Interfaces / contratos

`createNeuralNetwork({ height, seed, width })` debe seguir retornando `{ connections, hubs, nodes, routes }`.

Contratos preservados:
- hubs: `degree <= 7`
- secondary: `degree <= 3`
- ambient: `degree <= 2`
- todo `route.segments[]` debe tener `segment.route === true`, `start.type === "hub"`, `end.type === "hub"`
- `test:ci` debe ejecutar también `tests/footer.test.mjs`

## Estrategia de validación

| Capa | Qué probar | Enfoque |
|---|---|---|
| Unit | `createNeuralNetwork` conserva topología, límites de grado y rutas estructurales | `node tests/neural-network.test.mjs` |
| Integration | Gate completo ejecuta footer después de las suites existentes | `npm run test:ci` |
| Build/type | Astro compila y tipos siguen válidos | `npm run build`, `npm run typecheck` |
| Visual manual | Canvas sigue renderizando sin regresión obvia | Abrir home, revisar desktop/mobile y opcional `?neural-debug` |

## Rollback

Revertir los cambios en `src/scripts/neural-network.js` y `package.json`. No hay migración ni datos persistidos. El rollback devuelve el estado visual anterior, aunque también reintroduce el gate rojo.

## Riesgos y mitigación

- Regresión visual sutil: menos señales locales. Mitigar preservando conexiones estáticas y validando manualmente el canvas.
- Menos rutas si `connect()` rechaza una conexión por grado: aceptar como consecuencia del contrato; validar que `network.routes.length >= 4` siga pasando.
- `footer.test.mjs` ejecuta `npm run build`: costo adicional tolerado; no optimizar en este cambio.

## Preguntas abiertas

Ninguna bloqueante.
