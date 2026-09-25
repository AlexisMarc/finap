# Tasks

## 1. Campos y selectores

- [x] 1.1 Migrar `finap-input` a `sp-textfield`/`sp-number-field` (textarea y fecha nativos) preservando atributos y el evento `finap-input`; verificar con su unit test (tipos y estado de error)
- [x] 1.2 Migrar `finap-select` a `sp-picker` con `sp-menu-item` preservando el evento `finap-change`; verificar con su unit test
- [x] 1.3 Verificar formularios existentes (transaction/category/debt/login-form, settings-preferences) con `npm test` y ajustar solo wrappers; los flujos E2E de auth y transactions deben pasar

## 2. Chips, avatar y progreso

- [x] 2.1 Migrar `finap-chip` a `sp-tag` (clickable/selected) y verificar con su unit test y el filtro de movimientos (E2E)
- [x] 2.2 Migrar `finap-avatar` a `sp-avatar` y verificar con unit test del user-menu
- [x] 2.3 Migrar `finap-progress` a `sp-progress-bar` y verificar con unit test de debt-item

## 3. Modales y diálogos

- [x] 3.1 Migrar `finap-modal` a `sp-dialog` (título, contenido, slot de acciones, cierre por Escape y `finap-close`) y verificar con su unit test
- [x] 3.2 Migrar `finap-confirm-dialog` sobre `sp-dialog` preservando `finap-confirm`/`finap-cancel`; verificar con E2E de eliminar movimiento/categoría/deuda

## 4. Superficies de datos

- [x] 4.1 Recomponer `finap-stat-card` y `finap-list-item` con tokens/tipografía Spectrum manteniendo su API; verificar unit tests de dashboard-summary y movements-list

## 5. Landing y chrome

- [x] 5.1 Rediseñar `landing-page.ts` con patrones Spectrum (header, hero con CTA, secciones de cards, footer) manteniendo i18n, tema y motion; verificar con `e2e/landing.spec.ts`
- [x] 5.2 Aplicar estilos Spectrum al chrome de `app-shell` (sidebar, topbar, bottom nav) sin cambiar lógica; verificar con unit tests del shell y `e2e/dashboard.spec.ts`

## 6. Validación de fase

- [x] 6.1 `npm test` en verde y `npm run build` compila
- [x] 6.2 Smoke E2E de flujos principales (`e2e/auth.spec.ts e2e/dashboard.spec.ts e2e/movements.spec.ts e2e/settings.spec.ts e2e/transactions.spec.ts`) en verde
- [x] 6.3 `openspec validate ui-spectrum-app --strict` valida
