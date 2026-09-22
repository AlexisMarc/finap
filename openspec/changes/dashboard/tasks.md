# Tasks

## 1. Datos

- [x] 1.1 Crear `src/services/dashboard-service.ts` (`getDashboard(month)`) con test (cliente mockeado); verificar que pasa
- [x] 1.2 Formatear importes/fechas con `Intl` + i18n; verificar con test de formato

## 2. Secciones

- [x] 2.1 Crear `dashboard-summary` (saludo + balance + stats) con test; verificar que pasa
- [x] 2.2 Crear `dashboard-categories` (desglose por categoría) con test; verificar que pasa
- [x] 2.3 Crear `dashboard-debts` (deudas con progreso) con test; verificar que pasa
- [x] 2.4 Crear `dashboard-recent` (últimos movimientos + "Ver todos") con test; verificar que pasa

## 3. Página e integración

- [x] 3.1 Crear `src/pages/dashboard-page.ts` (PageController, estados loading/empty/error) con test; verificar que pasa
- [x] 3.2 Verificar la ruta `/dashboard` en el shell y la navegación; verificar con test/`npm run dev`

## 4. Validación

- [x] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 4.2 Ejecutar `npm run build` y confirmar que compila
- [x] 4.3 Ejecutar `openspec validate dashboard --strict` y confirmar que valida
