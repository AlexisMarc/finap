# ADR-0009: Testing

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

Necesitamos tests unitarios fiables para componentes Web Components (Lit) sin depender de un navegador real.

## Decisión

- Usar **Vitest** con entorno `happy-dom`.
- Cada componente tiene su test (`index.test.ts`); los módulos con lógica (tokens, theme, i18n, services) también.
- Usar el helper `src/test/fixture.ts` para montar componentes: instancia directa (`new Componente()`) + `connectedCallback()` + `await updateComplete`, y `teardown()`.
- Verificar comportamiento observable (render, props, eventos) y, para estilos, que usen tokens (`var(--finap-*)`).

## Consecuencias

- Los tests son rápidos y deterministas.
- Se evita el problema conocido de `happy-dom` con `document.createElement` + `appendChild` y Shadow DOM.
- El render visual y las APIs de navegador (canvas, service worker) se validan en build/QA.

## Gotchas conocidos (happy-dom)

- **Custom elements y Shadow DOM**: `document.createElement` + `appendChild` no dispara de forma
  fiable `connectedCallback` de Lit. Usar `src/test/fixture.ts` (`new Componente()` +
  `connectedCallback()` + `await updateComplete`).
- **Plantillas anidadas en el nivel raíz**: un binding que resuelve a una plantilla anidada o a un
  `.map()` **directamente en la raíz** del template de `render()` no se pinta en happy-dom (se
  serializa como `<?>`). Envoltura la binding en un elemento (o renderiza siempre y oculta con
  `hidden`). Ejemplo: `<button>…</button>${cond ? html\`…\` : nothing}` falla; poner la parte
  condicional dentro de un elemento (o `.chip`) funciona.
- **Imports sin extensión en dependencias**: `@open-cells/core` usa imports ESM sin extensión;
  Vitest lo resuelve inlineando el paquete (`test.server.deps.inline: ['@open-cells/core']`).
