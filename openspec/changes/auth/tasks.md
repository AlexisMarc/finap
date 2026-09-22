# Tasks

## 1. Infraestructura

- [x] 1.1 Crear `src/services/auth-service.ts` (login/logout/getSession) con test (cliente mockeado); verificar que pasa
- [x] 1.2 Crear `src/state/session.ts` (token/usuario, persistencia y restauración) con test; verificar que pasa

## 2. UI

- [x] 2.1 Crear `src/components/login-form/` (email, contraseña, validación, errores) con test; verificar que pasa
- [x] 2.2 Crear `src/pages/login-page.ts` que compone el formulario con test; verificar que pasa

## 3. Integración

- [x] 3.1 Añadir la ruta `/login` y conectar el guard (sin sesión → login; con sesión → dashboard); verificar con test de redirección
- [x] 3.2 Conectar el logout del menú de usuario (`app-shell`) con `auth-service`; verificar que cierra sesión y redirige

## 4. Validación

- [x] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 4.2 Ejecutar `npm run build` y confirmar que compila
- [x] 4.3 Ejecutar `openspec validate auth --strict` y confirmar que valida
