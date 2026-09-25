# Tasks

## 1. Unit tests

- [ ] 1.1 Actualizar los tests de tokens/contraste/tipografía a los valores Spectrum (alias y WCAG AA) y verificar que pasan con `npx vitest run src/tokens src/theme`
- [ ] 1.2 Actualizar los tests de componentes base (button, heading, text, card, container, icon, theme-toggle) al contrato Spectrum y verificar que pasan
- [ ] 1.3 Actualizar los tests de componentes de app (input, select, chip, avatar, progress, modal, confirm-dialog, stat-card, list-item) al contrato Spectrum y verificar que pasan
- [ ] 1.4 Ejecutar `npm test` y dejar toda la suite unitaria en verde

## 2. E2E

- [ ] 2.1 Ejecutar `npm run test:e2e` y listar los fallos por cambio de estructura (pickers, diálogos, placeholders)
- [ ] 2.2 Ajustar los selectores rotos manteniendo aserciones por rol/texto; verificar que los flujos de crear/editar/eliminar (movimientos, categorías, deudas) y "Agregar" pasan
- [ ] 2.3 Ejecutar la suite E2E completa y dejarla en verde

## 3. PWA y bundle

- [ ] 3.1 Revisar el precache de workbox (fuentes/assets de Spectrum) y verificar `npm run build` genera el manifest con los nuevos assets
- [ ] 3.2 Medir el tamaño del build; si supera el umbral, optimizar imports (individuales/icons bajo demanda) y repetir la medición

## 4. Limpieza y validación final

- [ ] 4.1 Retirar dependencias sin uso tras la migración (fuentes antiguas, iconos custom) y verificar `npm ci && npm run build`
- [ ] 4.2 Verificación final: `npm test`, `npm run build` y `npm run test:e2e` en verde
- [ ] 4.3 `openspec validate ui-spectrum-verification --strict` valida
