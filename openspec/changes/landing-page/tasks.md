# Tasks

## 1. Dependencias

- [x] 1.1 Confirmar que la landing usa solo `@open-cells/core` (sin `@open-cells/page-controller`, diferido por packaging — ver design.md); verificar que no queda la dependencia en `package.json`

## 2. Paleta de marca

- [x] 2.1 Añadir el token `--finap-gradient-brand` (rojo → naranja → amarillo) en `src/tokens/tokens.css`; verificar que un test valida el token y los tres colores
- [x] 2.2 Cambiar la variante `secondary` de `finap-button` a naranja (`--finap-color-secondary`) en `src/components/button/styles.ts`; verificar que los tests de botón pasan

## 3. Bootstrap y rutas

- [x] 3.1 Crear `src/router/routes.ts` con la ruta `landing` (`/` → `landing-page`, con `action` lazy import); verificar que un test valida nombre, path y componente
- [x] 3.2 Crear `src/components/app-index.ts` que llama a `startApp({ mainNode: 'app', routes })`; verificar que un test valida la configuración (mainNode y ruta raíz)
- [x] 3.3 Actualizar `src/main.ts` para importar estilos globales, ejecutar `initTheme()` e importar `app-index`; verificar que `npm run dev` arranca sin errores
- [x] 3.4 Actualizar `index.html` para dejar solo el contenedor `#app` (quitar la demo estática); verificar que la SPA arranca y muestra la landing

## 4. Landing page y marca

- [x] 4.1 Crear `src/components/brand-mark.ts` (círculos solapados estilo Mastercard con los colores de marca) con su `index.test.ts`; verificar que el test de brand-mark pasa
- [x] 4.2 Crear `src/pages/landing-page.ts` (PageController) con hero, features y footer usando componentes base; verificar que el test de landing pasa
- [x] 4.3 Aplicar el gradiente de marca en el hero y reveal on scroll en las secciones; verificar que el test cubre hero con gradiente y animaciones con `prefers-reduced-motion`

## 5. Tests

- [x] 5.1 Test de `landing-page`: hero, features, footer y presencia de los tres colores de marca; verificar que pasa
- [x] 5.2 Test de `routes.ts` y `app-index.ts` (configuración del bootstrap); verificar que pasa

## 6. Validación

- [x] 6.1 Ejecutar `npm run test` y confirmar que toda la suite pasa sin fallos
- [x] 6.2 Ejecutar `npm run build` y confirmar que el build de producción compila sin errores
- [x] 6.3 Ejecutar `openspec validate landing-page --strict` y confirmar que el change valida correctamente
