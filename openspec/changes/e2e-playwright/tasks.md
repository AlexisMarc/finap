# Tasks

## 1. Setup de Playwright

- [x] 1.1 Añadir `@playwright/test` (dev) e instalar navegadores (`npx playwright install chromium`); verificar que `npx playwright --version` funciona
- [x] 1.2 Crear `playwright.config.ts` (`testDir: './e2e'`, `baseURL: http://localhost:4173`, `webServer` que compila y sirve el front con `VITE_API_BASE_URL=${E2E_API_BASE_URL:-http://localhost:3000/api/v1}`, `trace: 'on-first-retry'`, `retries: 1` en CI, Chromium); verificar que arranca el `webServer`
- [x] 1.3 Añadir scripts `test:e2e` y `test:e2e:ui` en `package.json` y `e2e`/`playwright-report`/`test-results` al `.gitignore`; verificar `npm run test:e2e --list` lista las specs

## 2. Helpers (backend real)

- [x] 2.1 `e2e/helpers/auth.ts`: `loginViaUI` con `E2E_EMAIL`/`E2E_PASSWORD` (y `test.skip` si faltan) y `seedSession`; verificar que tras el login se accede al dashboard
- [x] 2.2 `e2e/helpers/mock.ts`: mock puntual de `/api/v1` (`page.route`) **solo** para estados difíciles de provocar (error `5xx`, fallo de red/offline); verificar con una spec que el error se muestra
- [x] 2.3 `e2e/helpers/data.ts`: marcador único para datos de prueba (p. ej. `E2E-<timestamp>`) y **limpieza**; verificar que un recurso creado por una spec se elimina al final

## 3. Specs por flujo (contra el backend real)

- [x] 3.1 `e2e/landing.spec.ts`: carga, cambio de idioma (ES↔EN), tema y navegación a login
- [x] 3.2 `e2e/auth.spec.ts`: login válido, credenciales inválidas, guard (sin sesión → login) y logout
- [x] 3.3 `e2e/dashboard.spec.ts`: saludo, balance y secciones (categorías/deudas/movimientos) y asistente visible (aserciones por **estructura**)
- [x] 3.4 `e2e/movements.spec.ts`: listado, filtro por tipo, búsqueda, paginación, editar y eliminar (con dato propio + limpieza)
- [x] 3.5 `e2e/transactions.spec.ts`: alta desde "Agregar" con validación y guardado (refresco de la lista; limpieza del dato creado)
- [x] 3.6 `e2e/categories-budgets.spec.ts`: CRUD de categoría y definir presupuesto con progreso
- [x] 3.7 `e2e/analysis.spec.ts`: métricas y gráficas (canvas) y cambio de periodo
- [x] 3.8 `e2e/debts.spec.ts`: listado, alta y registrar pago (progreso)
- [x] 3.9 `e2e/settings.spec.ts`: perfil, cambio de idioma/tema/moneda y logout
- [x] 3.10 `e2e/assistant.spec.ts`: enviar pregunta y ver respuesta

## 4. Integración continua (opcional)

- [ ] 4.1 Workflow de CI que instale navegadores y ejecute `npm run test:e2e` contra un backend accesible (`E2E_API_BASE_URL` + secretos `E2E_EMAIL`/`E2E_PASSWORD`); verificar que pasa en un PR

## 5. Validación

- [x] 5.1 Con un backend accesible, ejecutar `npm run test:e2e` y confirmar que toda la suite pasa
- [x] 5.2 Confirmar que `npm run test` (unitarios) sigue pasando y `npm run build` compila
- [x] 5.3 Ejecutar `openspec validate e2e-playwright --strict` y confirmar que valida
