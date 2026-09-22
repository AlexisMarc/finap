# Proposal

## Why

El frontend necesita una capa de datos que hoy no existe como API. Para que el equipo de backend construya los servicios correctos, hay que documentar **qué endpoints se necesitan, con qué tipos de dato y con qué payloads de ejemplo**, sin modelar base de datos. Esto desbloquea dashboard, movimientos, formularios, deudas, análisis y el asistente.

## What Changes

- **Documento de contratos de API** en `docs/api/` con: listado de endpoints, tipos TypeScript esperados, parámetros, respuestas y **ejemplos de datos (JSON)**.
- Definición del **cliente de datos** (`src/services/`) que consumirá esos contratos.
- Convenciones: autenticación por token, manejo de errores, paginación y formato de fechas/moneda.

Este change es **solo documentación** (no cambia comportamiento), por eso declara `skip_specs: true`.

## Capabilities

### New Capabilities

<!-- Ninguna: change de documentación. -->

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `docs/api/README.md`, `docs/api/endpoints.md`, `docs/api/types.md`, `docs/api/examples.json` (o `.md`).
- **Referencia para**: el change `services`/`api` de implementación y el equipo de backend.
