# Design

## Context

Ver `proposal.md` y los mockups (`mockup/Finap PWA Desktop-export.html`, `Finap Mobile App-export.html`). El router de Open Cells (`startApp` + `routes`) renderiza páginas en `mainNode`; el shell debe envolverlas.

## Decisions

### 1. Shell como componente con slot de contenido

- **Decisión**: `app-shell` renderiza sidebar/header/bottom-nav y un área de contenido con `<slot>`. Las páginas se renderizan en el área de contenido.
- **Alternativas**: usar "layouts/zones" nativos de Open Cells (`_insideLayout`). Se evaluó, pero un shell propio con slot es más simple y controlable.
- **Racional**: un único componente shell responsivo evita duplicar layout por página.

### 2. Navegación data-driven

- **Decisión**: una lista de secciones (`{ id, labelKey, icon, path }`) alimenta sidebar y bottom nav. La ruta activa se resuelve con `getCurrentRoute()`/evento del router y se marca con `aria-current`.
- **Racional**: una sola fuente de verdad para ambas navegaciones; labels vía i18n.

### 3. Rutas y guard

- **Decisión**: ampliar `routes.ts` con las páginas de la app (lazy import). El guard se implementa con el `interceptor` de Open Cells en `appConfig`: si no hay sesión y la ruta es de la app, redirige a `/` (landing/login); si hay sesión y la ruta es `/`, redirige a `/dashboard`.
- **Alternativas**: comprobar sesión dentro de cada página. Se descarta: el guard central es más robusto.
- **Racional**: aprovecha el `interceptor` de `startApp`.

### 4. Header y menú de usuario

- **Decisión**: el header muestra saludo (i18n, según hora), búsqueda (abre búsqueda de movimientos) y "Agregar" (abre `finap-modal` con el formulario de registro). El menú de usuario usa `finap-avatar` + un desplegable con "Cerrar sesión".
- **Racional**: coincide con el mockup y reutiliza componentes de app.

## Goals / Non-Goals

**Goals**: shell responsivo + nav + rutas + guard.
**Non-Goals**: no se implementan las páginas en sí (dashboard, etc.), solo el shell y sus rutas.

## Risks / Trade-offs

- **[Riesgo] Integración shell/router** → Verificar que las páginas renderizan dentro del slot del shell y que la ruta activa se actualiza.
- **[Trade-off] Búsqueda en header** → Se conecta con `movements`; hasta entonces, placeholder funcional.
