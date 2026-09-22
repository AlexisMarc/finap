# Proposal

## Why

Los mockups de la app (Finap Mobile/PWA) muestran un estilo distinto al design system actual: tipografías **Inter** (cuerpo) y **Sora** (títulos), un enfoque **dark-first**, colores semánticos (verde ingreso, morado acento) y componentes de app (tarjetas de estadística, listas, progreso, chips, inputs, modales) que aún no existen. Para construir dashboard, vistas y formularios necesitamos extender el design system.

## What Changes

- **Tipografía**: añadir Inter (cuerpo) y Sora (títulos) como tokens, con la escala afinada.
- **Colores semánticos**: ingreso/positivo (verde `#2FC78A`), gasto, deuda y acento morado (`#7C4DFF`), además de la paleta de marca actual.
- **Escala de radios y elevación** alineada a los mockups (12/14/21/24/32; sombra de modal).
- **Componentes de app** nuevos: `finap-stat-card`, `finap-list-item`, `finap-progress`, `finap-chip`, `finap-avatar`, `finap-input`, `finap-select`, `finap-modal`.
- **Tests unitarios** por componente.

## Capabilities

### New Capabilities

- `app-components`: componentes reutilizables de app (stat-card, list-item, progress, chip, avatar, input, select, modal).

### Modified Capabilities

- `design-tokens`: tipografía Inter/Sora, colores semánticos y ajustes de radio/elevación.

## Impact

- **Modificado**: `src/tokens/typography.css`, `src/tokens/tokens.css`, `src/theme/theme.css`.
- **Nuevo**: `src/components/stat-card/`, `list-item/`, `progress/`, `chip/`, `avatar/`, `input/`, `select/`, `modal/`.
- **Sin dependencias nuevas**.
