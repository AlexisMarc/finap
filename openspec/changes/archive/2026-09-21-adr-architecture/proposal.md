# Proposal

## Why

El proyecto no tiene documentadas sus decisiones de arquitectura ni la estructura por capas de Open Cells. Antes de construir dashboard, vistas y formularios, necesitamos un conjunto de ADR (Architecture Decision Records) que fije los estándares de estructura, estado, routing, testing, i18n, theming, PWA y capa de datos, para que todo el equipo (y el backend) trabaje con las mismas convenciones.

## What Changes

- **Documentación de ADR** en `docs/adr/` con las decisiones clave del proyecto.
- **Estructura del proyecto alineada a las capas de Open Cells** (`@open-cells/core`, `@open-cells/page-controller`, `@open-cells/element-controller`).
- **Convenciones** de carpetas, nomenclatura, testing y organización de páginas/componentes/servicios.

Este change es **solo documentación** (no cambia comportamiento), por eso declara `skip_specs: true`.

## Capabilities

### New Capabilities

<!-- Ninguna: change de documentación. -->

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `docs/adr/` (varios ADR), `docs/architecture.md`.
- **Sin cambios de código**.
