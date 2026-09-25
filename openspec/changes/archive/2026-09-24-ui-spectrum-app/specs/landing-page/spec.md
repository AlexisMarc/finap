# Spec Delta

## MODIFIED Requirements

### Requirement: Hero con tagline y headline

El sistema SHALL renderizar un hero con tagline, headline principal y llamada a la acción (CTA), usando patrones de Spectrum (tipografía, espaciado y botones) con el acento de marca de Finap.

#### Scenario: Hero visible

- **WHEN** se renderiza la landing
- **THEN** se muestra un hero con tagline, headline y un CTA

#### Scenario: CTA con estilo Spectrum

- **WHEN** se renderiza el hero
- **THEN** el CTA usa el estilo de botón primario de Spectrum con el acento de marca

#### Scenario: Acentos de marca sobre fondo claro

- **WHEN** se renderiza el hero
- **THEN** el hero usa acentos de la paleta (rojo/naranja) sobre fondo claro, sin un fondo de gradiente completo

### Requirement: Secciones de contenido

El sistema SHALL presentar el contenido de la landing en secciones (producto, funcionalidades y llamadas a la acción) con cards, siguiendo los patrones de layout y superficie de Spectrum.

#### Scenario: Secciones listadas

- **WHEN** se renderiza la landing
- **THEN** se muestran secciones de contenido con título y cards

### Requirement: Consumo del design system

La landing page SHALL usar los componentes base (`finap-button`, `finap-card`, `finap-heading`, `finap-text`, `finap-container`) y los tokens de diseño (`--spectrum-*` o sus alias `--finap-*`) en lugar de estilos propios duplicados.

#### Scenario: Uso de componentes base

- **WHEN** se renderiza la landing page
- **THEN** los elementos de interfaz están compuestos por componentes base del design system

### Requirement: Paleta de marca completa

La landing page SHALL mostrar los tres colores de la paleta de marca (rojo primario, naranja secundario y amarillo acento) de forma visible sobre la base neutral de Spectrum.

#### Scenario: Los tres colores visibles

- **WHEN** se renderiza la landing page
- **THEN** aparecen al menos un elemento primario (rojo), uno secundario (naranja) y uno de acento (amarillo)
