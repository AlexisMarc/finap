# Spec Delta

## Purpose

Define la landing page de Finap, la página de entrada a la SPA, que presenta el producto (hero, features y footer) usando el design system, mostrando la paleta de marca completa (rojo/naranja/amarillo) y animaciones sutiles.

## ADDED Requirements

### Requirement: Hero con gradiente de marca

El sistema SHALL renderizar una sección hero con titular, subtítulo y llamada a la acción (CTA), usando el gradiente de marca (rojo → naranja → amarillo).

#### Scenario: Hero visible

- **WHEN** se renderiza la landing page
- **THEN** se muestra un hero con titular y un CTA

#### Scenario: Gradiente de marca en el hero

- **WHEN** se renderiza el hero
- **THEN** el hero aplica el gradiente de marca compuesto por los tres colores de la paleta (rojo, naranja y amarillo)

### Requirement: Sección de features

El sistema SHALL presentar las capacidades principales del producto (dashboard, movimientos, presupuestos y categorías) en una sección de features.

#### Scenario: Features listadas

- **WHEN** se renderiza la landing page
- **THEN** se muestran las features del producto con título y descripción

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
