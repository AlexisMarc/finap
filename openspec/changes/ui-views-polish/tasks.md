# Tasks

## 1. Dashboard

- [ ] 1.1 Quitar el saludo duplicado de `dashboard-summary` y asegurar tarjetas visibles en modo claro; verificar `e2e/dashboard.spec.ts`
- [ ] 1.2 Acotar el resumen de deudas (3 + "ver todas"); verificar unit test de dashboard-debts
- [ ] 1.3 Convertir el asistente en chat flotante accesible; verificar `e2e/assistant.spec.ts`
- [ ] 1.4 Añadir sección de sugerencias con tarjetas y carrusel; verificar unit test del dashboard

## 2. Análisis

- [ ] 2.1 Agrupar el selector de periodo con `sp-action-group`; verificar `e2e/analysis.spec.ts`
- [ ] 2.2 Añadir selector de tipo de gráfica (barras/líneas/pastel) con chart.js; verificar unit test
- [ ] 2.3 Corregir colores de tarjetas en claro/oscuro y añadir help-text por sección; verificar revisión visual

## 3. Deudas

- [ ] 3.1 Rehacer el listado con bordes y densidad controlada y un `sp-action-menu` por fila; verificar `e2e/debts.spec.ts`
- [ ] 3.2 Añadir color al progreso según cercanía a la meta; verificar unit test de debt-item
- [ ] 3.3 Añadir vista lista/galería; verificar `e2e/debts.spec.ts`

## 4. Movimientos

- [ ] 4.1 Simplificar filtros (chips de tipo + `sp-search` + `sp-popover` de fechas/categorías); verificar `e2e/movements.spec.ts`
- [ ] 4.2 Añadir `sp-badge` de categoría/status y diferenciar acciones en las filas; verificar unit test de movements-list

## 5. Ajustes

- [ ] 5.1 Agrupar secciones con `sp-field-group` y divisiones claras, con labels junto a inputs; verificar `e2e/settings.spec.ts`
- [ ] 5.2 Convertir los accesos a categorías/presupuestos en acciones y el tema en botón con icono; verificar unit test de settings-preferences

## 6. Validación

- [ ] 6.1 `npm test` en verde y `npm run build` compila
- [ ] 6.2 `npm run test:e2e` completa en verde
- [ ] 6.3 `openspec validate ui-views-polish --strict` valida
