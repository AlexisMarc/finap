# Tasks

## 1. Colores

- [x] 1.1 Revisar el mapeo de neutros en `src/tokens/tokens.css` al tono cálido de Spectrum y asegurar contraste fondo/superficie en modo claro; verificar `npx vitest run src/tokens` y revisión visual

## 2. Skeleton

- [x] 2.1 Crear `finap-skeleton` (texto/rect/círculo con shimmer); verificar unit test
- [x] 2.2 Reemplazar los estados "Cargando…" por skeletons en las vistas; verificar `e2e/dashboard.spec.ts` y `e2e/movements.spec.ts`

## 3. Fecha y textarea

- [x] 3.1 Estilizar `finap-input type="date"` y `type="textarea"` como `sp-textfield` (borde/foco/help-text); verificar unit test de input

## 4. Ayuda contextual

- [x] 4.1 Añadir `@spectrum-web-components/{coachmark,action-group,field-group,breadcrumbs,popover}` y verificar `npm install`
- [x] 4.2 Integrar `sp-coachmark`/`sp-tooltip`/`sp-help-text` como ayuda contextual; verificar con E2E puntual

## 5. Badges y grupos

- [x] 5.1 Usar `sp-badge`/`sp-status-light` para estados y `sp-action-group`/`sp-field-group` donde aplique; verificar unit tests

## 6. Validación

- [x] 6.1 `npm test` en verde y `npm run build` compila
- [x] 6.2 `npm run test:e2e` completa en verde
- [x] 6.3 `openspec validate ui-foundation-polish --strict` valida
