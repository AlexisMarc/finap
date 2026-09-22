# Design

## Context

El design system y la landing actuales (gradiente de marca de fondo, logo de círculos) no reflejan el estilo esperado. Ver `proposal.md`. El modo claro/oscuro ya existe a nivel de tokens (`theme.css`, `theme.ts` con `initTheme`/`setTheme`/`resolveTheme`), pero no hay toggle visible ni cobertura oscura completa. El logo actual (dos círculos solapados) es demasiado parecido a Mastercard y debe pasar a dos rombos.

## Goals / Non-Goals

**Goals:**
- Logo de Finap propio: dos rombos solapados.
- Toggle visible de tema claro/oscuro + soporte oscuro completo de tokens y componentes.
- Landing con contenido y estilo alineados a la referencia Mastercard (header, hero, secciones con cards, footer).
- Ajustes de estilo del design system (tipografía de titulares, cards, botones).
- Aplicar las skills del proyecto (`frontend-design` y `canvas-design`) a la identidad visual.

**Non-Goals:**
- No se añaden más páginas (dashboard, movimientos, etc.).
- No se implementa estado global de negocio ni datos reales.
- No se copia el logo ni contenido de Mastercard: solo se toma el estilo como referencia.

## Decisions

### 0. Skills del proyecto (obligatorio)

- **Decisión**: el rediseño aplica las skills de OpenCode:
  - `frontend-design` guía la identidad visual: decisiones deliberadas de paleta, tipografía y layout; evitar defaults templados (cards SaaS idénticas, eyebrow ALL-CAPS, gradientes decorativos, un solo border-radius en todo). Grounding en el subject matter (finanzas personales).
  - `canvas-design` produce la **filosofía de diseño** de Finap (`docs/design-philosophy.md`): un movimiento estético propio (forma, color, espacio, composición, jerarquía) que da alma a la identidad.
- **Alternativas**: diseñar sin estas guías. Se descarta: son las skills del proyecto y definen el criterio de "distintivo, no templado".
- **Racional**: el rediseño busca una identidad propia; las skills son la fuente de criterio visual del proyecto.

### 1. Logo: dos rombos

- **Decisión**: `finap-brand-mark` renderiza dos **rombos** (cuadrados rotados 45°) solapados, con `--finap-color-primary` (izquierda) y `--finap-color-secondary` (derecha), solape con `mix-blend-mode: multiply`.
- **Alternativas**: dos círculos (actual) — se descarta por parecerse a Mastercard.
- **Racional**: identidad propia de Finap con los colores de marca, sin copiar la marca de Mastercard.

### 2. Toggle de tema: `finap-theme-toggle` + evento de cambio

- **Decisión**: nuevo componente `finap-theme-toggle` que usa `setTheme`/`resolveTheme` de `theme.ts`. `theme.ts` pasa a emitir un `CustomEvent('finap-theme-changed')` al aplicar el tema, para que el toggle (y futuros consumidores) reaccionen. El toggle muestra el estado actual (sol/luna) y alterna al hacer clic.
- **Alternativas**: gestionar el estado del tema dentro del toggle sin evento. Funciona, pero no refleja cambios externos (p.ej. preferencia del sistema).
- **Racional**: un evento de cambio es la forma limpia de mantener el toggle sincronizado con el estado global del tema.

### 3. Cobertura oscura completa

- **Decisión**: completar `theme.css` y tokens para que en modo oscuro todos los elementos (fondo, superficie, textos, bordes, sombras, acentos y gradiente de marca) tengan valores coherentes. El gradiente de marca se mantiene como acento decorativo (no como fondo del hero).
- **Alternativas**: dejar el gradiente y acentos sin variante oscura. Se descarta: el spec exige cobertura completa.
- **Racional**: los componentes ya consumen tokens, así que completar los tokens resuelve el modo oscuro en toda la app.

### 4. Landing al estilo Mastercard

- **Decisión**: reestructurar la landing:
  - **Header**: logo (dos rombos) + navegación + `finap-theme-toggle`.
  - **Hero**: tagline + headline grande + CTA, sobre fondo claro con acentos rojo/naranja (sin gradiente de fondo).
  - **Secciones**: contenido en cards (producto, funcionalidades) siguiendo la estructura de la referencia.
  - **Footer**: enlaces e información, estilo Mastercard.
- **Alternativas**: mantener el hero con gradiente completo. Se descarta: no es el estilo de la referencia.
- **Racional**: alinear el contenido y el aspecto con lo que el usuario espera.

### 5. Ajustes de estilo del design system

- **Decisión**: tipografía de titulares más grande y bold, cards más limpias (sombra más sutil o solo borde), botones con radios/espaciado refinados. Todo vía tokens (sin hardcode) para que el modo oscuro siga funcionando.
- **Racional**: acercar los componentes base al look Mastercard sin romper la cobertura de tokens.

### 6. Tests

- **Decisión**: tests unitarios con Vitest + `src/test/fixture.ts` (patrón existente). Se testean: `brand-mark` (dos rombos), `theme-toggle` (alterna y persiste), `landing-page` (header/hero/secciones/footer), y la cobertura oscura de tokens (test de contraste/valores oscuros).
- **Racional**: consistente con los cambios anteriores; evita el problema conocido de happy-dom + `document.createElement`.

## Risks / Trade-offs

- **[Riesgo] "Estilo Mastercard" es subjetivo** → Se concreta en requisitos testables (logo de rombos, header/nav/toggle, hero claro, secciones con cards) y el resto se deja como ajuste visual documentado aquí.
- **[Riesgo] El evento `finap-theme-changed` cambia `theme.ts`** → Cambio retrocompatible y testeado; el toggle escucha el evento.
- **[Trade-off] Hero sin gradiente de fondo** → El gradiente de marca pasa a ser acento decorativo (línea o elemento), manteniendo visibles los tres colores vía acentos y botones.
- **[Trade-off] Refinamientos de estilo** → Se mantienen dentro de tokens para no romper el modo oscuro ni el contraste AA.
