# Proposal

## Why

Los mockups incluyen la sección "Deudas" en la navegación y un resumen de deudas con progreso (Préstamo auto 65%, Préstamo personal 90%, Préstamo estudio 40%). Falta la vista completa de deudas para gestionar y seguir el pago.

## What Changes

- **Página de deudas** (`/debts`) con listado, total pendiente y progreso de cada deuda.
- **Alta/edición/borrado** de deudas (nombre, total, pagado, fecha límite opcional).
- **Registro de pagos** que reduce el pendiente y actualiza el progreso.
- **Estados** de carga, vacío y error.

## Capabilities

### New Capabilities

- `debts`: listado, gestión y seguimiento del pago de deudas.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/debts-page.ts`, `src/components/debt-form/`, `src/components/debt-item/`, `src/services/debts-service.ts`.
- **Depende de**: `app-shell`, `design-system-extensions` (`finap-progress`), `api-contracts`.
