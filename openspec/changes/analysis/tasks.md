# Tasks

## 1. Datos y gráfica

- [ ] 1.1 Añadir `chart.js` y crear `src/components/finap-chart/` (canvas, type/data/options, destrucción, re-tema) con test (Chart mockeado); verificar que pasa
- [ ] 1.2 Crear `src/services/analysis-service.ts` (`getSummary`, `getByCategory`) con test; verificar que pasa

## 2. Página

- [ ] 2.1 Crear `analysis-metrics` (métricas + variación) con test; verificar que pasa
- [ ] 2.2 Crear `src/pages/analysis-page.ts` (selector de periodo + métricas + gráficas) con test; verificar que pasa

## 3. Validación

- [ ] 3.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 3.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 3.3 Ejecutar `openspec validate analysis --strict` y confirmar que valida
