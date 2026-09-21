# Design

## Context

El repositorio no tiene código (`src/`, `package.json`, ni config de build/tests). La motivación está en `proposal.md`. Para construir el design system hace falta primero un scaffold mínimo de Vite + TypeScript + Lit + Open Cells y un runner de tests. Todo lo demás (landing, páginas) se apoya en lo que aquí se define.

## Goals / Non-Goals

**Goals:**
- Fijar la identidad visual (paleta inspirada en Mastercard, tipografía, motion) como tokens reutilizables.
- Proporcionar componentes Lit base, probados y accesibles.
- Definir un sistema de motion con respeto a `prefers-reduced-motion`.
- Dejar un patrón claro para que cada componente tenga su test unitario.

**Non-Goals:**
- No se construye la landing page ni páginas de la SPA (changes futuros).
- No se implementa persistencia de datos ni estado global de negocio.
- No se construyen componentes de dominio (tablas, formularios, gráficas) — solo foundation.

## Decisions

### 1. Scaffold y tooling: Vite + TypeScript + Lit + Open Cells, tests con Vitest

- **Decisión**: Vite como bundler/dev server, TypeScript estricto, Lit para componentes, Open Cells solo como runtime de SPA (el `startApp` se integrará cuando existan rutas). Tests unitarios con **Vitest** (entorno `happy-dom`), una suite por componente.
- **Alternativas**: `@web/test-runner` (listado en el README) da tests en navegador real, pero añade complejidad. Se posterga para tests de integración/e2e; Vitest cubre el requisito de "test unitario por componente" de forma más rápida y simple.
- **Racional**: un solo runner reduce configuración; Vitest comparte convenciones con Vite.

### 2. Tokens como CSS custom properties (`--finap-*`)

- **Decisión**: los tokens viven en hojas CSS globales (`src/tokens/`) y se importan una vez. Los temas (claro/oscuro) se resuelven sobrescribiendo variables bajo `[data-theme="dark"]` y `@media (prefers-color-scheme: dark)`, sin tocar cada componente.
- **Alternativas**: tokens en JS/TS (Lit `unsafeCSS`), o Design Tokens JSON (W3C) con build. Se descartan por ahora por complejidad: CSS variables es la vía más simple y con mejor integración con Shadow DOM y el cambio de tema en runtime.
- **Racional**: un cambio de token (p.ej. alternar tema) se propaga solo; los componentes no hardcodean valores.

### 3. Paleta de color (inspirada en Mastercard)

- **Decisión**: paleta inicial con primarios rojo `#EB001B`, naranja `#FF5F00`, acento amarillo `#F79E1B`, y escala de neutros (grises) para texto/fondo. Tema oscuro con valores equivalentes ajustados para contraste WCAG AA.
- **Alternativas**: copiar la paleta exacta de la marca o generar paleta propia desde cero. Se usa la inspiración de Mastercard (colores de marca del enunciado) pero con neutros propios para fondos y contraste.
- **Racional**: cumplir la referencia de color pedida manteniendo accesibilidad.

### 4. Tipografía: system font stack

- **Decisión**: usar un *system font stack* (sin fuente externa) para evitar dependencia de red y tiempos de carga; escalas (tamaño/peso/interlineado) como tokens.
- **Alternativas**: fuente de Google (p.ej. una similar a "Mark" de Mastercard). Se descarta inicialmente para no añadir descarga externa; puede reintroducirse en el change de landing.
- **Racional**: performance y simplicidad; la identidad la aportan color y motion.

### 5. Motion: CSS keyframes + IntersectionObserver para reveal

- **Decisión**: las primitivas (fade, slide, reveal) son clases CSS con keyframes que usan tokens de duración/easing. El *reveal on scroll* usa un `ReactiveController` de Lit basado en `IntersectionObserver` que añade la clase cuando el elemento entra en viewport. Todo desactivado bajo `prefers-reduced-motion: reduce`.
- **Alternativas**: librerías de animación (p.ej. Motion/GSAP), o Web Animations API. Se descartan para no añadir dependencias; CSS + un observer cubren lo necesario.
- **Racional**: ligero, sin dependencias, y con degradación accesible natural.

### 6. Componentes: Shadow DOM + estilos co-localizados, uno por carpeta

- **Decisión**: cada componente en `src/components/<name>/` con `index.ts` (clase Lit), `styles.ts` (CSS con `css` tag) y `index.test.ts`. Usan Shadow DOM (por defecto en Lit) y consumen tokens vía variables CSS heredadas.
- **Alternativas**: componentes planos en `src/components/` como sugiere el README. Se prefiere carpeta por componente para alojar el test junto a la implementación.
- **Racional**: cumple "un test unitario por componente" de forma trazable.

### 7. Cambio de tema: módulo `theme.ts` + `data-theme`

- **Decisión**: un módulo pequeño (`src/theme/theme.ts`) alterna `data-theme` en `<html>`, resuelve la preferencia del sistema y persiste la elección en `localStorage`. Se expone como utilidad, no como componente.
- **Alternativas**: gestionar el tema dentro de un componente de settings. Se difiere la UI a un change futuro; aquí solo la utilidad que garantiza el comportamiento del spec.
- **Racional**: separar la mecánica del tema de la UI que lo controle.

## Risks / Trade-offs

- **[Riesgo] La paleta "inspirada" en Mastercard puede derivar en problemas de identidad/marca** → Usar los colores como referencia de tono, con neutros y accesibilidad propios; revisar contraste WCAG AA en el tema oscuro.
- **[Riesgo] Duplicar runners de test más adelante (Vitest + @web/test-runner)** → Se define Vitest como único runner por ahora; @web/test-runner se introduce solo si se necesitan tests de navegador real.
- **[Riesgo] Shadow DOM + variables CSS requieren cuidado con la herencia** → Los tokens se definen en `:root`/`html` para que sean heredados dentro de los shadow roots; se valida en tests.
- **[Trade-off] system font stack vs. identidad tipográfica diferenciada** → Aceptado por simplicidad; se revisa en el change de landing.
