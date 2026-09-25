# Proposal

## Why

Tras las fases de fundación y app, la interfaz usa Spectrum en unas zonas pero conserva una **capa propia** (`finap-card`, `finap-icon`, `finap-button`, `finap-chip`, `finap-avatar`, `finap-progress`, `finap-stat-card`, `finap-list-item`, toggles, `user-menu`) y colores/radios propios. El resultado es un **ecosistema híbrido** que no se siente de un solo sistema. Este change **reemplaza la UI por componentes de Adobe Spectrum Web Components** de forma transversal: las vistas usan `sp-*` directamente siempre que existe equivalente, se elimina la capa propia que no aporta, y el diseño se alinea con los colores, radios y superficies de Spectrum.

## What Changes

- **SWC directo en las vistas** (se eliminan los wrappers que solo reenviaban): `sp-button`, `sp-icon`, `sp-card`, `sp-tag`, `sp-avatar`, `sp-progress-bar`/`sp-meter`, `sp-badge`, `sp-table`, `sp-sidenav`, `sp-search`, `sp-action-menu`, `sp-action-button`, `sp-switch`, `sp-divider`, `sp-link`, `sp-tooltip`, `sp-status-light`, `sp-illustrated-message`, `sp-alert-banner`/`sp-toast`, `sp-dialog`.
- **Se eliminan** `finap-button`, `finap-icon`, `finap-card`, `finap-chip`, `finap-avatar`, `finap-progress`, `finap-stat-card`, `finap-list-item`, `finap-theme-toggle`, `finap-language-toggle`, `finap-user-menu`, `finap-modal` y `finap-confirm-dialog`; sus vistas pasan a componer las primitivas Spectrum equivalentes (los modales con `sp-dialog-wrapper`).
- **Se conservan** solo los que aportan contrato propio o no tienen equivalente en SWC: `finap-input`/`finap-select` (emiten `finap-input`/`finap-change` y alimentan la validación de los formularios), `finap-heading`/`finap-text` (tipografía Spectrum por clases; SWC no ofrece componente), `finap-container` (layout), `finap-brand-mark` (logo), `finap-chart` (chart.js) y el chat del asistente (no hay componente de chat).
- **Modales con el componente más cercano**: se usa `sp-dialog-wrapper` (diálogo modal de Spectrum con overlay, foco y cierre) en lugar de la capa `finap-modal`/`finap-confirm-dialog`.
- **Layout con CSS Grid**: la estructura de las vistas (chrome, dashboard y páginas) se recompone con CSS Grid usando los tokens de espaciado de Spectrum, lo que ajusta un poco la estructura visual a cambio de coherencia.
- **Diseño adaptado a Spectrum**: neutros de la escala semántica de Spectrum, acento interactivo de Spectrum y marca (rojo/naranja/amarillo) relegada a acento (logo, hero, gradiente).
- **Menos redondeo y más simplicidad**: radios pequeños de Spectrum (no "burbuja"), superficies planas con borde sutil, jerarquía por tipografía/espaciado.
- **Revisión de todas las vistas** (dashboard, movimientos, análisis, deudas, categorías/presupuestos, ajustes, asistente, login, landing) para que usen directamente los componentes SWC.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `design-tokens`: paleta (neutros Spectrum + marca como acento), semánticos y radios/elevación.
- `foundation-components`: se **eliminan** `finap-button`, `finap-card`, `finap-icon`, `finap-theme-toggle` y `finap-language-toggle` (→ `sp-button`, `sp-card`, `sp-icon`, `sp-switch`/`sp-picker`); se ajustan `finap-heading`, `finap-text` y `finap-container`.
- `app-components`: se **eliminan** `finap-stat-card`, `finap-list-item`, `finap-progress`, `finap-chip`, `finap-avatar` y `finap-modal` (→ `sp-card`+`sp-badge`, `sp-table`, `sp-meter`/`sp-progress-bar`, `sp-tag`, `sp-avatar`, `sp-dialog-wrapper`); se mantienen `finap-input` y `finap-select`; se añade el layout con CSS Grid.
- `app-shell`: navegación con `sp-sidenav`, búsqueda con `sp-search` y menú de usuario con `sp-action-menu`.
- `landing-page`: superficies con `sp-card`, navegación/footer con `sp-link` y badges con `sp-badge`.

## Impact

- **Código**: se eliminan ~11 componentes de `src/components/`; se actualizan todas las páginas y formularios que los consumían; `src/tokens/*`; `app-shell`. Los formularios siguen usando `finap-input`/`finap-select`.
- **Dependencias nuevas**: `@spectrum-web-components/{card,badge,sidenav,search,table,meter,status-light,illustrated-message,tooltip,divider,link,switch,action-menu,action-button,alert-banner,toast,menu,close-button}`.
- **Tests**: se eliminan los unit tests de los componentes retirados; se actualizan los de los que quedan y los de las vistas; los E2E se ajustan a los nuevos selectores (sidenav, search, tablas, badges).
- **PWA/bundle**: revisar precache y tamaño; optimizar imports si hace falta.
- **Relacionado**: continúa `ui-spectrum-foundation` y `ui-spectrum-app` (archivados). Reemplaza parcialmente los contratos que estos introdujeron.
