# Tasks

## 1. Infraestructura

- [ ] 1.1 Crear `src/services/auth-service.ts` (login/logout/getSession) con test (cliente mockeado); verificar que pasa
- [ ] 1.2 Crear `src/state/session.ts` (token/usuario, persistencia y restauración) con test; verificar que pasa

## 2. UI

- [ ] 2.1 Crear `src/components/login-form/` (email, contraseña, validación, errores) con test; verificar que pasa
- [ ] 2.2 Crear `src/pages/login-page.ts` que compone el formulario con test; verificar que pasa

## 3. Integración

- [ ] 3.1 Añadir la ruta `/login` y conectar el guard (sin sesión → login; con sesión → dashboard); verificar con test de redirección
- [ ] 3.2 Conectar el logout del menú de usuario (`app-shell`) con `auth-service`; verificar que cierra sesión y redirige

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate auth --strict` y confirmar que valida
