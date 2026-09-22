# Design

## Context

Ver `proposal.md` y los mockups en `mockup/`. El design system actual usa system font stack y colores de marca; hay que acercarlo a la interfaz de los mockups (Inter/Sora, dark-first, semánticos) y añadir componentes de app.

## Decisions

### 1. Tipografías Inter y Sora

- **Decisión**: cargar `Inter` (cuerpo) y `Sora` (títulos) con `@fontsource` (variables), y exponer `--finap-font-family` (Inter) y `--finap-font-family-display` (Sora). `finap-heading` usa la familia display.
- **Alternativas**: Google Fonts por CDN (dependencia de red) o mantener system stack (no coincide con mockups).
- **Racional**: fuentes empaquetadas localmente (offline-friendly, ver `pwa-offline`) y fieles al mockup.

### 2. Colores semánticos y dark-first

- **Decisión**: añadir tokens `--finap-color-income` (verde `#2FC78A`), `--finap-color-expense`, `--finap-color-debt` y `--finap-color-accent-2` (morado `#7C4DFF`), con variantes en `theme.css` para claro/oscuro. Alinear los colores oscuros del tema a los mockups (`#0D0D12`, `#1E1E26`, `#292933`, `#3A3A44`).
- **Racional**: los mockups son dark-first; el tema oscuro debe ser el más cuidado.

> Nota: los hex de los mockups son la referencia a igualar; el diseño debe quedar cerca pero no idéntico.

### 3. Radios y elevación

- **Decisión**: definir escala `--finap-radius-sm/md/lg/xl` (8/12/21/32) y `--finap-shadow-modal: 0 24px 48px rgba(0,0,0,0.6)`.
- **Racional**: jerarquía visual variada (evita el "single border-radius" del que advierte `frontend-design`).

### 4. Componentes de app

- **Decisión**: crear 8 componentes (`stat-card`, `list-item`, `progress`, `chip`, `avatar`, `input`, `select`, `modal`) en `src/components/<nombre>/` con `index.ts` + `styles.ts` + `index.test.ts`, siguiendo el patrón de los componentes base (Shadow DOM, tokens, `fixture` para tests).
- **Modal**: usa `<dialog>` nativo cuando esté disponible, con fallback y cierre por Escape; foco atrapado.
- **Racional**: reutilizables por dashboard, movimientos, deudas y formularios.

### 5. Tests

- **Decisión**: un test por componente con Vitest + `src/test/fixture.ts`; test de tokens semánticos en `tokens.test.ts`/`theme-css.test.ts`.
- **Racional**: consistente con el resto del proyecto.

## Goals / Non-Goals

**Goals**: acercar tokens y añadir componentes de app.
**Non-Goals**: no se construyen páginas (dashboard, etc.) en este change.

## Risks / Trade-offs

- **[Riesgo] Peso de fuentes** → Solo pesos necesarios y fuentes variables; el service worker (PWA) las cachea.
- **[Trade-off] Fidelidad a mockups vs. accesibilidad** → Se validan contrastes (test de contraste) al adoptar los colores oscuros.
