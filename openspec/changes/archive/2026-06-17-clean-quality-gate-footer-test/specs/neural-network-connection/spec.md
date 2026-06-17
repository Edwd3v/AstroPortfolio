# Especificación: neural-network-connection

## Propósito

Garantizar que el algoritmo `connect()` en `src/scripts/neural-network.js` respete las restricciones de grado máximo y el contrato de rutas para todas las conexiones.

## ADDED Requirements

### Requirement: Degree Gate Universal

El sistema MUST aplicar la restricción `maxDegree` a TODAS las conexiones, independientemente del flag `route`. Ninguna conexión (route o non-route) SHALL exceder el grado máximo permitido para sus nodos.

#### Scenario: Route connection rejected when degree exceeded
- GIVEN un nodo `secondary` con grado actual igual a `maxDegree`
- WHEN `connect()` intenta crear una conexión con `route: true` hacia ese nodo
- THEN la conexión es rechazada (retorna `null`)
- AND el grado del nodo no se incrementa

#### Scenario: Non-route connection rejected when degree exceeded
- GIVEN un nodo con grado actual igual a `maxDegree`
- WHEN `connect()` intenta crear una conexión con `route: false`
- THEN la conexión es rechazada (retorna `null`)

#### Scenario: Route connection accepted when under degree limit
- GIVEN un nodo con grado menor a `maxDegree`
- WHEN `connect()` crea una conexión con `route: true`
- THEN la conexión se establece correctamente
- AND el grado de ambos nodos se incrementa en 1

### Requirement: Route Contract — Hub-to-Hub Only

El sistema SHALL generar rutas animadas exclusivamente entre nodos `hub`. Las conexiones locales de tipo spoke (`hub→secondary`) y branch (`secondary→secondary`) MUST existir como conexiones estáticas pero MUST NOT portar el flag `route: true` ni generar segmentos de ruta.

#### Scenario: Spoke connection has no route flag
- GIVEN un hub y un nodo secondary dentro del mismo cluster
- WHEN `connect()` crea la conexión spoke
- THEN la conexión existe como conexión estática
- AND la conexión NO tiene `route: true`

#### Scenario: Branch connection has no route flag
- GIVEN un nodo secondary y su vecino más cercano
- WHEN `connect()` crea la conexión branch
- THEN la conexión existe como conexión estática
- AND la conexión NO tiene `route: true`

#### Scenario: No local routes in routes array
- GIVEN que spoke y branch no tienen flag `route`
- WHEN el sistema construye el array `routes`
- THEN ninguna ruta de tipo "local" se agrega al array
- AND solo las rutas `hub↔hub` generan señales animadas
