# Design

## Context

Ver `proposal.md`, los mockups (`mockup/Finap PWA Desktop-export.html`, `Finap Mobile App-export.html`) y el contrato `GET /dashboard` en `api-contracts`.

## Decisions

### 1. Una sola carga agregada

- **Decisión**: `dashboard-page` obtiene `GET /dashboard?month` (un solo request) vía `src/services/dashboard-service.ts`; si falla, muestra error con reintento.
- **Alternativas**: componer con varias llamadas (accounts, transactions, debts...). Se descarta por simplicidad y rendimiento.
- **Racional**: menos latencia y estados más simples.

### 2. Secciones como componentes

- **Decisión**: secciones (`dashboard-summary`, `dashboard-categories`, `dashboard-debts`, `dashboard-recent`) como componentes en `src/components/dashboard/`, cada uno con su test.
- **Racional**: reutilizables y testeables por separado.

### 3. Datos y estado

- **Decisión**: la página usa `PageController.onPageEnter` para cargar datos; los estados (loading/error/empty) son propiedades reactivas. Los importes se formatean con `Intl.NumberFormat` según `currency`.
- **Racional**: ciclo de vida de Open Cells + i18n/formato local.

### 4. Responsivo

- **Decisión**: grid de 1 columna en móvil y varias en escritorio (breakpoints del design system), replicando el layout del mockup.
- **Racional**: mismo contenido en mobile y desktop.

## Goals / Non-Goals

**Goals**: dashboard funcional con datos del contrato.
**Non-Goals**: análisis avanzado (va en `analysis`); el asistente IA (va en `ai-assistant`).

## Risks / Trade-offs

- **[Riesgo] Endpoint `/dashboard` no exista** → El service puede componer con los otros endpoints como fallback.
- **[Trade-off] Gráfica de categorías** → En dashboard se usa progreso/lista; la gráfica circular va en `analysis`.
