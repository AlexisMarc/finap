# Tasks

## 1. Tokens: color y radios

- [x] 1.1 Afinar los neutros de `src/tokens/tokens.css` a los tokens semánticos de Spectrum (fondo, superficie, borde, texto) y usar el acento de Spectrum como acento interactivo; verificar con `npx vitest run src/tokens src/theme`
- [x] 1.2 Reducir la escala de radios (`--finap-radius-{sm,md,lg,xl}` a valores de Spectrum; `full` solo para píldoras/avatares) y ajustar elevaciones; verificar tokens/contraste (WCAG AA)
- [x] 1.3 Retirar el uso dominante de colores de marca en superficies/estados (marca solo en brand-mark, hero y gradiente); verificar con búsqueda de `--finap-color-primary/secondary/accent`
- [x] 1.4 Reestructurar el layout de las vistas con CSS Grid y tokens de espaciado de Spectrum (columnas/gaps responsivos) en chrome, dashboard y páginas; verificar `e2e/dashboard.spec.ts` y `e2e/landing.spec.ts`

## 2. Retirar wrappers y adoptar SWC directo

- [x] 2.1 Añadir `@spectrum-web-components/{card,badge,sidenav,search,table,meter,status-light,illustrated-message,tooltip,divider,link,switch,action-menu,action-button,alert-banner,toast,close-button}` y verificar `npm install`
- [x] 2.2 Retirar `finap-button` → `sp-button` en todas las vistas; eliminar componente y su test; verificar unit tests de las vistas y `e2e/auth.spec.ts`
- [x] 2.3 Retirar `finap-icon` → `sp-icon` + `icons-workflow`; eliminar componente y su test; verificar `e2e/dashboard.spec.ts`
- [x] 2.4 Retirar `finap-card` → `sp-card`/superficie Spectrum; eliminar componente y su test; verificar `e2e/dashboard.spec.ts`
- [x] 2.5 Retirar `finap-chip` → `sp-tag`; eliminar componente y su test; verificar `e2e/movements.spec.ts` (filtros)
- [x] 2.6 Retirar `finap-avatar` → `sp-avatar`; eliminar componente y su test; verificar `e2e/auth.spec.ts`
- [x] 2.7 Retirar `finap-progress` → `sp-meter`/`sp-progress-bar`; eliminar componente y su test; verificar `e2e/debts.spec.ts`
- [x] 2.8 Retirar `finap-stat-card` → `sp-card` + `sp-badge` en las vistas; eliminar componente y su test
- [x] 2.9 Retirar `finap-list-item` → `sp-table` (listados) / fila Spectrum; eliminar componente y su test
- [x] 2.10 Retirar `finap-theme-toggle` y `finap-language-toggle` → `sp-switch`/`sp-picker`/`sp-action-button`; eliminar componentes y sus tests; verificar `e2e/landing.spec.ts` y `e2e/settings.spec.ts`
- [x] 2.11 Retirar `finap-user-menu` → `sp-action-menu` conservando logout y nombre accesible; eliminar componente y su test; verificar `e2e/auth.spec.ts`
- [x] 2.12 Retirar `finap-modal`/`finap-confirm-dialog` → `sp-dialog-wrapper` (título/contenido/acciones por slots, confirmar/cancelar en la vista); eliminar componentes y sus tests; verificar `e2e/transactions.spec.ts`, `e2e/categories.spec.ts`, `e2e/debts.spec.ts` y `e2e/budgets.spec.ts`

## 3. Shell (navegación y búsqueda)

- [x] 3.1 Sustituir el sidebar por `sp-sidenav`/`sp-sidenav-item` manteniendo navegación y estado activo; verificar unit tests del shell y `e2e/dashboard.spec.ts`
- [x] 3.2 Sustituir la búsqueda del header por `sp-search` manteniendo el "pending search" y la navegación a Movimientos; verificar unit test del shell y spec E2E de búsqueda
- [x] 3.3 Restilizar el bottom nav móvil y el header con tokens de Spectrum; verificar `e2e/dashboard.spec.ts`

## 4. Landing

- [x] 4.1 Recomponer header/footer con `sp-link` y secciones con `sp-card` + `sp-badge`; verificar `e2e/landing.spec.ts`
- [x] 4.2 Ajustar hero y paleta: base neutral + acento de marca; verificar `e2e/landing.spec.ts` (idioma/tema)

## 5. Vistas

- [x] 5.1 Dashboard (resumen con `sp-card`+`sp-badge`, categorías, deudas, recientes con `sp-table`) y asistente; verificar `e2e/dashboard.spec.ts` y `e2e/assistant.spec.ts`
- [x] 5.2 Movimientos (filtros con `sp-tag`/`sp-picker`/`sp-search`, listado con `sp-table`, estado vacío con `sp-illustrated-message`); verificar `e2e/movements.spec.ts`
- [x] 5.3 Categorías y Presupuestos (`sp-table`, `sp-badge`, `sp-meter`); verificar `e2e/categories.spec.ts` y `e2e/budgets.spec.ts`
- [x] 5.4 Deudas (`sp-badge`, `sp-meter`, `sp-table`); verificar `e2e/debts.spec.ts`
- [x] 5.5 Análisis (métricas con `sp-card`+`sp-badge`, selector de periodo con primitivas Spectrum); verificar `e2e/analysis.spec.ts`
- [x] 5.6 Ajustes (`sp-switch`, `sp-picker`, `sp-link`, `sp-button`); verificar `e2e/settings.spec.ts`
- [x] 5.7 Login y guard con las primitivas Spectrum; verificar `e2e/auth.spec.ts`

## 6. PWA y bundle

- [x] 6.1 Revisar precache de workbox con los nuevos paquetes y verificar `npm run build`
- [x] 6.2 Medir el bundle; optimizar imports (individuales/bajo demanda) si supera el umbral y repetir la medición

## 7. Validación

- [x] 7.1 `npm test` en verde y `npm run build` compila
- [x] 7.2 `npm run test:e2e` completa en verde
- [x] 7.3 `openspec validate spectrum-deep-redesign --strict` valida
