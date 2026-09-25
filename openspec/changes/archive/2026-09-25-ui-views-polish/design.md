# Design

## Context

Motivación en proposal.md. Las vistas ya usan primitivas Spectrum; faltan jerarquía, distribución y detalles.

## Goals / Non-Goals

**Goals:** vistas coherentes, con jerarquía, ayuda y estados claros.

**Non-Goals:** no cambia la lógica de negocio ni los servicios.

## Decisions

### 1. Dashboard

- Saludo único: se elimina el `.hello` de `dashboard-summary` (queda el saludo del header).
- Tarjetas visibles en claro: usar superficie con borde/tintado suficiente (se coordina con `ui-foundation-polish`).
- Deudas acotadas: mostrar las 3 primeras + enlace "ver todas".
- Asistente: chat flotante (`sp-action-button` + panel `sp-dialog`/overlay) integrado, con `sp-textfield` + `sp-button` y mensajes (`sp-avatar`).
- Sugerencias: sección final con `sp-card` y carrusel CSS scroll-snap.

### 2. Análisis

- Selector de periodo con `sp-action-group` (Mes/Trimestre/Año).
- Selector de tipo de gráfica (barras/líneas/pastel) con chart.js (`sp-picker` o `sp-action-group`).
- Tarjetas con color de superficie correcto en claro/oscuro.
- Help-text por sección.

### 3. Deudas

- Tabla con bordes (estilo `sp-table` o filas con borde) y densidad controlada.
- Un `sp-action-menu` por fila (pagar/editar/eliminar) en lugar de 3 botones.
- Progreso con color por cercanía a la meta (`sp-progress-bar` + clase según %).
- Toggle lista/galería (`sp-action-group` o `sp-switch` para la vista).

### 4. Movimientos

- Filtros: chips de tipo (sp-tag) + `sp-search` + `sp-popover` (fechas/categorías con `sp-picker` y búsqueda propia).
- Filas: `sp-badge` de categoría y `sp-badge`/status ingreso/gasto; acciones diferenciadas (editar outline / eliminar negative).

### 5. Ajustes

- Secciones con `sp-field-group` y divisiones claras.
- Labels junto a inputs.
- Accesos a categorías/presupuestos como acciones (`sp-button`/`sp-link` coherentes).
- Tema como botón con icono.

## Risks / Trade-offs

- **Chart.js** ya soporta bar/line/doughnut; solo se parametriza el tipo.
- **Chat flotante** requiere un overlay/panel accesible; validar foco en E2E.
- **Popover de filtros** complejo (anidado) → validar con E2E de movimientos.
- **Vista galería de deudas** añade una variante visual → mantener el listado por defecto.

## Migration Plan

1. Tokens/contraste (base) ya en `ui-foundation-polish`.
2. Dashboard → análisis → deudas → movimientos → ajustes, cada vista con unit + E2E.
Rollback por commit.
