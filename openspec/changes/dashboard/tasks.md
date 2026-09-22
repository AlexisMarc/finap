# Tasks

## 1. Datos

- [ ] 1.1 Crear `src/services/dashboard-service.ts` (`getDashboard(month)`) con test (cliente mockeado); verificar que pasa
- [ ] 1.2 Formatear importes/fechas con `Intl` + i18n; verificar con test de formato

## 2. Secciones

- [ ] 2.1 Crear `dashboard-summary` (saludo + balance + stats) con test; verificar que pasa
- [ ] 2.2 Crear `dashboard-categories` (desglose por categoría) con test; verificar que pasa
- [ ] 2.3 Crear `dashboard-debts` (deudas con progreso) con test; verificar que pasa
- [ ] 2.4 Crear `dashboard-recent` (últimos movimientos + "Ver todos") con test; verificar que pasa

## 3. Página e integración

- [ ] 3.1 Crear `src/pages/dashboard-page.ts` (PageController, estados loading/empty/error) con test; verificar que pasa
- [ ] 3.2 Verificar la ruta `/dashboard` en el shell y la navegación; verificar con test/`npm run dev`

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate dashboard --strict` y confirmar que valida
