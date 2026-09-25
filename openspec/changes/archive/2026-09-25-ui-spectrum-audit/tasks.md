# Tasks

## 1. Slots de icono

- [x] 1.1 Poner el icono en `slot="icon"` en `sp-sidenav-item` (shell) y `sp-action-button` (ayuda, tema en Ajustes/landing), con `label` en botones de solo icono; verificar unit tests del shell y E2E de dashboard/landing
- [x] 1.2 Limpiar reglas internas de sidenav (`--spectrum-sidenav-item-gap`) y alinear el layout; verificar E2E de dashboard

## 2. Grupos de opciones con API oficial

- [x] 2.1 Filtros de tipo en Movimientos → `sp-action-group` + `sp-action-button` (`selected`); verificar `e2e/movements.spec.ts` y unit test de movements-filters
- [x] 2.2 Tipos en el formulario de transacción → `sp-action-group` + `sp-action-button`; verificar unit test de transaction-form
- [x] 2.3 Periodos en Análisis → `sp-action-group` + `sp-action-button`; verificar `e2e/analysis.spec.ts`
- [x] 2.4 Quick prompts del asistente → `sp-action-button`; verificar unit test de assistant-chat
- [x] 2.5 Eliminar los overrides `--spectrum-tag-*`; verificar búsqueda sin resultados y revisión visual

## 3. Guía y validación

- [x] 3.1 Documentar `docs/spectrum-usage.md` (slots, variantes, `--mod-*`, prohibición de variables internas)
- [x] 3.2 `npm test` en verde y `npm run build` compila
- [x] 3.3 `npm run test:e2e` completa en verde
- [x] 3.4 `openspec validate ui-spectrum-audit --strict` valida
