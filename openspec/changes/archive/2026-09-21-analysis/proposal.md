# Proposal

## Why

Los mockups incluyen la sección "Análisis" en la navegación. Falta la vista de análisis con gráficas y métricas del periodo, que da valor más allá del resumen del dashboard. El README ya prevé Chart.js envuelto en un web component.

## What Changes

- **Página de análisis** (`/analysis`) con métricas y gráficas del periodo.
- **Gráficas**: evolución de ingresos/gastos (línea/área), gastos por categoría (circular o barras) y comparación con el periodo anterior.
- **Selector de periodo** (mes/trimestre/año) y filtros de tipo.
- **Componente de gráfica** `finap-chart` envolviendo Chart.js, reactivo al tema (light/dark).

## Capabilities

### New Capabilities

- `analysis`: página de análisis con métricas y gráficas del periodo.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/pages/analysis-page.ts`, `src/components/finap-chart/`, `src/components/analysis/`, `src/services/analysis-service.ts`.
- **Dependencia nueva**: `chart.js`.
- **Depende de**: `app-shell`, `design-system-extensions`, `api-contracts`.
