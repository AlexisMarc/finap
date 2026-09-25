# Proposal

## Why

El rediseño a Spectrum (`ui-spectrum-foundation` y `ui-spectrum-app`) cambia la implementación visual de la app. Antes de dar la migración por cerrada hay que repasar el ecosistema de verificación: tests unitarios de los componentes migrados, la suite E2E (selectores y roles de Spectrum), la PWA (nuevo precache con fuentes/icons de Spectrum) y el tamaño del bundle.

## What Changes

- **Tests unitarios**: actualizar/ampliar los tests de tokens, tema, componentes base y de app para la implementación Spectrum (verificación de atributos/eventos y de los alias de tokens).
- **E2E**: revisar los 28 tests contra los componentes Spectrum (labels, placeholders y estructura de diálogos/pickers), conservando las aserciones por rol siempre que sea posible y reescribiendo solo los selectores rotos.
- **PWA**: actualizar el precache de workbox (fuentes y assets de Spectrum) y comprobar el modo offline.
- **Bundle**: medir el tamaño del build y, si crece demasiado, ajustar imports (paquetes individuales, icons bajo demanda).
- **Limpieza**: retirar dependencias muertas tras la migración (fuentes antiguas, helpers de iconos custom sin uso).

Este change es **solo verificación/ajustes de tooling**: no cambia comportamiento especificado, por lo que declara `skip_specs: true`.

## Capabilities

### New Capabilities

<!-- Ninguna: tooling de verificación. -->

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Tests**: `src/**/*.test.ts` afectados por la migración; `e2e/**` (ajuste de selectores).
- **Build/PWA**: `vite.config.ts` (workbox globs, manualChunks si hace falta), `dist/`.
- **Dependencias**: limpieza de paquetes obsoletos.
- **Relacionado**: fase final de `ui-spectrum-foundation` + `ui-spectrum-app`.
