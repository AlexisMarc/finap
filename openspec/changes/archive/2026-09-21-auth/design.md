# Design

## Context

Ver `proposal.md` y los contratos en el change `api-contracts` (`POST /auth/login`, `POST /auth/logout`, `GET /auth/session`, `GET /me`).

## Decisions

### 1. Servicio de autenticación + estado de sesión

- **Decisión**: `src/services/auth-service.ts` encapsula las llamadas (`login`, `logout`, `getSession`) usando el cliente de datos; `src/state/session.ts` guarda el token y el usuario (canal de Open Cells + persistencia en `localStorage`). Al arrancar, `initSession()` restaura la sesión.
- **Alternativas**: guardar la sesión en cada componente. Se descarta: la sesión es estado global.
- **Racional**: separa red (service) de estado (channel), según el ADR de capas.

### 2. Página y formulario separados

- **Decisión**: `src/pages/login-page.ts` (PageController) compone el formulario; `src/components/login-form/` contiene el formulario reutilizable (email, contraseña, validación). El formulario usa `finap-input` y `finap-button`.
- **Racional**: el formulario es testeable de forma aislada de la página/ruta.

### 3. Validación y errores

- **Decisión**: validación en el cliente (email con formato, campos requeridos) antes de llamar al servicio; los errores del servidor se muestran como mensaje del formulario.
- **Racional**: feedback inmediato y mensajes claros (guía de escritura de `frontend-design`).

### 4. Guard y redirecciones

- **Decisión**: el interceptor de `appConfig` (change `app-shell`) consulta `session.ts`: sin sesión → `/login` (o `/`); con sesión → `/dashboard`. Tras login correcto → `/dashboard`; tras logout → `/`.
- **Racional**: integración limpia con el router.

### 5. Tests

- **Decisión**: tests de `auth-service` (mock del cliente), `session` (persistencia/restauración) y `login-form` (validación y submit), con `fixture`.
- **Racional**: cubre los escenarios del spec sin backend real.

## Goals / Non-Goals

**Goals**: login, sesión persistida y logout.
**Non-Goals**: registro de usuario, recuperación de contraseña, OAuth (futuro).

## Risks / Trade-offs

- **[Riesgo] Token en `localStorage` (XSS)** → Aceptado para el alcance; a futuro valorar cookies httpOnly.
- **[Trade-off] Sin refresh token** → Se puede añadir después; la sesión se revalida con `/auth/session`.
