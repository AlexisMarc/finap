# Proposal

## Why

Finap ya tiene design system (tokens, componentes base y motion), pero no tiene página de entrada. La landing es la cara del producto y debe ser la entrada a la SPA. Además, la identidad de marca completa (paleta Mastercard rojo/naranja/amarillo) está definida como tokens pero solo se usa el rojo; falta exponerla visualmente. Con el design system listo, es el momento de construirla.

## What Changes

- **Landing page** (hero + features + footer) como ruta raíz de la SPA, construida con los componentes base, tokens y motion del design system.
- **Bootstrap de Open Cells**: `startApp` + definición de rutas (`router/routes.ts`) con la landing como ruta raíz (`/`), reemplazando la demo actual de `main.ts`/`index.html`.
- **Identidad de marca completa**: gradiente de marca (rojo → naranja → amarillo) como token y como elemento decorativo; `finap-button` secundario pasa a naranja para que la paleta quede visible.
- **Animaciones estilo Apple Mac Studio**: reveal on scroll, entradas fade/slide y micro-interacciones suaves, reutilizando las primitivas de `motion`.
- **Tests unitarios** por cada componente nuevo.

## Capabilities

### New Capabilities

- `landing-page`: página de entrada de la SPA (hero, features, footer) que consume el design system, muestra la paleta de marca completa y aplica animaciones sutiles.
- `app-bootstrap`: arranque de la SPA con Open Cells (`startApp`, rutas) y render de la landing como ruta raíz.

### Modified Capabilities

- `design-tokens`: añadir el requirement de **gradiente de marca** (rojo/naranja/amarillo) para que la identidad visual completa quede expuesta como token.

## Impact

- **Nuevo código**: `src/pages/landing-page.ts`, `src/router/routes.ts`, `src/components/app-index.ts`, posiblemente `src/components/brand-mark.ts`.
- **Modificado**: `src/main.ts` (arranca `startApp`), `index.html` (entrada a la SPA), `src/components/button/styles.ts` (variante secundaria → naranja), `src/tokens/tokens.css` (gradiente de marca).
- **Dependencia nueva**: `@open-cells/page-controller` (ciclo de vida `onPageEnter`/`onPageLeave`).
- **Consumidor**: la landing es la base sobre la que se construirán las demás páginas (dashboard, movimientos, etc.).
