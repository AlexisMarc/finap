# Proposal

## Why

La landing y los componentes base tienen el texto hardcodeado en español. Para llegar a usuarios de habla inglesa —y cumplir el roadmap del proyecto (i18n español/inglés)— hace falta un sistema de traducción con selector de idioma.

## What Changes

- **Sistema i18n** (`src/i18n/`): diccionarios de traducción en español e inglés, resolución del idioma (por defecto español, con persistencia en `localStorage`), y un mecanismo reactivo para que los componentes se re-traduzcan al cambiar el idioma.
- **Selector de idioma**: componente `finap-language-toggle` (ES/EN) en el header de la landing.
- **Landing traducida**: header (navegación), hero, secciones y footer usan el sistema i18n en lugar de strings hardcodeados.
- **Componentes localizados**: las etiquetas accesibles de `finap-theme-toggle` (y del nuevo `finap-language-toggle`) se traducen.
- **Tests unitarios** para el sistema i18n y los componentes nuevos/modificados.

## Capabilities

### New Capabilities

- `i18n`: traducciones español/inglés, resolución y persistencia del idioma, traducción reactiva y selector de idioma.

### Modified Capabilities

- `landing-page`: el contenido (header, hero, secciones y footer) se traduce vía i18n.
- `foundation-components`: añadir `finap-language-toggle` y localizar las etiquetas accesibles de `finap-theme-toggle`.

## Impact

- **Nuevo código**: `src/i18n/translations.ts`, `src/i18n/i18n.ts`, `src/components/language-toggle/`.
- **Modificado**: `src/pages/landing-page.ts` (traducción), `src/components/theme-toggle/` (labels localizadas), `src/main.ts` (inicializar idioma).
- **Sin dependencias nuevas**: se implementa con un módulo propio + Lit (patrón similar al de tema).
