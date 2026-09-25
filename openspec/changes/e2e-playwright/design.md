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

### 3. Backend real (enfoque principal) + mock solo para casos límite

- **Decisión**: las pruebas E2E se ejecutan **contra el backend real** (el desplegado `https://finap-service.vercel.app` o uno local vía `E2E_API_BASE_URL`), usando credenciales por entorno (`E2E_EMAIL`/`E2E_PASSWORD`). Se mockea (`page.route`) **solo** para estados difíciles de provocar de forma controlada: errores `5xx`, `offline`/fallo de red y estados vacíos concretos.
- **Mitigaciones al backend real**:
  - **Datos mutables**: los movimientos de prueba llevan un marcador único (p. ej. nota `E2E-<timestamp>`) y se **limpian** al final (borrado por UI/API); los tests no dependen de datos preexistentes.
  - **Fechas**: el backend tiene datos de 2025-05 y el dashboard usa el mes actual → se **assertan por estructura** (secciones, gráficas, estados) en vez de valores exactos, o se usa un "mes de demo" configurable.
  - **Credenciales/secretos**: nunca en el repo; por variables de entorno (y `skip` si faltan).
  - **Red**: `retries` en CI y esperas con auto-wait.
- **Alternativas**: mock total de la API (más determinista pero **no valida la integración** y oculta bugs de contrato como el `422` de `/dashboard`); se descarta como enfoque principal.
- **Racional**: en E2E el valor está en probar el sistema completo; el mock se limita a casos donde el backend real no puede provocar el estado de forma fiable.

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
- **[Riesgo] Service worker cacheando entre runs** → contextos aislados por test y `baseURL` con puerto dedicado.
- **[Riesgo] CORS al probar local contra el backend desplegado** (el backend solo permite el origen del front desplegado) → por defecto usar el **backend local** (`http://localhost:3000`, CORS `*`) o proxear; si se apunta al desplegado, añadir su origen.
- **[Trade-off] Backend real vs mock** → se prioriza el backend real (prueba la integración); el mock queda acotado a estados límite (5xx/offline). Los datos mutables se aíslan con marcador + limpieza.
