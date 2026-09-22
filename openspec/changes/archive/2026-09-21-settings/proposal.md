# Proposal

## Why

Los mockups incluyen "Ajustes" en la navegación. La app ya tiene tema (claro/oscuro) e idioma (es/en) como utilidades sueltas; falta una página de ajustes que agrupe perfil, preferencias (tema, idioma, moneda) y sesión, y que sea el punto de entrada a la gestión de categorías y presupuestos.

## What Changes

- **Página de ajustes** (`/settings`) con secciones: perfil, preferencias y sesión.
- **Perfil**: nombre, email y avatar (solo lectura o edición según backend).
- **Preferencias**: tema (reutiliza `finap-theme-toggle`), idioma (reutiliza `finap-language-toggle`) y moneda.
- **Sesión**: cerrar sesión.
- **Accesos** a categorías y presupuestos.

## Capabilities

### New Capabilities

- `settings`: página de ajustes con perfil, preferencias (tema, idioma, moneda), sesión y accesos a categorías/presupuestos.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/settings-page.ts`, `src/components/settings/` (secciones), `src/services/user-service.ts`.
- **Depende de**: `app-shell`, `auth`, `i18n`, `design-system-extensions`.
