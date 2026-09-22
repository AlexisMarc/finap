# Proposal

## Why

La landing y el design system actuales no reflejan el estilo esperado (referencia: página oficial de Mastercard). Además, el logo usa dos círculos (demasiado parecido a Mastercard) y debe ser dos rombos propios de Finap; y falta un toggle visible de modo claro/oscuro en la página. Es momento de alinear la identidad visual y el contenido.

## What Changes

- **Skills del proyecto (obligatorio)**: aplicar las skills `frontend-design` y `canvas-design` de OpenCode para guiar la identidad visual (diseño distintivo, no templado) y crear la filosofía de diseño de Finap.
- **Logo de Finap**: cambiar `finap-brand-mark` de dos círculos a **dos rombos** (identidad propia, no una copia de Mastercard), y usarlo en el header de la landing.
- **Modo claro/oscuro**: añadir un componente `finap-theme-toggle` (alternar claro/oscuro, persistir y respetar `prefers-color-scheme`) y completar el soporte oscuro de tokens y componentes (cards, botones, gradiente, fondos).
- **Contenido y estilo de la landing** (referencia Mastercard): header con logo + navegación + toggle, hero con tagline y headline, secciones de contenido en cards, y footer; estilo limpio (fondo claro, acentos rojo/naranja, tipografía grande).
- **Ajustes de estilo del design system** para acercarlo al look Mastercard: tipografía de titulares más grande, cards más limpias, botones y espaciado refinados.
- **Tests unitarios** para los componentes nuevos/modificados.

## Capabilities

### New Capabilities

<!-- Ninguna: todas las capacidades ya existen. -->

### Modified Capabilities

- `foundation-components`: añadir los componentes `finap-brand-mark` (logo de dos rombos) y `finap-theme-toggle` (alternador claro/oscuro).
- `landing-page`: rehacer el contenido y la estructura al estilo de la referencia Mastercard (header con logo/nav/toggle, hero con tagline y headline, secciones de contenido y footer).
- `design-tokens`: completar el soporte de modo oscuro y afinar la tipografía/estilo para el look Mastercard.

## Impact

- **Modificado**: `src/components/brand-mark/` (rombo), `src/pages/landing-page.ts` (contenido), `src/tokens/*.css` (dark + tipografía), `src/components/button`, `card`, `heading`, `text` (estilo).
- **Nuevo**: `src/components/theme-toggle/` y su test.
- **Tests**: actualizar y añadir tests unitarios para los cambios.
