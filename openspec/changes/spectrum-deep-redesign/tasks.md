# Tasks

## 1. Tokens: color y radios

- [ ] 1.1 Afinar los neutros de `src/tokens/tokens.css` a los tokens semánticos de Spectrum (fondo, superficie, borde, texto) y usar el acento de Spectrum como acento interactivo; verificar con `npx vitest run src/tokens src/theme`
- [ ] 1.2 Reducir la escala de radios (`--finap-radius-{sm,md,lg,xl}` a valores de Spectrum; `full` solo para píldoras/avatares) y ajustar elevaciones; verificar tokens/contraste (WCAG AA) y revisión visual
- [ ] 1.3 Retirar el uso dominante de colores de marca en superficies/estados (dejar marca para brand-mark, hero y gradiente); verificar con búsqueda de `--finap-color-primary/secondary/accent` y revisión visual

## 2. Fundación (superficies y tipografía)

- [ ] 2.1 Rehacer `finap-card` como superficie plana (borde sutil, radio pequeño, sin sombra prominente); verificar unit test de card
- [ ] 2.2 Ajustar `finap-heading` y `finap-text` a los pesos/tamaños de Spectrum; verificar unit tests existentes
- [ ] 2.3 Ajustar `finap-container` y espaciados al layout de Spectrum; verificar unit test

## 3. Componentes de datos (Spectrum)

- [ ] 3.1 Añadir `@spectrum-web-components/{badge,meter,tooltip,status-light,illustrated-message,divider,table,switch,link}` y verificar `npm install`
- [ ] 3.2 `finap-stat-card`: variación con `sp-badge`; verificar unit test de dashboard-summary
- [ ] 3.3 `finap-progress`: migrar a `sp-meter`/`sp-progress-bar` con estado de exceso; verificar unit test de debt-item/budget-item
- [ ] 3.4 `finap-list-item` y un nuevo componente de tabla (`sp-table`) para listados; verificar unit tests
- [ ] 3.5 Estados vacíos con `sp-illustrated-message` y separadores con `sp-divider` donde aplique; verificar en movimientos/categorías
- [ ] 3.6 Tooltips (`sp-tooltip`) en controles de solo icono (tema, idioma, acciones) y `sp-status-light` en el indicador de conexión; verificar unit tests de theme-toggle/offline-banner

## 4. Shell (navegación y búsqueda)

- [ ] 4.1 Sustituir el sidebar por `sp-sidenav`/`sp-sidenav-item` manteniendo navegación y estado activo; verificar unit tests del shell y `e2e/dashboard.spec.ts`
- [ ] 4.2 Sustituir la búsqueda del header por `sp-search` manteniendo el "pending search" y la navegación a Movimientos; verificar unit test del shell y spec E2E de búsqueda
- [ ] 4.3 Restilizar el bottom nav móvil y el menú de usuario con primitivas/tokens de Spectrum; verificar `e2e/auth.spec.ts`

## 5. Landing

- [ ] 5.1 Recomponer header/footer con `sp-link` y secciones con superficies planas y `sp-badge`; verificar `e2e/landing.spec.ts`
- [ ] 5.2 Ajustar hero y paleta: base neutral + acento de marca; verificar `e2e/landing.spec.ts` (idioma/tema)

## 6. Vistas

- [ ] 6.1 Dashboard (resumen, categorías, deudas, recientes, asistente) con las nuevas superficies/badges; verificar `e2e/dashboard.spec.ts` y `e2e/assistant.spec.ts`
- [ ] 6.2 Movimientos y Categorías con `sp-table` y estados de Spectrum; verificar `e2e/movements.spec.ts` y `e2e/categories.spec.ts`
- [ ] 6.3 Deudas y Presupuestos con `sp-badge`/medidores; verificar `e2e/debts.spec.ts` y `e2e/budgets.spec.ts`
- [ ] 6.4 Análisis con selector de periodo y métricas alineados a Spectrum; verificar `e2e/analysis.spec.ts`
- [ ] 6.5 Ajustes con `sp-switch`/`sp-picker`/tooltips; verificar `e2e/settings.spec.ts`
- [ ] 6.6 Login y flujos de autenticación con el nuevo lenguaje visual; verificar `e2e/auth.spec.ts`

## 7. PWA y bundle

- [ ] 7.1 Revisar precache de workbox con los nuevos paquetes y verificar `npm run build`
- [ ] 7.2 Medir el bundle; optimizar imports (individuales/bajo demanda) si supera el umbral y repetir la medición

## 8. Validación

- [ ] 8.1 `npm test` en verde y `npm run build` compila
- [ ] 8.2 `npm run test:e2e` completa en verde
- [ ] 8.3 `openspec validate spectrum-deep-redesign --strict` valida
