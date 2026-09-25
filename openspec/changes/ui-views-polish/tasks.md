# Tasks

## 1. Dashboard

- [x] 1.1 Quitar el saludo duplicado de `dashboard-summary` y asegurar tarjetas visibles en modo claro; verificar `e2e/dashboard.spec.ts`
- [x] 1.2 Acotar el resumen de deudas (3 + "ver todas"); verificar unit test de dashboard-debts
- [x] 1.3 Convertir el asistente en chat flotante accesible; verificar `e2e/assistant.spec.ts`
- [x] 1.4 Añadir sección de sugerencias con tarjetas y carrusel; verificar unit test del dashboard

## 2. Análisis

- [x] 2.1 Agrupar el selector de periodo con `sp-action-group`; verificar `e2e/analysis.spec.ts`
- [x] 2.2 Añadir selector de tipo de gráfica (barras/líneas/pastel) con chart.js; verificar unit test
- [x] 2.3 Corregir colores de tarjetas en claro/oscuro y añadir help-text por sección; verificar revisión visual

## 3. Deudas

- [x] 3.1 Rehacer el listado con bordes y densidad controlada y un `sp-action-menu` por fila; verificar `e2e/debts.spec.ts`
- [x] 3.2 Añadir color al progreso según cercanía a la meta; verificar unit test de debt-item
- [x] 3.3 Añadir vista lista/galería; verificar `e2e/debts.spec.ts`

## 4. Movimientos

- [x] 4.1 Simplificar filtros (chips de tipo + `sp-search` + `sp-popover` de fechas/categorías); verificar `e2e/movements.spec.ts`
- [x] 4.2 Añadir `sp-badge` de categoría/status y diferenciar acciones en las filas; verificar unit test de movements-list

## 5. Ajustes

- [x] 5.1 Agrupar secciones con `sp-field-group` y divisiones claras, con labels junto a inputs; verificar `e2e/settings.spec.ts`
- [x] 5.2 Convertir los accesos a categorías/presupuestos en acciones y el tema en botón con icono; verificar unit test de settings-preferences

## 6. Validación

- [x] 6.1 `npm test` en verde y `npm run build` compila
- [x] 6.2 `npm run test:e2e` completa en verde
- [x] 6.3 `openspec validate ui-views-polish --strict` valida
