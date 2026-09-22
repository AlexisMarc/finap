# Tasks

## 1. Servicio

- [ ] 1.1 Ampliar `src/services/transactions-service.ts` con `create`, `update`, `remove` y test; verificar que pasa

## 2. Componentes

- [ ] 2.1 Crear `src/components/transaction-form/` (tipo, importe, categoría, fecha, nota, validación, estados) con test; verificar que pasa
- [ ] 2.2 Crear `src/components/confirm-dialog/` (basado en `finap-modal`) con test; verificar que pasa

## 3. Integración

- [ ] 3.1 Conectar "Agregar" del shell con el formulario en modal; verificar con test/`npm run dev`
- [ ] 3.2 Añadir editar/borrar en `movements` (con confirmación); verificar con test
- [ ] 3.3 Emitir el canal `transactions-changed` y refrescar dashboard/movimientos; verificar con test

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate transactions --strict` y confirmar que valida
