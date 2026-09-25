# Tasks

## 1. Setup de Playwright

- [ ] 1.1 Añadir `@playwright/test` (dev) e instalar navegadores (`npx playwright install chromium`); verificar que `npx playwright --version` funciona
- [ ] 1.2 Crear `playwright.config.ts` (`testDir: './e2e'`, `baseURL: http://localhost:4173`, `webServer` con `build`+`preview`, `trace: 'on-first-retry'`, `retries: 1` en CI, Chromium); verificar que arranca el `webServer`
- [ ] 1.3 Añadir scripts `test:e2e` y `test:e2e:ui` en `package.json` y `e2e`/`playwright-report`/`test-results` al `.gitignore`; verificar `npm run test:e2e` ejecuta (aunque no haya specs aún)

## 2. Helpers y fixtures

- [ ] 2.1 Crear `e2e/helpers/api.ts` con el mock de `/api/v1` (`page.route`) y datos de fixture coherentes con `docs/api/examples.md`; verificar con una spec que el mock responde
- [ ] 2.2 Crear `e2e/helpers/auth.ts` (`loginViaUI` y `seedSession`); verificar que tras el login se accede al dashboard

## 3. Specs por flujo

- [ ] 3.1 `e2e/landing.spec.ts`: carga, cambio de idioma (ES↔EN), tema y navegación a login
- [ ] 3.2 `e2e/auth.spec.ts`: login válido, credenciales inválidas, guard (sin sesión → login) y logout
- [ ] 3.3 `e2e/dashboard.spec.ts`: saludo, balance, secciones (categorías/deudas/movimientos) y asistente visible
- [ ] 3.4 `e2e/movements.spec.ts`: listado, filtro por tipo, búsqueda, paginación, editar y eliminar
- [ ] 3.5 `e2e/transactions.spec.ts`: alta desde "Agregar" con validación y guardado (refresco de la lista)
- [ ] 3.6 `e2e/categories-budgets.spec.ts`: CRUD de categoría y definir presupuesto con progreso
- [ ] 3.7 `e2e/analysis.spec.ts`: métricas y gráficas (canvas presentes) y cambio de periodo
- [ ] 3.8 `e2e/debts.spec.ts`: listado, alta y registrar pago (progreso)
- [ ] 3.9 `e2e/settings.spec.ts`: perfil, cambio de idioma/tema/moneda y logout
- [ ] 3.10 `e2e/assistant.spec.ts`: enviar pregunta y ver respuesta

## 4. Smoke e integración continua (opcional)

- [ ] 4.1 Añadir un proyecto/tag `@smoke` que apunte al despliegue real (`E2E_BASE_URL`, credenciales por env), sin mock; verificar con `E2E_BASE_URL=https://finap-lake.vercel.app npx playwright test --grep @smoke`
- [ ] 4.2 (Opcional) Workflow de CI que instale navegadores y ejecute `npm run test:e2e`; verificar que el workflow pasa en un PR

## 5. Validación

- [ ] 5.1 Ejecutar `npm run test:e2e` y confirmar que toda la suite pasa
- [ ] 5.2 Confirmar que `npm run test` (unitarios) sigue pasando y `npm run build` compila
- [ ] 5.3 Ejecutar `openspec validate e2e-playwright --strict` y confirmar que valida
