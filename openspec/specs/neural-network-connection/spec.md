# Especificacion: neural-network-connection

## Proposito

Garantizar que el algoritmo `connect()` en `src/scripts/neural-network.js` respete las restricciones de grado maximo y el contrato de rutas para todas las conexiones.

## Requisitos

### Requisito: Degree Gate Universal

El sistema DEBE aplicar la restriccion `maxDegree` a TODAS las conexiones, independientemente del flag `route`. Ninguna conexion (route o non-route) DEBE exceder el grado maximo permitido para sus nodos.

#### Escenario: Conexion route rechazada cuando se excede el grado

- GIVEN un nodo `secondary` con grado actual igual a `maxDegree`
- WHEN `connect()` intenta crear una conexion con `route: true` hacia ese nodo
- THEN la conexion es rechazada (retorna `null`)
- AND el grado del nodo no se incrementa

#### Escenario: Conexion non-route rechazada cuando se excede el grado

- GIVEN un nodo con grado actual igual a `maxDegree`
- WHEN `connect()` intenta crear una conexion con `route: false`
- THEN la conexion es rechazada (retorna `null`)

#### Escenario: Conexion route aceptada cuando esta bajo el limite de grado

- GIVEN un nodo con grado menor a `maxDegree`
- WHEN `connect()` crea una conexion con `route: true`
- THEN la conexion se establece correctamente
- AND el grado de ambos nodos se incrementa en 1

### Requisito: Contrato de Rutas — Solo Hub a Hub

El sistema DEBE generar rutas animadas exclusivamente entre nodos `hub`. Las conexiones locales de tipo spoke (`hub→secondary`) y branch (`secondary→secondary`) DEBEN existir como conexiones estaticas pero NO DEBEN portar el flag `route: true` ni generar segmentos de ruta.

#### Escenario: Conexion spoke sin flag route

- GIVEN un hub y un nodo secondary dentro del mismo cluster
- WHEN `connect()` crea la conexion spoke
- THEN la conexion existe como conexion estatica
- AND la conexion NO tiene `route: true`

#### Escenario: Conexion branch sin flag route

- GIVEN un nodo secondary y su vecino mas cercano
- WHEN `connect()` crea la conexion branch
- THEN la conexion existe como conexion estatica
- AND la conexion NO tiene `route: true`

#### Escenario: Sin rutas locales en el array `routes`

- GIVEN que spoke y branch no tienen flag `route`
- WHEN el sistema construye el array `routes`
- THEN ninguna ruta de tipo "local" se agrega al array
- AND solo las rutas `hub↔hub` generan senales animadas
