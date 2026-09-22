# Design

## Context

Ver `proposal.md`, el bloque de deudas del mockup y el contrato `/debts` en `api-contracts`.

## Decisions

### 1. Servicio y modelos

- **Decisión**: `src/services/debts-service.ts` (`list`, `create`, `update`, `remove`, `registerPayment`). El progreso se calcula como `paid / total`.
- **Racional**: centraliza la lógica de deudas.

### 2. Componentes

- **Decisión**: `debt-item` (nombre, pendiente, `finap-progress`, fecha límite) y `debt-form` (crear/editar), más un formulario compacto de pago (importe).
- **Racional**: reutilización y tests por componente.

### 3. Página

- **Decisión**: `debts-page` muestra el total pendiente, la lista y la acción de añadir; estados loading/empty/error.
- **Racional**: coherente con las demás páginas.

### 4. Actualizaciones

- **Decisión**: tras registrar un pago o editar, se emite `debts-changed` para refrescar el resumen del dashboard.
- **Racional**: coherencia de datos entre vistas.

## Goals / Non-Goals

**Goals**: gestionar y seguir deudas.
**Non-Goals**: amortización con intereses/cuotas automáticas (futuro).

## Risks / Trade-offs

- **[Riesgo] Cálculo de progreso** → Se centraliza en el service para evitar inconsistencias.
- **[Trade-off] Sin calendario de pagos** → Se registra pago manual; se puede ampliar.
