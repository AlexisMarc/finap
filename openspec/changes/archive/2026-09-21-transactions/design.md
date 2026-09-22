# Design

## Context

Ver `proposal.md`, el modal "Nuevo registro" del mockup desktop y los contratos `POST/PATCH/DELETE /transactions` en `api-contracts`.

## Decisions

### 1. Formulario reutilizable en modal

- **Decisión**: `transaction-form` es un componente reutilizable (crear/editar) que se monta dentro de `finap-modal`. El shell lo abre con "Agregar"; movimientos lo abre para editar.
- **Racional**: un solo formulario para alta y edición; reutilización.

### 2. Tipo segmentado

- **Decisión**: el tipo (Gasto/Ingreso/Deuda) se elige con un control segmentado (reutiliza `finap-chip` o botones), por defecto "Gasto" como en el mockup.
- **Racional**: coincide con el mockup y reduce errores.

### 3. Validación

- **Decisión**: validación en cliente (importe > 0, categoría requerida, fecha válida) con `finap-input`; la fecha por defecto es hoy.
- **Racional**: feedback inmediato.

### 4. Sincronización de estado

- **Decisión**: tras crear/editar/borrar, el service emite a un canal de Open Cells (p.ej. `transactions-changed`) que dashboard y movimientos escuchan para refrescar.
- **Alternativas**: recargar toda la página. Se descarta.
- **Racional**: refresco reactivo y desacoplado.

### 5. Confirmación de borrado

- **Decisión**: `confirm-dialog` (basado en `finap-modal`) para confirmar el borrado.
- **Racional**: evita borrados accidentales.

## Goals / Non-Goals

**Goals**: crear, editar y borrar movimientos.
**Non-Goals**: adjuntos o recurrencias (futuro).

## Risks / Trade-offs

- **[Riesgo] Offline** → Los cambios se encolan cuando `pwa-offline` esté; por ahora requieren conexión.
- **[Trade-off] Un solo formulario para 3 tipos** → Campos comunes; los específicos se añaden si hacen falta.
