# Proposal

## Why

Hoy solo hay **tests unitarios** (Vitest + happy-dom, sin navegador real). No se validan los flujos completos en un navegador: navegación entre páginas, formularios, cambio de idioma/tema, i18n, PWA y la integración con la API. Necesitamos pruebas **end-to-end** para detectar regresiones en la app real.

## What Changes

- **Añadir Playwright** (`@playwright/test`) con su **CLI** y configuración (`playwright.config.ts`): `webServer` que compila y sirve el build (`build` + `preview`), `baseURL`, navegador Chromium y artefactos (traza/screenshot) en fallo.
- **Suite E2E contra el backend real** en `e2e/` cubriendo los flujos principales:
  - Landing (carga, cambio de idioma y tema, navegación a login).
  - Autenticación (login válido/ inválido, guard de sesión, logout).
  - Dashboard, movimientos (filtros/búsqueda, editar/borrar), transacciones (alta desde "Agregar" + validación), categorías/presupuestos, análisis, deudas (registrar pago), ajustes (preferencias) y asistente IA.
- **Backend real** (desplegado o local) como entorno de las pruebas, con credenciales por variable de entorno (`E2E_EMAIL`/`E2E_PASSWORD`) y **mitigaciones**: datos de prueba con marcador único + limpieza, y aserciones por estructura para las vistas dependientes de fecha. El **mock** se reserva solo para estados difíciles de provocar (errores 5xx, offline).
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
