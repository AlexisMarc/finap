# Landing Page Specification

## Purpose

Define la landing page de Finap, la página de entrada a la SPA, que presenta el producto (hero, features y footer) usando el design system, mostrando la paleta de marca completa (rojo/naranja/amarillo) y animaciones sutiles.

## Requirements

### Requirement: Header con logo, navegación y toggle

El sistema SHALL renderizar un header en la landing con el logo de Finap (dos rombos), la navegación principal y el toggle de tema.

#### Scenario: Header visible

- **WHEN** se renderiza la landing
- **THEN** se muestra un header con logo, navegación y toggle de tema

### Requirement: Hero con tagline y headline

El sistema SHALL renderizar un hero con tagline, headline principal y llamada a la acción (CTA), usando acentos de la paleta de marca sobre fondo claro.

#### Scenario: Hero visible

- **WHEN** se renderiza la landing
- **THEN** se muestra un hero con tagline, headline y un CTA

#### Scenario: Acentos de marca sobre fondo claro

- **WHEN** se renderiza el hero
- **THEN** el hero usa acentos de la paleta (rojo/naranja) sobre fondo claro, sin un fondo de gradiente completo

### Requirement: Secciones de contenido

El sistema SHALL presentar el contenido de la landing en secciones (producto, funcionalidades y llamadas a la acción) con cards, siguiendo la estructura de la referencia Mastercard.

#### Scenario: Secciones listadas

- **WHEN** se renderiza la landing
- **THEN** se muestran secciones de contenido con título y cards

### Requirement: Footer

El sistema SHALL renderizar un footer con información básica del producto.

#### Scenario: Footer visible

- **WHEN** se renderiza la landing page
- **THEN** se muestra un footer al final de la página

### Requirement: Consumo del design system

La landing page SHALL usar los componentes base (`finap-button`, `finap-card`, `finap-heading`, `finap-text`, `finap-container`) y los tokens de diseño (`--finap-*`) en lugar de estilos propios duplicados.

#### Scenario: Uso de componentes base

- **WHEN** se renderiza la landing page
- **THEN** los elementos de interfaz están compuestos por componentes base del design system

### Requirement: Paleta de marca completa

La landing page SHALL mostrar los tres colores de la paleta de marca (rojo primario, naranja secundario y amarillo acento) de forma visible.

#### Scenario: Los tres colores visibles

- **WHEN** se renderiza la landing page
- **THEN** aparecen al menos un elemento primario (rojo), uno secundario (naranja) y uno de acento (amarillo)

### Requirement: Animaciones sutiles

El sistema SHALL aplicar animaciones de entrada y reveal on scroll reutilizando las primitivas de `motion`, y respetar `prefers-reduced-motion`.

#### Scenario: Reveal on scroll en las secciones

- **WHEN** una sección de la landing entra en el viewport
- **THEN** la sección se anima a su estado visible

#### Scenario: Respeto de prefers-reduced-motion

- **WHEN** el usuario tiene `prefers-reduced-motion: reduce` activado
- **THEN** las animaciones de la landing no se ejecutan

### Requirement: Diseño responsivo

La landing page SHALL adaptarse a los breakpoints del design system (móvil, tablet y escritorio).

#### Scenario: Adaptación a breakpoints

- **WHEN** la viewport cruza un breakpoint definido
- **THEN** el layout de la landing se reorganiza usando los tokens de breakpoint

### Requirement: Contenido internacionalizado

La landing page SHALL mostrar su contenido (header, hero, secciones y footer) en el idioma activo (español o inglés) usando el sistema i18n.

#### Scenario: Contenido en español

- **WHEN** el idioma activo es español
- **THEN** el contenido de la landing se muestra en español

#### Scenario: Contenido en inglés

- **WHEN** el idioma activo es inglés
- **THEN** el contenido de la landing se muestra en inglés
