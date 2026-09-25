# Proposal

## Why

Finap quiere adoptar **Adobe Spectrum Web Components** como design system. Spectrum está construido con Lit + shadow DOM (la misma base tecnológica de Finap), así que la migración no cambia el framework, el router ni los servicios. Esta primera fase sienta la base: tema y tokens Spectrum + sustitución de los componentes base (botón, campos, tipografía, iconos, superficies), dejando la app funcionando y con el mismo comportamiento.

## What Changes

- **Dependencias**: añadir paquetes de Spectrum (`@spectrum-web-components/theme`, `styles`, `button`, `textfield`, `picker`, `dialog`, `progress-*`, `icon` + `@spectrum-web-components/icons-workflow`), manteniendo Lit, chart.js y Open Cells.
- **Tema**: un único `sp-theme` raíz (scale medium, color light/dark) sustituye al esquema de tokens propio; el `finap-theme-toggle` pasa a conmutar el atributo `color` del `sp-theme` y respeta `prefers-color-scheme` como hoy.
- **Tokens**: `--finap-*` se conservan como **alias** de los tokens `--spectrum-*` (para no reescribir todas las páginas de golpe) y se añaden los tokens semánticos de Finap (ingreso/gasto/deuda y gradiente de marca) sobre la paleta Spectrum.
- **Tipografía**: se adoptan las fuentes de Spectrum (Adobe Clean) para cuerpo y títulos; se retiran Inter/Sora.
- **Componentes base sobre Spectrum**: `finap-button` → `sp-button`, `finap-heading`/`finap-text` → estilos tipográficos Spectrum, `finap-card`/`finap-container` → superficies con tokens Spectrum, `finap-icon` → `sp-icon` con el set de workflow icons. El resto de componentes (inputs, selects, chips, modales, avatares…) se migran en la fase 2 (`ui-spectrum-app`) y siguen funcionando mientras tanto.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `design-tokens`: los tokens pasan a derivarse de Spectrum (alias + tokens semánticos propios), y el tema se aplica vía `sp-theme` en lugar de variables propias.
- `foundation-components`: botón, tarjeta, títulos, texto, icono, contenedor y theme-toggle se implementan sobre Spectrum; brand-mark y language-toggle se mantienen.

## Impact

- **Código**: `src/tokens/` (alias a `--spectrum-*`), `src/theme/`, `src/app-index.ts` (envolver con `sp-theme`), componentes base (`button`, `heading`, `text`, `card`, `container`, `icon`, `theme-toggle`), `vite.config.ts` (imports de Spectrum, fuentes).
- **Dependencias**: `@spectrum-web-components/*` + `@spectrum-icons/*`; se retiran `@fontsource-variable/inter` y `@fontsource-variable/sora`.
- **Tests**: unitarios de tokens/contraste/componentes base se actualizan en la fase 3 (`ui-spectrum-verification`); en esta fase se ajustan solo los que rompen por el cambio de base.
- **Riesgo contenido**: los componentes de app siguen usando `--finap-*`, que ahora apuntan a valores Spectrum → cambio visual progresivo sin romper páginas.
