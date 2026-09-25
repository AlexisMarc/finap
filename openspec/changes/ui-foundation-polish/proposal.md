# Proposal

## Why

Tras el rediseño a Spectrum, quedan detalles de base que hacen la interfaz poco cuidada: colores más fríos que los de la librería, falta de estados de carga elegantes (se usa "Cargando…"), ausencia de ayuda contextual, campos de fecha y área de texto sin coherencia con los campos de Spectrum, y poco uso de badges/status, grupos de acciones y grupos de campos. Este change pule esa base compartida.

## What Changes

- **Colores más cálidos**: los neutros se afinan hacia el tono cálido de Spectrum y se garantiza el contraste entre fondo y superficie en modo claro.
- **Estados de carga**: skeletons (shimmer) con tokens de Spectrum en lugar del texto "Cargando…" en las vistas.
- **Ayuda contextual**: `sp-coachmark` (tours de pasos) y `sp-tooltip`/`sp-help-text` para guiar campos y controles.
- **Campos de fecha y área de texto**: `finap-input type="date"` y el `textarea` nativo se estilizan como `sp-textfield` (etiqueta, borde, foco y help-text), ya que SWC no publica un date-picker ni `sp-textarea`.
- **Badges/status**: `sp-badge` y `sp-status-light` para indicar ingreso/gasto/deuda y estados de forma coherente.
- **Grupos**: `sp-action-group` (grupos de botones) y `sp-field-group` (agrupación de campos con etiqueta) para jerarquía visual.
- **Iconos**: más workflow icons donde aportan (búsqueda, ayuda, ajustes, acciones).

No se añaden librerías externas: SWC ya cubre breadcrumbs, coachmark, action-group, field-group y popover; skeleton y carrusel se resuelven con CSS propio.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `design-tokens`: paleta de color (neutros cálidos de Spectrum) y contraste fondo/superficie.
- `app-components`: campos de fecha/textarea coherentes, skeletons, ayuda contextual, badges/status y grupos de acciones/campos.

## Impact

- **Código**: `src/tokens/tokens.css`, `src/components/input/index.ts` (fecha/textarea), nuevos `src/components/skeleton/*`, `src/components/coachmark-help/*` (o uso directo de `sp-coachmark`/`sp-tooltip`), `src/components/` (badges/status, action-group/field-group), vistas que usan "Cargando…".
- **Dependencias**: `@spectrum-web-components/{coachmark,action-group,field-group,breadcrumbs,popover}`.
- **Tests**: unitarios de input/skeleton/ayuda; E2E de vistas.
- **Relacionado**: precede a `ui-shell-polish` y `ui-views-polish`.
