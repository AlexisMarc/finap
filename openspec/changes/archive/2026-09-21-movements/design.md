# Design

## Context

Ver `proposal.md`, mockups y el contrato `GET /transactions` (filtros `type`, `categoryId`, `from`, `to`, `search`, `page`, `pageSize`) en `api-contracts`.

## Decisions

### 1. Servicio y estados

- **Decisión**: `src/services/transactions-service.ts` con `list(params)` y `getById`. La página mantiene el estado de filtros/orden y hace requests con debounce en la búsqueda.
- **Racional**: centraliza el acceso a datos y evita request storms.

### 2. Filtros como componentes

- **Decisión**: `movements-filters` (chips de tipo, select de categoría, rango de fechas, búsqueda) y `movements-list` (filas con `finap-list-item`), con tests.
- **Racional**: aislar y testear filtros y lista.

### 3. Paginación

- **Decisión**: paginación por scroll infinito o botón "Cargar más" (`page`/`pageSize`); se descarta el paginador clásico por simplicidad en mobile.
- **Racional**: coherente con el mockup mobile.

### 4. Reutilización

- **Decisión**: la fila de movimiento reutiliza `finap-list-item`; los filtros usan `finap-chip`/`finap-select`.
- **Racional**: reutilización del design system.

## Goals / Non-Goals

**Goals**: listar, filtrar, buscar y ordenar movimientos.
**Non-Goals**: crear/editar (va en `transactions`).

## Risks / Trade-offs

- **[Riesgo] Scroll infinito + accesibilidad** → Incluir botón "Cargar más" visible además del scroll.
- **[Trade-off] Filtros en URL vs estado** → Se mantiene en estado; sincronizar con query params queda como mejora.
