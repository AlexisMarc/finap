# Tasks

## 1. Servicios

- [x] 1.1 Crear `src/services/categories-service.ts` (list/create/update/remove) con test; verificar que pasa
- [x] 1.2 Crear `src/services/budgets-service.ts` (list/create/update/remove) con test; verificar que pasa

## 2. Componentes

- [x] 2.1 Crear `category-form` (nombre, color, icono) con test; verificar que pasa
- [x] 2.2 Crear `budget-item` (límite, gasto, progreso, aviso de exceso) con test; verificar que pasa

## 3. Páginas e integración

- [x] 3.1 Crear `src/pages/categories-page.ts` (listado + CRUD) con test; verificar que pasa
- [x] 3.2 Crear `src/pages/budgets-page.ts` (límites y progreso) con test; verificar que pasa
- [x] 3.3 Enlazar desde Ajustes/nav y refrescar al cambiar; verificar con test/`npm run dev`

## 4. Validación

- [x] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 4.2 Ejecutar `npm run build` y confirmar que compila
- [x] 4.3 Ejecutar `openspec validate categories-budgets --strict` y confirmar que valida
