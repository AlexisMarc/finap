# Design

## Context

Ver `proposal.md`. El proyecto ya tiene `theme.ts` (tema) y `i18n.ts` (idioma) con persistencia; Ajustes reutiliza esos módulos y sus componentes.

## Decisions

### 1. Página con secciones

- **Decisión**: `settings-page` con secciones `settings-profile`, `settings-preferences` y `settings-session`; cada una como componente testeable.
- **Racional**: separación de responsabilidades.

### 2. Reutilizar preferencias existentes

- **Decisión**: la preferencia de tema usa `finap-theme-toggle` y la de idioma `finap-language-toggle`; no se duplica lógica.
- **Racional**: una sola fuente de verdad para tema e idioma.

### 3. Moneda

- **Decisión**: `currency` se resuelve en la sesión/perfil (`user.currency`) y se aplica al formateo (`Intl.NumberFormat`). Cambiarla actualiza la preferencia y refresca.
- **Racional**: formato coherente en toda la app.

### 4. Perfil

- **Decisión**: `user-service` obtiene/actualiza el perfil (`GET/PATCH /me`); el avatar reutiliza `finap-avatar`.
- **Racional**: encapsula la red.

## Goals / Non-Goals

**Goals**: centralizar preferencias y sesión.
**Non-Goals**: edición avanzada de cuenta (contraseña, seguridad) — futuro.

## Risks / Trade-offs

- **[Riesgo] Preferencias dispersas** → Se centralizan en `theme.ts`, `i18n.ts` y la sesión.
- **[Trade-off] Perfil solo lectura por ahora** → La edición se habilita cuando el backend lo soporte.
