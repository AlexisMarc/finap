# ADR-0006: Design system y estilos

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

La app debe tener una identidad visual coherente (marca Finap con paleta rojo/naranja/amarillo) y reutilizar componentes. Los mockups marcan un estilo oscuro con tipografías concretas.

## Decisión

- Los estilos se construyen con **design tokens** en CSS custom properties con prefijo `--finap-*` (`src/tokens/`).
- Existe una librería de componentes base y de app (`src/components/*`) que consumen **solo** tokens (sin valores hardcodeados).
- Tipografía: `Inter` (cuerpo) y `Sora` (títulos), empaquetadas localmente.
- Los estilos van en Shadow DOM con `static styles` de Lit; los componentes exponen comportamiento vía propiedades/atributos.
- Los componentes son responsivos y respetan `prefers-reduced-motion`.

## Consecuencias

- Un cambio de token se propaga a toda la UI (incluido el cambio de tema).
- Cada componente es reutilizable y testeable de forma aislada.
- Se evitan estilos globales que rompan el encapsulamiento de Shadow DOM.
