# Tasks

## 0. Skills del proyecto (OBLIGATORIO)

- [ ] 0.1 Aplicar la skill `frontend-design` (`.agents/skills/frontend-design/SKILL.md`) a todo el rediseño: identidad visual deliberada (paleta, tipografía, layout), grounding en finanzas personales, y evitar defaults templados (cards SaaS idénticas, eyebrow ALL-CAPS, gradientes decorativos, single border-radius); verificar que las decisiones de diseño quedan reflejadas en el código y en `design.md`
- [ ] 0.2 Crear la filosofía de diseño de Finap en `docs/design-philosophy.md` siguiendo la skill `canvas-design` (`.agents/skills/canvas-design/SKILL.md`): un movimiento estético propio (forma, color, espacio, composición, jerarquía); verificar que el documento existe y define la identidad visual

## 1. Logo de Finap (dos rombos)

- [ ] 1.1 Cambiar `src/components/brand-mark/index.ts` de dos círculos a dos rombos solapados; verificar que el test de brand-mark valida rombos (no círculos)

## 2. Modo claro/oscuro

- [ ] 2.1 Añadir el evento `finap-theme-changed` en `src/theme/theme.ts` al aplicar el tema; verificar que el test de theme cubre el evento
- [ ] 2.2 Crear `src/components/theme-toggle/index.ts` (alterna claro/oscuro, refleja estado y persiste) con su test; verificar que el test de toggle pasa
- [ ] 2.3 Completar la cobertura oscura en `src/theme/theme.css` y tokens (fondos, acentos y gradiente de marca); verificar que el test de contraste/valores oscuros pasa

## 3. Landing al estilo Mastercard

- [ ] 3.1 Rehacer el header de `src/pages/landing-page.ts` (logo de rombos + navegación + toggle); verificar que el test de header pasa
- [ ] 3.2 Rehacer el hero (tagline + headline + CTA sobre fondo claro con acentos); verificar que el test de hero pasa
- [ ] 3.3 Rehacer las secciones de contenido (cards) y el footer; verificar que el test de secciones/footer pasa

## 4. Ajustes de estilo del design system

- [ ] 4.1 Afinar la escala tipográfica de titulares en `src/tokens/typography.css`; verificar que el test de tipografía pasa
- [ ] 4.2 Refinar estilos de cards y botones (`card`/`button`) hacia un look más limpio; verificar que los tests de card y button siguen pasando

## 5. Tests

- [ ] 5.1 Actualizar el test de `landing-page` (header, hero, secciones, footer y toggle presente)
- [ ] 5.2 Añadir tests de `theme-toggle` y de cobertura oscura de tokens

## 6. Validación

- [ ] 6.1 Ejecutar `npm run test` y confirmar que toda la suite pasa sin fallos
- [ ] 6.2 Ejecutar `npm run build` y confirmar que el build de producción compila sin errores
- [ ] 6.3 Ejecutar `openspec validate landing-redesign --strict` y confirmar que el change valida correctamente
