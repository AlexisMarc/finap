# ADR-0004: Routing

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

La SPA necesita navegación entre landing, login y las páginas de la app, con rutas declarativas y protección de acceso.

## Decisión

- Usar `startApp` de `@open-cells/core` con un array de rutas declarativas (`src/router/routes.ts`).
- Cada ruta define `name`, `path`, `component` (tag del Web Component) y `action` (import perezoso del módulo de la página).
- El acceso se controla con el `interceptor` de `appConfig`: sin sesión → login/landing; con sesión → dashboard.
- Las páginas son componentes registrados con `customElements.define` y cargados de forma perezosa.

## Consecuencias

- Cada página se carga solo cuando se navega a ella (mejor rendimiento inicial).
- El guard central evita repetir comprobaciones de sesión en cada página.
- Añadir una ruta es declarativo: no se toca el bootstrap.
