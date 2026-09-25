# Proposal

## Why

La suite E2E (change `e2e-playwright`) destapó varios bugs reales del shell: tras iniciar sesión el shell podía quedarse en modo público (sin navegación ni menú de usuario), las páginas de Categorías y Presupuestos se renderizan sin el chrome de la app, el saludo del header está duplicado ("Hola Hola, …") y el campo de búsqueda del header no hace nada. Son defectos visibles en el producto y conviene corregirlos ahora que están detectados.

## What Changes

- **Detección de página activa**: el shell pasa a detectar la página visible de `#app` por `state="active"` (con fallback) en lugar de `firstElementChild`, ya que Open Cells mantiene montadas las páginas anteriores con `state="inactive"`. *(Corrección ya aplicada durante el trabajo de E2E; este change la formaliza con spec y tests.)*
- **Chrome en todas las páginas autenticadas**: Categorías y Presupuestos pasan a renderizarse dentro del chrome de la app (sidebar/topbar/bottom nav) en vez de modo público. *(Ya aplicada; se formaliza.)*
- **Saludo del header sin duplicación**: el topbar deja de mostrar "Hola" dos veces (solo "Hola, {nombre} 👋" o el nombre en el lugar correcto).
- **Búsqueda funcional en el header**: el campo de búsqueda del topbar se conecta a la página de Movimientos (al enviar, navega a Movimientos con el filtro de búsqueda aplicado).
- **A11y del menú de usuario**: el nombre accesible del botón del menú de usuario deja de duplicar el nombre/email (avatar con `aria-hidden`).

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `app-shell`: detección de la página activa, chrome para Categorías/Presupuestos, saludo del header, búsqueda del header funcional y a11y del menú de usuario.

## Impact

- **Código**: `src/components/app-shell/index.ts` (detección de página, `APP_PAGES`, saludo, búsqueda), `src/components/user-menu/index.ts` (a11y), `src/pages/movements-page.ts` (recibir búsqueda pendiente), posible módulo de estado compartido en `src/state/`.
- **Tests**: unitarios de `app-shell` (detección con varias páginas, búsqueda), de `movements-page` y de `user-menu`; specs E2E existentes (dashboard, auth, movimientos) deben seguir pasando.
- **Specs**: delta de `app-shell`.
- **Relacionado**: bugs hallados por la suite E2E del change `e2e-playwright`.
