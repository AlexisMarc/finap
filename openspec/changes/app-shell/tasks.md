# Tasks

## 1. Shell y navegación

- [x] 1.1 Crear `src/components/app-shell/` con layout responsivo (sidebar/bottom nav/header/slot) y test; verificar que el test del shell pasa
- [x] 1.2 Crear la navegación data-driven (secciones + ruta activa) y su test; verificar que valida `aria-current`
- [x] 1.3 Crear `src/components/user-menu/` (avatar + cerrar sesión) con test; verificar que pasa

## 2. Rutas y guard

- [x] 2.1 Ampliar `src/router/routes.ts` con las páginas de la app (lazy import) y su test; verificar que valida las rutas
- [x] 2.2 Implementar el guard de sesión con el `interceptor` de `appConfig`; verificar con test de redirección (sin/con sesión)
- [x] 2.3 Integrar el shell en el arranque (`index.html`/`main.ts`); verificar que `npm run dev` muestra el shell y navega

## 3. Validación

- [x] 3.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 3.2 Ejecutar `npm run build` y confirmar que el build compila
- [x] 3.3 Ejecutar `openspec validate app-shell --strict` y confirmar que valida
