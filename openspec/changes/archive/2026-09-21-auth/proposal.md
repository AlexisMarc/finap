# Proposal

## Why

Los mockups asumen un usuario autenticado (Marcos García). La app necesita inicio de sesión, manejo de sesión y cierre de sesión para proteger las vistas y poblar el perfil. El guard del shell depende de esta capability.

## What Changes

- **Vista de login**: formulario de email/contraseña con validación y manejo de errores.
- **Sesión**: servicio de autenticación que obtiene y persiste el token y el usuario, y los restaura al cargar.
- **Cierre de sesión**: opción desde el menú de usuario (integración con `app-shell`).
- **Componentes**: reutiliza `finap-input`, `finap-button`, `finap-card` del design system.

## Capabilities

### New Capabilities

- `auth`: inicio de sesión, gestión de sesión (token/usuario) y cierre de sesión.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/login-page.ts`, `src/services/auth-service.ts`, `src/state/session.ts`, `src/components/login-form/`.
- **Modificado**: `src/router/routes.ts` (ruta `/login`), `appConfig` (guard).
- **Depende de**: `api-contracts` (endpoints de auth), `design-system-extensions` (inputs).
