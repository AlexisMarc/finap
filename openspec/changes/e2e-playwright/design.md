# Design

## Context

La app es una SPA (Lit + Open Cells) con routing por **history**, i18n (es/en), tema claro/oscuro, PWA (vite-plugin-pwa) y una capa de datos en `src/services/` que consume `/api/v1` (local o desplegada). Los tests actuales son unitarios (Vitest + happy-dom). Ver `proposal.md`.

## Decisions

### 1. Runner: `@playwright/test` por CLI

- **Decisión**: usar el **CLI de Playwright** (`@playwright/test`, `npx playwright test`). La suite es reproducible y ejecutable en CI/local. El **MCP de Playwright** se puede usar de forma interactiva para autorar/depurar pasos, pero no es requisito para ejecutar la suite.
- **Alternativas**: Cypress (otro runner), solo MCP (no apto para CI determinista).
- **Racional**: es el estándar, con `webServer`, tracing y múltiples navegadores; el MCP complementa la autoría.

### 2. Servidor de pruebas: build + preview

- **Decisión**: `webServer` que ejecuta `npm run build && npm run preview -- --port 4173 --strictPort`, con `baseURL: http://localhost:4173` y `reuseExistingServer` fuera de CI. Se prueba **el build de producción** (incluye la PWA/service worker; el dev server no lo activa).
- **Alternativas**: `vite dev` (más rápido pero sin PWA y con HMR).
- **Racional**: valida el artefacto real que se despliega.

### 3. API mockeada (determinismo) + smoke real opcional

- **Decisión**: interceptar la API con `page.route('**/api/v1/**')` y responder desde **fixtures** (coherentes con `docs/api/examples.md`) para login, categorías, transacciones, dashboard, deudas, presupuestos, análisis y asistente. Así las pruebas no dependen del backend ni de credenciales ni de fechas. Un proyecto/tag **`@smoke`** (opcional, `E2E_BASE_URL`) apunta al despliegue real con credenciales por variable de entorno.
- **Alternativas**: E2E contra el backend real en todas las pruebas (frágil: red, datos por mes, credenciales).
- **Racional**: determinismo y velocidad; el smoke cubre la integración real.

### 4. Autenticación: por UI con API mockeada

- **Decisión**: hacer login por la UI (cubre el flujo y el guard). La sesión se guarda en `localStorage` (`finap-session`); un helper puede sembrarla para pruebas que no validan el login (atajo, saltando el formulario).
- **Racional**: balance entre cobertura del flujo y velocidad.

### 5. Estructura y convenciones

- **Decisión**: `e2e/` con `*.spec.ts` por flujo, `e2e/fixtures/` (datos) y `e2e/helpers/` (mock de API, login). `playwright.config.ts` en la raíz, `testDir: './e2e'`, `use.trace = 'on-first-retry'`, `retries: 1` en CI. Navegador principal **Chromium** (posible `firefox/webkit` después).
- **Racional**: organización por feature y configuración mínima.

### 6. Cobertura por flujo

- Landing, auth + guard, dashboard, movimientos (filtros/búsqueda/edición/borrado), transacciones (alta + validación), categorías/presupuestos, análisis, deudas (pago), ajustes (idioma/tema/moneda), asistente.

## Goals / Non-Goals

**Goals**: suite E2E determinista de los flujos principales, ejecutable con un comando.
**Non-Goals**: no se testean visualmente (screenshots de regresión) ni la accesibilidad de forma exhaustiva; no se sustituyen los tests unitarios.

## Risks / Trade-offs

- **[Riesgo] Flakiness** (esperas, animaciones reveal, SW) → usar locators por rol/texto, `expect` con auto-wait, y desactivar animaciones (`prefers-reduced-motion`) o esperar estados estables.
- **[Riesgo] Service worker cacheando entre runs** → en `preview` usar contexto limpio por test (Playwright aísla contextos) y/o `baseURL` con puerto dedicado.
- **[Trade-off] Mock vs real** → se prioriza determinismo; el smoke `@smoke` cubre el backend real.
