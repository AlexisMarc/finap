# Tasks

## 1. Datos

- [x] 1.1 Crear `src/services/transactions-service.ts` (`list`, `getById`) con test (cliente mockeado); verificar que pasa

## 2. Componentes

- [x] 2.1 Crear `movements-filters` (tipo, categoría, fechas, búsqueda) con test; verificar que pasa
- [x] 2.2 Crear `movements-list` (filas con `finap-list-item`) con test; verificar que pasa

## 3. Página e integración

- [x] 3.1 Crear `src/pages/movements-page.ts` (filtros + lista + paginación + estados) con test; verificar que pasa
- [x] 3.2 Conectar "Ver todos" del dashboard y el estado de ruta del shell; verificar con test/`npm run dev`

## 4. Validación

- [x] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 4.2 Ejecutar `npm run build` y confirmar que compila
- [x] 4.3 Ejecutar `openspec validate movements --strict` y confirmar que valida
