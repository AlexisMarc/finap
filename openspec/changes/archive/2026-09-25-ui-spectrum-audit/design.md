# Design

## Context

Motivación en proposal.md. Se detectaron usos fuera de API: icono en slot por defecto (`sp-sidenav-item`, `sp-action-button`), `sp-tag` usado como toggle (`selected`/`role="button"`), y overrides de variables internas (`--spectrum-tag-*`, `--spectrum-sidenav-item-gap`).

## Goals / Non-Goals

**Goals:** componentes sin distorsión, alineados con el Storybook; base sólida para `ui-views-polish`.

**Non-Goals:** no cambia lógica de negocio; no se rediseñan vistas (solo se corrige el uso de componentes).

## Decisions

### 1. Iconos → `slot="icon"`

`sp-sidenav-item`: `<sp-icon slot="icon">`. `sp-action-button`: icono en `slot="icon"`; en botones de solo icono, `label` para el nombre accesible.

### 2. Grupos de opciones → `sp-action-group` + `sp-action-button`

- Filtros de tipo (movimientos, formulario de transacción) y periodos (análisis): `sp-action-group` con `sp-action-button` `selected`.
- Los “quick prompts” del asistente son acciones puntuales → `sp-action-button` (sin estado).
- **Alternativa**: `sp-tabs` para periodos → rechazada (son filtros, no navegación de contenido).

### 3. Personalización solo con `--mod-*`

Eliminar overrides de `--spectrum-*` internos. Para acentos puntuales, definir `--mod-<componente>-<propiedad>` en el host, o confiar en las variantes.

### 4. Guía

`docs/spectrum-usage.md` con reglas: slots, variantes, cuándo `--mod-*`, y prohibición de redefinir variables internas.

## Risks / Trade-offs

- **Cambios de API** (tag→action-button) afectan tests/E2E → se actualizan selectores por rol.
- **`sp-action-group`** maneja la selección de forma propia → usar `selected` en los botones y `@change` para el filtro.

## Migration Plan

1. Iconos a su slot (shell, settings, landing).
2. tags→action-group (movimientos, transacción, análisis, asistente).
3. Limpieza de overrides.
4. Guía + verificación.
