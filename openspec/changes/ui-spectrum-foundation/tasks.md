# Tasks

## 1. Dependencias y tema raíz

- [ ] 1.1 Añadir `@spectrum-web-components/theme`, `styles`, `button`, `icon` y `@spectrum-icons/workflow` a package.json y verificar que `npm install` completa sin errores
- [ ] 1.2 Envolver la app en `<sp-theme scale="medium" color="light">` en `src/components/app-index.ts` y verificar que la app carga con `npm run dev` sin errores de consola
- [ ] 1.3 Actualizar `src/theme/` para que el toggle cambie el atributo `color` del `sp-theme` (manteniendo persistencia y `prefers-color-scheme`); verificar con el unit test de theme-toggle y el E2E de tema de landing

## 2. Tokens alias y tipografía

- [ ] 2.1 Crear alias `--finap-*` → `--spectrum-*` en `src/tokens/` y ajustar los tokens semánticos (ingreso/gasto/deuda, gradiente de marca) sobre la paleta Spectrum; verificar con los unit tests de tokens y contraste (WCAG AA)
- [ ] 2.2 Adoptar la tipografía de Spectrum (estilos + fuente) y retirar `@fontsource-variable/inter` y `sora`; verificar con `src/tokens/typography.test.ts` y `npm run build`
- [ ] 2.3 Comprobar smoke E2E (landing + auth) con `npx playwright test e2e/landing.spec.ts e2e/auth.spec.ts` y verificar que pasa

## 3. Componentes base sobre Spectrum

- [ ] 3.1 Migrar `finap-button` a `<sp-button>` mapeando variantes y verificar con su unit test (variantes, disabled, teclado)
- [ ] 3.2 Migrar `finap-heading` y `finap-text` a la tipografía Spectrum manteniendo su API; verificar unit tests existentes
- [ ] 3.3 Migrar `finap-card` y `finap-container` a superficies Spectrum; verificar unit tests existentes
- [ ] 3.4 Migrar `finap-icon` a workflow icons de Spectrum con fallback para nombres desconocidos; verificar unit tests (nombre conocido y desconocido)
- [ ] 3.5 Smoke E2E completo (`npx playwright test e2e/dashboard.spec.ts e2e/settings.spec.ts e2e/movements.spec.ts`) y verificar que pasa

## 4. Validación de fase

- [ ] 4.1 `npm test` en verde (con ajustes mínimos de tests de base) y `npm run build` compila
- [ ] 4.2 `openspec validate ui-spectrum-foundation --strict` valida
