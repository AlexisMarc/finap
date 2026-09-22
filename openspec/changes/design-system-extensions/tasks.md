# Tasks

## 1. Tokens

- [x] 1.1 Añadir `@fontsource` (Inter + Sora) y los tokens `--finap-font-family` / `--finap-font-family-display`; verificar que los tests de tipografía pasan
- [x] 1.2 Añadir tokens semánticos (`--finap-color-income/expense/debt/accent-2`) en `tokens.css` y sus variantes en `theme.css`; verificar test de tokens/contraste
- [x] 1.3 Añadir escala de radios (`sm/md/lg/xl`) y `--finap-shadow-modal`; verificar test de tokens

## 2. Componentes de app

- [x] 2.1 Implementar `finap-stat-card` con test; verificar que pasa
- [x] 2.2 Implementar `finap-list-item` con test; verificar que pasa
- [x] 2.3 Implementar `finap-progress` con test; verificar que pasa
- [x] 2.4 Implementar `finap-chip` con test; verificar que pasa
- [x] 2.5 Implementar `finap-avatar` con test; verificar que pasa
- [x] 2.6 Implementar `finap-input` (texto/número/fecha/textarea + error) con test; verificar que pasa
- [x] 2.7 Implementar `finap-select` con test; verificar que pasa
- [x] 2.8 Implementar `finap-modal` (diálogo, Escape, foco) con test; verificar que pasa

## 3. Validación

- [x] 3.1 Ejecutar `npm run test` y confirmar que toda la suite pasa sin fallos
- [x] 3.2 Ejecutar `npm run build` y confirmar que el build compila sin errores
- [x] 3.3 Ejecutar `openspec validate design-system-extensions --strict` y confirmar que el change valida correctamente
