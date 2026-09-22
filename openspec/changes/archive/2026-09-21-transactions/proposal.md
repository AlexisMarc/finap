# Proposal

## Why

El mockup incluye el modal "Nuevo registro" (Gasto/Ingreso/Deuda, Importe, Categoría, Fecha, Nota, Cancelar/Guardar) lanzado desde "Agregar" del header. Es el alta de movimientos, esencial para que la app tenga datos. Falta la creación, edición y borrado de movimientos.

## What Changes

- **Formulario de registro** reutilizable: tipo (segmentado Gasto/Ingreso/Deuda), importe, categoría, fecha y nota, con validación.
- **Alta desde el shell**: "Agregar" abre un `finap-modal` con el formulario.
- **Edición y borrado**: editar un movimiento existente y eliminarlo con confirmación.
- **Sincronización**: al guardar, se refrescan dashboard y movimientos.

## Capabilities

### New Capabilities

- `transactions`: alta, edición y borrado de movimientos mediante formulario.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/components/transaction-form/`, `src/components/confirm-dialog/`.
- **Modificado**: `src/services/transactions-service.ts` (create/update/remove), `app-shell` (acción Agregar), `movements` (editar/borrar).
- **Depende de**: `design-system-extensions` (`finap-input`, `finap-select`, `finap-modal`), `api-contracts`.
