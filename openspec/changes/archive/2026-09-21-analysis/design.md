# Design

## Context

Ver `proposal.md` y los contratos `/analysis/summary` y `/analysis/by-category` en `api-contracts`. El README prevé Chart.js envuelto en un componente.

## Decisions

### 1. `finap-chart` envolviendo Chart.js

- **Decisión**: componente `finap-chart` que instancia Chart.js sobre un `<canvas>` en el shadow root, acepta `type`, `data` y `options`, y se destruye en `disconnectedCallback`. Escucha `finap-theme-changed` para recolorear.
- **Alternativas**: usar SVG propio. Se descarta; Chart.js ya está previsto y ahorra trabajo.
- **Racional**: un componente de gráfica reutilizable y testeable.

### 2. Página con secciones

- **Decisión**: `analysis-page` con `analysis-metrics`, `finap-chart` (evolución) y `finap-chart` (categorías); selector de periodo como control segmentado.
- **Racional**: componer secciones reutilizables.

### 3. Paleta de gráficas desde tokens

- **Decisión**: las series usan colores de los tokens semánticos (ingreso/gasto) leídos de `getComputedStyle` en tiempo de render, para respetar el tema.
- **Racional**: coherencia con el design system y el modo oscuro.

### 4. Datos

- **Decisión**: `src/services/analysis-service.ts` (`getSummary(period)`, `getByCategory(period)`).
- **Racional**: separación de capas.

## Goals / Non-Goals

**Goals**: análisis visual del periodo.
**Non-Goals**: predicciones/forecast (futuro).

## Risks / Trade-offs

- **[Riesgo] Chart.js en tests (canvas en happy-dom)** → Se testea el componente/opciones con un mock de Chart.js; el render visual se valida en navegador.
- **[Trade-off] Colores leídos en runtime** → Requiere un re-render al cambiar el tema (ya soportado por el evento).
