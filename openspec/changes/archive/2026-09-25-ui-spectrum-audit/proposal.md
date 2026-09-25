# Proposal

## Why

Varios componentes de Spectrum se están usando fuera de su API documentada y con sobrescrituras de estilos internos, lo que los **distorsiona** (sidebar desalineado, tags-como-toggle, botones con icono en el slot equivocado, variables internas redefinidas). Hay que alinear el uso con el Storybook/documentación oficial antes de seguir puliendo vistas.

## What Changes

- **Slots correctos**: `sp-sidenav-item` con el icono en `slot="icon"`; `sp-action-button` con el icono en `slot="icon"` (y `label` en botones de solo icono).
- **Sin “tags como toggle”**: los grupos de opciones (filtros de tipo, periodos de análisis) pasan a `sp-action-group` + `sp-action-button` con `selected` (API oficial), en lugar de `sp-tag` con `selected`/`role="button"`.
- **Sin sobrescrituras internas**: se eliminan overrides de variables internas (`--spectrum-tag-*`, `--spectrum-sidenav-item-gap`, etc.); se usan variantes/slots oficiales y, si hace falta ajustar, la capa de personalización documentada (`--mod-*`).
- **Guía de uso**: documento corto en `docs/` con las reglas de uso de SWC (slots, variantes, cuándo usar `--mod-*`).

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `app-components`: uso de componentes Spectrum conforme a su API (slots, variantes, sin sobrescrituras internas) para grupos de opciones y controles.

## Impact

- **Código**: `src/components/app-shell`, `movements-filters`, `transaction-form`, `assistant-chat`, `settings-preferences`, `src/pages/analysis-page.ts`, `landing-page.ts`, `src/components/icons.ts`.
- **Dependencias**: ya instaladas (`sp-action-group`, `sp-action-button`, `sp-sidenav`, `sp-tag`).
- **Tests**: unitarios de los componentes tocados y E2E de movimientos/análisis/settings/landing.
- **Relacionado**: precede a `ui-views-polish`.
