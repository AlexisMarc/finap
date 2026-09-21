# Proposal

## Why

Finap no tiene aún una base visual ni componentes reutilizables: el repositorio carece de código (`src/` no existe). Antes de construir la landing page (la cara del producto) y las páginas de la SPA, necesitamos un design system mínimo que fije la identidad visual y proporcione componentes Lit probados y consistentes. Empezar por el diseño evita retrabajo: la landing y el resto de páginas consumirán estos tokens y componentes.

## What Changes

- **Nuevo sistema de tokens de diseño** (CSS custom properties): paleta de color inspirada en la paleta de Mastercard (naranja/rojo primarios, grises y fondos neutros), tipografía, escala de espaciado, radios, elevación, duraciones/easings de motion y breakpoints. Incluye tema claro/oscuro.
- **Componentes base (foundation)** como Web Components Lit: `finap-button`, `finap-card`, `finap-heading`, `finap-text`, `finap-icon` y `finap-container`.
- **Primitivas de motion**: animaciones de entrada/reveal (fade, slide, reveal on scroll) y micro-interacciones (hover/press), con soporte de `prefers-reduced-motion`.
- **Tooling mínimo** para desarrollar y testear el design system: scaffold Vite + TypeScript + Lit + Open Cells, y configuración de tests unitarios (Vitest + @web/test-runner). El repo actual no tiene `package.json` ni `src/`, por lo que este change lo habilita.
- **Tests unitarios por cada componente** y para las utilidades de tokens/motion.

## Capabilities

### New Capabilities

- `design-tokens`: tokens visuales (color, tipografía, espaciado, radio, elevación, motion, breakpoints) expuestos como CSS custom properties y temas claro/oscuro.
- `foundation-components`: componentes Lit reutilizables base (`finap-button`, `finap-card`, `finap-heading`, `finap-text`, `finap-icon`, `finap-container`).
- `motion`: primitivas de animación (reveal, micro-interacciones) con soporte de `prefers-reduced-motion`.

### Modified Capabilities

<!-- Ninguna: no existen capabilities previas. -->

## Impact

- **Nuevo código**: `src/` con `tokens/`, `components/`, `motion/` y `theme/`.
- **Tooling**: se crea `package.json`, `vite.config.ts`, `tsconfig.json` y configuración de tests.
- **Dependencias nuevas**: `lit`, `@open-cells/core`, `typescript`, `vite`, `vitest`, `@web/test-runner`, `@open-wc/testing`.
- **Consumidores futuros**: la landing page y las páginas de la SPA usarán estos tokens y componentes (no en este change).
