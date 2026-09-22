# Proposal

## Why

El roadmap del proyecto incluye categorías y presupuestos, y el dashboard/movimientos dependen de categorías. Los mockups muestran categorías (Vivienda, Alimentación, Transporte, Ocio, Otros) con porcentajes, lo que implica presupuestos por categoría. Faltan las vistas de gestión.

## What Changes

- **Categorías**: listado y CRUD (crear, editar, eliminar) con nombre, color e icono.
- **Presupuestos**: límite por categoría y mes, con progreso de gasto y aviso de exceso.
- **Página de gestión** en Ajustes (o sección propia) accesible desde la navegación.

## Capabilities

### New Capabilities

- `categories-budgets`: gestión de categorías y presupuestos por categoría con progreso.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/categories-page.ts`, `src/pages/budgets-page.ts`, `src/components/category-form/`, `src/components/budget-item/`, `src/services/categories-service.ts`, `src/services/budgets-service.ts`.
- **Depende de**: `app-shell`, `design-system-extensions`, `api-contracts`.
