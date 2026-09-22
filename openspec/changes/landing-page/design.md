# Design

## Context

El design system (tokens, componentes base, motion) ya está implementado y archivado. El repo tiene `main.ts` que solo renderiza una demo estática. La motivación de la landing está en `proposal.md`. Open Cells 1.2.1 expone `startApp(config)` con `routes` (cada ruta: `name`, `path`, `component`, `action`); `mainNode` es el id del contenedor (`document.querySelector('#' + mainNode)`).

## Goals / Non-Goals

**Goals:**
- Landing page (hero + features + footer) como ruta raíz `/` de la SPA.
- Mostrar la paleta de marca completa (rojo/naranja/amarillo) — no solo rojo.
- Animaciones sutiles estilo Apple Mac Studio reutilizando las primitivas de `motion`.
- Dejar el bootstrap de Open Cells listo para añadir más páginas.

**Non-Goals:**
- No se implementan dashboard, movimientos, presupuestos ni categorías (páginas futuras).
- No se añade estado global de negocio ni persistencia de datos.
- No se cambia el API/estructura del design system más allá del botón secundario y el gradiente.

## Decisions

### 1. Bootstrap con `startApp` + rutas declarativas

- **Decisión**: `src/components/app-index.ts` llama a `startApp({ mainNode: 'app', routes })`. `src/router/routes.ts` exporta el array de rutas. La ruta `landing` usa `component: 'landing-page'` y `action: () => import('../pages/landing-page.js')` (lazy load: Open Cells llama `action()` para importar y registrar el componente cuando la ruta se resuelve).
- **Alternativas**: render manual sin router. Se descarta porque la landing debe ser la entrada de una SPA con más rutas después.
- **Racional**: `action` hace el registro del custom element perezoso, y `component` es el tag que Open Cells crea en `mainNode`.

### 2. Landing como `LitElement` (PageController diferido)

- **Decisión**: `landing-page` es un `LitElement` registrado como custom element (tag `landing-page`) que el router renderiza. No se usa `PageController` en este change.
- **Alternativas**: usar `@open-cells/page-controller` 1.0.6. Se descarta por ahora: el paquete (y su cadena `@open-cells/element-controller` → `@open-cells/core-plugin`) publica sintaxis ESM sin `"type": "module"` y con un import de tipos por subpath (`@open-cells/element-controller/types`) frágil para `tsc`/Vite; además no aporta valor funcional a una landing estática (su `onPageEnter`/`onPageLeave` sería no-op).
- **Racional**: mantener el cambio robusto y centrado en la entrada a la SPA (`startApp` + rutas, que sí es el patrón real de Open Cells). El `PageController` se adopta cuando haya páginas con datos que cargar/limpiar en el ciclo de vida.

### 3. Gradiente de marca como token

- **Decisión**: añadir `--finap-gradient-brand: linear-gradient(...)` en `src/tokens/tokens.css` usando `--finap-color-primary` (rojo), `--finap-color-secondary` (naranja) y `--finap-color-accent` (amarillo).
- **Alternativas**: gradiente hardcodeado en la landing. Se descarta: debe ser un token reutilizable del design system.
- **Racional**: expone la identidad visual completa de forma consistente y accesible desde cualquier componente.

### 4. `finap-button` secundario → naranja

- **Decisión**: `button.secondary` pasa a usar `--finap-color-secondary` (naranja) en `src/components/button/styles.ts`, en lugar del rojo primario.
- **Alternativas**: dejar el secundario rojo. Se descarta porque no visibiliza la paleta (el síntoma reportado: "solo veo rojo").
- **Racional**: el naranja es el segundo color de marca y diferencia la acción secundaria de la primaria.

### 5. Marca decorativa (`brand-mark`)

- **Decisión**: componente `finap-brand-mark` (círculos solapados estilo Mastercard) que usa el gradiente/colores de marca, con test. Se usa en el hero.
- **Alternativas**: SVG inline en la landing sin componente. Se descarta para que sea reutilizable y testeable.
- **Racional**: componente visual de identidad, coherente con "un test por componente".

### 6. Animaciones reutilizando `motion`

- **Decisión**: el hero usa entrada fade/slide y las secciones usan `RevealController` (reveal on scroll) ya existentes; micro-interacciones vía CSS de los componentes. Durations lentas (`--finap-motion-duration-slow`) y easing `emphasized` para el estilo sutil de Apple.
- **Alternativas**: animaciones propias de la landing. Se descarta: duplicaría lo que `motion` ya ofrece.
- **Racional**: consistencia y respeto de `prefers-reduced-motion` por construcción.

### 7. Estructura de archivos

- **Decisión**:
  ```
  src/
  ├── components/
  │   ├── app-index.ts        # startApp bootstrap
  │   └── brand-mark.ts       # marca decorativa
  ├── pages/
  │   └── landing-page.ts     # página de entrada
  ├── router/
  │   └── routes.ts           # definición de rutas
  └── main.ts                 # estilos globales + initTheme + app-index
  ```
- **Racional**: sigue la estructura del README y separa bootstrap, rutas y página.

### 8. Tests

- **Decisión**: tests unitarios con Vitest + `src/test/fixture.ts` (patrón `new Componente()` + ciclo de vida manual, ya usado en design system). Se testean: `landing-page` (hero/features/footer, colores de marca), `brand-mark`, y `routes.ts` (estructura declarativa). El bootstrap `startApp` se valida con un test de configuración (mainNode y ruta raíz).
- **Racional**: evita el problema conocido de happy-dom + `document.createElement` (shadowRoot null), documentado en el change anterior.

## Risks / Trade-offs

- **[Riesgo] La API real de Open Cells difiere del README** (`PageController`/`ElementController` están en paquetes separados) → Se usa `@open-cells/page-controller`; se documenta aquí para no sorprender.
- **[Riesgo] `startApp` depende de `document.querySelector('#app')`** → El `index.html` mantiene `<div id="app">`; si falta, Open Cells lanza error.
- **[Trade-off] Gradiente con los tres colores puede reducir legibilidad del texto encima** → Texto del hero sobre zonas claras del gradiente con contraste verificado (test de contraste existente).
- **[Trade-off] Lazy load vía `action`** → La primera navegación importa la página; aceptable para una SPA y deja el patrón para más rutas.
