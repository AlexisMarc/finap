# Tasks

## 1. Servicios

- [ ] 1.1 Crear `src/services/categories-service.ts` (list/create/update/remove) con test; verificar que pasa
- [ ] 1.2 Crear `src/services/budgets-service.ts` (list/create/update/remove) con test; verificar que pasa

## 2. Componentes

- [ ] 2.1 Crear `category-form` (nombre, color, icono) con test; verificar que pasa
- [ ] 2.2 Crear `budget-item` (límite, gasto, progreso, aviso de exceso) con test; verificar que pasa

## 3. Páginas e integración

- [ ] 3.1 Crear `src/pages/categories-page.ts` (listado + CRUD) con test; verificar que pasa
- [ ] 3.2 Crear `src/pages/budgets-page.ts` (límites y progreso) con test; verificar que pasa
- [ ] 3.3 Enlazar desde Ajustes/nav y refrescar al cambiar; verificar con test/`npm run dev`

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate categories-budgets --strict` y confirmar que valida
