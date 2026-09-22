# ADR-0007: Theming

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

La app debe ofrecer tema claro y oscuro, respetar la preferencia del sistema y persistir la elección del usuario.

## Decisión

- El tema se aplica con el atributo `data-theme` (`light`/`dark`) en `<html>`.
- `src/theme/theme.ts` resuelve el tema (guardado → sistema → claro), lo aplica y lo persiste en `localStorage`.
- Al aplicar el tema, se emite el evento `finap-theme-changed` para que los componentes reaccionen (p. ej. gráficas).
- `theme.css` define los valores de los tokens para cada tema, incluyendo acentos y semánticos.

## Consecuencias

- Los componentes que usan tokens se adaptan automáticamente al tema.
- El evento permite reacciones puntuales sin acoplar componentes al módulo de tema.
- El tema oscuro es de primera clase (los mockups son dark-first).
