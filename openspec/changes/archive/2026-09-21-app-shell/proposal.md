# Proposal

## Why

La landing ya es la entrada de la SPA, pero no existe el shell de la aplicación autenticada: los mockups muestran un layout con sidebar (desktop), bottom nav (mobile), header con búsqueda/acciones, perfil de usuario y navegación entre páginas (Inicio, Análisis, Deudas, Movimientos, Ajustes). Sin este shell no se pueden construir las vistas.

## What Changes

- **Shell de la aplicación**: layout responsivo con sidebar (desktop) y bottom nav (mobile), header con saludo, búsqueda y acción "Agregar", y menú de usuario.
- **Navegación**: componente de navegación con estado de ruta activa, integrado con el router de Open Cells.
- **Rutas de la app**: se amplía la definición de rutas (`dashboard`, `analysis`, `debts`, `movements`, `settings`) con lazy loading.
- **Guard de sesión**: redirección a login cuando no hay sesión y a la app cuando sí.

## Capabilities

### New Capabilities

- `app-shell`: layout de la app autenticada, navegación (sidebar/bottom nav/header) y menú de usuario.

### Modified Capabilities

- `app-bootstrap`: la definición de rutas incluye las páginas de la app y un guard de sesión.

## Impact

- **Nuevo**: `src/components/app-shell/`, `src/components/nav-*`, `src/components/user-menu/`.
- **Modificado**: `src/router/routes.ts`, `src/app-config.ts`, `index.html`, `src/main.ts`.
- **Depende de**: `design-system-extensions` (componentes de app) y `auth` (guard).
