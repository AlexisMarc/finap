# Proposal

## Why

Las vistas tienen problemas de jerarquía, distribución y coherencia: saludo duplicado, tarjetas que no se ven en modo claro, deudas como lista infinita, asistente que parece un formulario suelto, análisis con gráficas a la deriva y periodos desagrupados, deudas con una tabla sin bordes y tres botones idénticos, movimientos con filtros desacoplados y filas sin status, y Ajustes con información dispersa y sin divisiones claras.

## What Changes

- **Dashboard**: un único saludo; tarjetas visibles en modo claro; resumen de deudas acotado (p. ej. las 3 primeras + "ver todas"); **asistente IA como chat flotante** accesible; sección final de **sugerencias con tarjetas y carrusel**; skeleton en carga.
- **Análisis**: distribución ordenada; selector de periodo agrupado (`sp-action-group`); **selector de tipo de gráfica** (barras/líneas/pastel con chart.js); ayuda/explicaciones por sección; tarjetas con color correcto en claro y oscuro.
- **Deudas**: tabla con bordes y densidad controlada; un solo botón de acción con `sp-action-menu` (pagar/editar/eliminar); jerarquía clara; **vista lista o galería**; barras de progreso con color según cercanía a la meta.
- **Movimientos**: filtros simplificados (chips de tipo + búsqueda con icono `sp-search` + `sp-popover` para fechas/categorías con su propio filtro); `sp-badge` de categoría y status ingreso/gasto en cada fila; botones de acción diferenciados.
- **Ajustes**: secciones agrupadas con `sp-field-group` y divisiones claras; labels junto a sus inputs; accesos como acciones (no links sueltos); tema como botón con icono.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `dashboard`: saludo único, deudas acotadas, sugerencias con carrusel y asistente flotante.
- `analysis`: selector de periodo agrupado y selector de tipo de gráfica.
- `debts`: listado con jerarquía, acción única, vista lista/galería y progreso con color.
- `movements`: filtros simplificados y filas con badges/status.
- `settings`: secciones agrupadas y tema como botón.

## Impact

- **Código**: `src/pages/{dashboard,analysis,debts,movements,settings}-page.ts` y componentes asociados (dashboard-summary/debts, analysis-metrics, movements-filters/list, settings-*), `src/components/assistant-chat/*`.
- **Dependencias**: primitivas ya instaladas (`sp-table`, `sp-badge`, `sp-meter`, `sp-action-menu`, `sp-popover`, `sp-action-group`, `sp-field-group`, chart.js).
- **Tests**: unitarios y E2E de las vistas afectadas.
- **Relacionado**: depende de `ui-foundation-polish` (skeleton, badges, grupos) y `ui-shell-polish` (breadcrumbs, ayuda).
