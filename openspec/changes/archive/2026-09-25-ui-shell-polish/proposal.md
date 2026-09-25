# Proposal

## Why

El chrome de la app (sidebar y header) tiene problemas de acabado: iconos y texto desalineados, en modo oscuro la línea divisoria delata el desborde del sidebar, el botón de acción junto a "Agregar" está mal ubicado, y no hay migas de pan ni ayuda. El menú de usuario se limita a cerrar sesión y el cambio de tema está disperso.

## What Changes

- **Sidebar alineado**: icono y texto alineados (`sp-sidenav-item`), sin desborde visible en modo oscuro.
- **Header**: "Agregar" y las acciones se agrupan (`sp-action-group`); el avatar/nombre abre un **menú de acciones rápidas** (`sp-action-menu`) con cambio de tema, moneda, idioma y cerrar sesión.
- **Migas de pan**: `sp-breadcrumbs`/`sp-breadcrumb-item` para indicar dónde está el usuario.
- **Ayuda**: botón de ayuda que lanza un tour de pasos con `sp-coachmark` (carrucel de pasos).
- **Tema**: el cambio de tema pasa de `sp-switch` a un botón con icono (sol/luna).

No se añaden librerías externas.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `app-shell`: alineación del sidebar, agrupación de acciones del header, menú de usuario con acciones rápidas, migas de pan y ayuda contextual.

## Impact

- **Código**: `src/components/app-shell/index.ts` (sidebar, header, breadcrumbs, coachmark, action-menu), `src/components/settings-preferences/index.ts` (tema como botón).
- **Dependencias**: `@spectrum-web-components/{breadcrumbs,coachmark,action-group}` (instaladas en `ui-foundation-polish`).
- **Tests**: unitarios del shell; E2E de auth (logout/menú) y dashboard.
- **Relacionado**: depende de `ui-foundation-polish`.
