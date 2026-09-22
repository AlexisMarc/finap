# Proposal

## Why

Los mockups incluyen la sección Movimientos (nav) y "Últimos movimientos" con "Ver todos". Falta la vista completa de movimientos con filtros y búsqueda, necesaria para consultar y gestionar las transacciones.

## What Changes

- **Página de movimientos** (`/movements`) con listado paginado.
- **Filtros**: por tipo (ingreso/gasto/deuda), categoría y rango de fechas.
- **Búsqueda** por texto (nota/categoría).
- **Ordenación** por fecha e importe.
- **Estados** de carga, vacío y error.

## Capabilities

### New Capabilities

- `movements`: listado de movimientos con filtros, búsqueda, ordenación y paginación.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/movements-page.ts`, `src/components/movements/` (filtros, lista, fila), `src/services/transactions-service.ts`.
- **Depende de**: `app-shell`, `design-system-extensions`, `api-contracts`.
