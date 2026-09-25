# Proposal

## Why

Con la base Spectrum ya en marcha (change `ui-spectrum-foundation`), esta fase completa el rediseño: los componentes de formulario, listas, chips, avatares, progreso y modales pasan a las primitivas de Spectrum (`sp-textfield`, `sp-picker`, `sp-dialog`, `sp-progress-*`, `sp-tag`, `sp-avatar`), y la landing se reconstruye con los patrones visuales de Spectrum. Las páginas de la app conservan su comportamiento y estructura; el cambio es visual y de componentes.

## What Changes

- **Componentes de app sobre Spectrum**: `finap-input` → `sp-textfield`/`sp-number-field`/`sp-textarea`, `finap-select` → `sp-picker`, `finap-modal` → `sp-dialog` (underlay incluido), `finap-progress` → `sp-progress-bar`/`sp-progress-circle`, `finap-chip` → `sp-tag`, `finap-avatar` → `sp-avatar`. `finap-stat-card` y `finap-list-item` se recomponen con estilos/tokens Spectrum manteniendo su API.
- **Formularios**: los formularios existentes (transacción, categoría, deuda, login, preferencias) usan los nuevos campos sin cambiar validación ni eventos.
- **Landing**: rediseño del hero, secciones y footer con patrones Spectrum (tipografía, botones, cards), manteniendo idioma, tema, navegación, animaciones (motion) y el acento de marca.
- **Chrome de la app**: sidebar/topbar/bottom nav adoptan estilos de navegación Spectrum manteniendo el comportamiento actual (secciones, página activa, búsqueda del header, menú de usuario).

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `app-components`: input, select, modal, progress, chip y avatar se implementan con primitivas Spectrum; stat-card y list-item se recomponen manteniendo API.
- `landing-page`: rediseño visual con patrones Spectrum (hero, secciones, footer) manteniendo el contenido y comportamiento existentes.

## Impact

- **Código**: `src/components/` (input, select, modal, progress, chip, avatar, stat-card, list-item, confirm-dialog), formularios (`transaction-form`, `category-form`, `debt-form`, `login-form`, `settings-preferences`), `src/pages/landing-page.ts`, `src/components/app-shell/index.ts`.
- **Especs de página sin delta**: dashboard, movements, transactions, categories-budgets, analysis, debts, settings, ai-assistant, auth, app-shell mantienen sus requisitos de comportamiento; solo cambia su aspecto (cubierto por `app-components` y `design-tokens`).
- **Tests**: unitarios de los componentes migrados se actualizan; E2E se ajusta en la fase 3 (`ui-spectrum-verification`), aunque los selectores por rol deberían sobrevivir en su mayoría.
- **Relacionado**: depende de `ui-spectrum-foundation` (tema, tokens y componentes base).
