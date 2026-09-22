# Tasks

## 1. Servicio

- [x] 1.1 Crear `src/services/debts-service.ts` (list/create/update/remove/registerPayment) con test; verificar que pasa

## 2. Componentes

- [x] 2.1 Crear `debt-item` (nombre, pendiente, progreso, fecha) con test; verificar que pasa
- [x] 2.2 Crear `debt-form` (crear/editar + registro de pago) con test; verificar que pasa

## 3. Página e integración

- [x] 3.1 Crear `src/pages/debts-page.ts` (total pendiente + lista + estados) con test; verificar que pasa
- [x] 3.2 Emitir `debts-changed` y refrescar el dashboard; verificar con test

## 4. Validación

- [x] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 4.2 Ejecutar `npm run build` y confirmar que compila
- [x] 4.3 Ejecutar `openspec validate debts --strict` y confirmar que valida
