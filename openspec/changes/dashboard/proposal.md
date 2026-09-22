# Proposal

## Why

El dashboard (Inicio) es la pantalla principal tras iniciar sesión, según los mockups: saludo, balance total, estadísticas del mes, gastos por categoría, deudas pendientes y últimos movimientos. Hoy no existe.

## What Changes

- **Página dashboard** (`/dashboard`) que consume `GET /dashboard` (contrato en `api-contracts`).
- **Secciones**: saludo personalizado; balance total con variación; tarjetas de estadística (ingresos, gastos, deudas); gastos por categoría; deudas pendientes con progreso; últimos movimientos.
- **Componentes**: usa `app-components` (`stat-card`, `list-item`, `progress`, `chip`, `avatar`) y los componentes base.
- **Estados**: carga, vacío y error.

## Capabilities

### New Capabilities

- `dashboard`: página de inicio con resumen financiero, categorías, deudas y movimientos recientes.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/dashboard-page.ts`, `src/components/dashboard/` (secciones).
- **Modificado**: `src/router/routes.ts` (ruta ya prevista en `app-shell`), `src/services/dashboard-service.ts`.
- **Depende de**: `app-shell`, `design-system-extensions`, `api-contracts`.
