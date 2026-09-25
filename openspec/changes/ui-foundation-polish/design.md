# Design

## Context

Motivación en proposal.md. La base Spectrum ya está (theme/tokens/components). Quedan detalles de acabado.

## Goals / Non-Goals

**Goals:** base visual coherente y pulida (colores cálidos, carga con skeleton, ayuda contextual, campos de fecha/textarea alineados, badges/estados, grupos).

**Non-Goals:** no se reestructuran vistas (eso va en `ui-shell-polish`/`ui-views-polish`); no se añaden librerías externas.

## Decisions

### 1. Colores cálidos y contraste

- Los neutros se mantienen como alias de los tokens semánticos de Spectrum (que ya tienen el tono de la librería); se revisa el mapeo de superficie/borde para que en modo claro la tarjeta se distinga del fondo (usar borde visible y/o tono de `layer-1`/`layer-2`).
- **Alternativa**: valores propios cálidos → rechazada, se quiere el tono real de Spectrum.

### 2. Skeleton sin librería

Skeleton propio con CSS (`@keyframes` de shimmer + tokens `--spectrum-*`). Componente `finap-skeleton` (variantes: texto, rect, circulo) para componer placeholders de cada vista.

### 3. Fecha y textarea

`finap-input` ya usa `sp-textfield`/`sp-number-field`; `type="date"` y `type="textarea"` se estilizan con una clase compartida (`.native-input`) que replica borde/foco/help-text de Spectrum. No hay date-picker en SWC.

### 4. Ayuda contextual

- Tours de pasos con `sp-coachmark` (disparados por un botón de ayuda).
- Help en campos con `sp-help-text` (y `sp-tooltip` para iconos).

### 5. Badges/grupos

- `sp-badge` (variantes positive/negative/neutral) y `sp-status-light` para estados.
- `sp-action-group` para periodos/filtros y `sp-field-group` para agrupar campos en Ajustes.

## Risks / Trade-offs

- **`sp-coachmark`** depende del posicionamiento sobre el target → validar en E2E; si es inestable, usar `sp-dialog`/`sp-overlay` propio.
- **Fecha nativa** varía por navegador → se estiliza con tokens; aceptado (SWC no tiene date).
- **Skeleton** reemplaza "Cargando…" → tocar todas las vistas que lo usan (se coordina con `ui-views-polish`).

## Migration Plan

1. Tokens (tono/contraste).
2. `finap-skeleton` + reemplazo de "Cargando…".
3. `finap-input` fecha/textarea.
4. Coachmark/tooltip/help y badges/grupos.
Rollback por commit.
