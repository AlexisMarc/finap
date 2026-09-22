# Tasks

## 1. Servicio

- [ ] 1.1 Crear `src/services/user-service.ts` (`getProfile`, `updateProfile`) con test; verificar que pasa

## 2. Secciones

- [ ] 2.1 Crear `settings-profile` (nombre/email/avatar) con test; verificar que pasa
- [ ] 2.2 Crear `settings-preferences` (tema, idioma, moneda) con test; verificar que pasa
- [ ] 2.3 Crear `settings-session` (cerrar sesión) con test; verificar que pasa

## 3. Página e integración

- [ ] 3.1 Crear `src/pages/settings-page.ts` (secciones + accesos a categorías/presupuestos) con test; verificar que pasa
- [ ] 3.2 Aplicar la moneda al formateo global; verificar con test de formato

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate settings --strict` y confirmar que valida
