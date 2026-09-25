# Proposal

## Why

Hoy solo hay **tests unitarios** (Vitest + happy-dom, sin navegador real). No se validan los flujos completos en un navegador: navegación entre páginas, formularios, cambio de idioma/tema, i18n, PWA y la integración con la API. Necesitamos pruebas **end-to-end** para detectar regresiones en la app real.

## What Changes

- **Añadir Playwright** (`@playwright/test`) con su **CLI** y configuración (`playwright.config.ts`): `webServer` que compila y sirve el build (`build` + `preview`), `baseURL`, navegador Chromium y artefactos (traza/screenshot) en fallo.
- **Suite E2E** en `e2e/` cubriendo los flujos principales:
  - Landing (carga, cambio de idioma y tema, navegación a login).
  - Autenticación (login válido/ inválido, guard de sesión, logout).
  - Dashboard, movimientos (filtros/búsqueda, editar/borrar), transacciones (alta desde "Agregar" + validación), categorías/presupuestos, análisis, deudas (registrar pago), ajustes (preferencias) y asistente IA.
- **API mockeada** en las pruebas (`page.route('**/api/v1/**')` con datos de fixture) para que sean deterministas y no dependan del backend ni de credenciales; más un **smoke opcional** contra el backend real (deployed).
- **Scripts**: `test:e2e` y `test:e2e:ui`. Integración opcional en CI.

Este change es **solo tooling/pruebas** (no cambia comportamiento de la app), por eso declara `skip_specs: true`.

## Capabilities

### New Capabilities

<!-- Ninguna: tooling de pruebas. -->

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `playwright.config.ts`, `e2e/**` (specs + fixtures/helpers).
- **Dependencias**: `@playwright/test` (dev) + navegadores (`npx playwright install`).
- **Scripts**: `test:e2e`, `test:e2e:ui`.
- **Relacionado**: se apoya en el despliegue (`vercel-deploy`) para el smoke contra producción y en `docs/api/` para los fixtures.
