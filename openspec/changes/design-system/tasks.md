# Tasks

## 1. Scaffold y tooling

- [x] 1.1 Crear `package.json`, `tsconfig.json` y `vite.config.ts` con TypeScript estricto; verificar que `npm install` y `npm run dev` arrancan sin errores
- [x] 1.2 Añadir dependencias `lit`, `@open-cells/core`, `vite`, `typescript`, `vitest` y `happy-dom`; verificar que quedan instaladas y bloqueadas en el lockfile
- [x] 1.3 Configurar `vitest` (entorno `happy-dom`) y añadir el script `npm run test`; verificar que un test de humo trivial pasa
- [x] 1.4 Crear la estructura de directorios `src/tokens`, `src/theme`, `src/motion`, `src/components`; verificar que los archivos esperados están en su lugar

## 2. Tokens de diseño

- [x] 2.1 Crear `src/tokens/tokens.css` con la paleta de color (primarios naranja/rojo, neutros), espaciado, radios, elevación y breakpoints como variables `--finap-*`; verificar que un test lee y valida la presencia de los tokens clave
- [x] 2.2 Crear `src/tokens/typography.css` con la escala tipográfica (tamaño/peso/interlineado) como variables `--finap-*`; verificar que el test de tokens tipográficos pasa
- [x] 2.3 Crear `src/tokens/motion.css` con duraciones y easings como variables `--finap-motion-*`; verificar que el test de tokens de motion pasa
- [x] 2.4 Crear `src/theme/theme.css` con overrides de tema claro/oscuro bajo `[data-theme="dark"]` y `@media (prefers-color-scheme: dark)`; verificar que el contraste texto/fondo cumple WCAG AA en ambos temas (test de contraste)

## 3. Tema

- [x] 3.1 Implementar `src/theme/theme.ts` para alternar `data-theme` en `<html>`, resolver la preferencia del sistema y persistir en `localStorage`; verificar que los tests de tema cubren: por defecto claro, cambio a oscuro y respeto de `prefers-color-scheme`
- [x] 3.2 Añadir el script de importación global de tokens y theme en el entry de la app; verificar que las variables `--finap-*` están disponibles en un componente renderizado

## 4. Motion

- [x] 4.1 Crear `src/motion/motion.css` con keyframes de fade y slide y clases de entrada; verificar que un test comprueba que las clases aplican las animaciones esperadas
- [x] 4.2 Implementar el reveal on scroll con `IntersectionObserver` (ReactiveController de Lit) en `src/motion/reveal.ts`; verificar que el test de reveal cubre el caso "dentro del viewport" y "fuera del viewport"
- [x] 4.3 Añadir reglas `@media (prefers-reduced-motion: reduce)` que desactivan las animaciones; verificar que el test de reduced-motion confirma que no se ejecutan

## 5. Componentes base

- [x] 5.1 Implementar `<finap-button>` (variantes primaria/secundaria/texto, `disabled`, activación por teclado) con su `index.test.ts`; verificar que los tests de botón pasan
- [x] 5.2 Implementar `<finap-card>` con slot y elevación/esquinas por tokens, con su `index.test.ts`; verificar que el test de slot y estilo pasa
- [x] 5.3 Implementar `<finap-heading>` (niveles h1-h6) con su `index.test.ts`; verificar que el test de nivel semántico y estilo pasa
- [x] 5.4 Implementar `<finap-text>` (variantes de tamaño) con su `index.test.ts`; verificar que el test de texto de cuerpo pasa
- [x] 5.5 Implementar `<finap-icon>` (por nombre, con fallback) con su `index.test.ts`; verificar que los tests de icono conocido y desconocido pasan
- [x] 5.6 Implementar `<finap-container>` (ancho máximo y espaciado responsivo) con su `index.test.ts`; verificar que el test de ancho máximo pasa

## 6. Integración y validación

- [x] 6.1 Añadir una página/HTML de demostración (storybook-like mínima o demo en dev) que renderice todos los componentes; verificar visualmente en `npm run dev` que se ven con el design system
- [x] 6.2 Ejecutar `npm run test` y confirmar que toda la suite pasa sin fallos
- [x] 6.3 Ejecutar `npm run build` y confirmar que el build de producción compila sin errores
- [x] 6.4 Ejecutar `openspec validate design-system --strict` y confirmar que el change valida correctamente
