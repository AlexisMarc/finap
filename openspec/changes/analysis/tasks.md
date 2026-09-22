# Tasks

## 1. Datos y gráfica

- [x] 1.1 Añadir `chart.js` y crear `src/components/finap-chart/` (canvas, type/data/options, destrucción, re-tema) con test (Chart mockeado); verificar que pasa
- [x] 1.2 Crear `src/services/analysis-service.ts` (`getSummary`, `getByCategory`) con test; verificar que pasa

## 2. Página

- [x] 2.1 Crear `analysis-metrics` (métricas + variación) con test; verificar que pasa
- [x] 2.2 Crear `src/pages/analysis-page.ts` (selector de periodo + métricas + gráficas) con test; verificar que pasa

## 3. Validación

- [x] 3.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 3.2 Ejecutar `npm run build` y confirmar que compila
- [x] 3.3 Ejecutar `openspec validate analysis --strict` y confirmar que valida
