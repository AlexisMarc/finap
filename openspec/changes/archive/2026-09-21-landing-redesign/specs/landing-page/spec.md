# Spec Delta

## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Hero con gradiente de marca

**Reason**: El hero pasa a un estilo limpio con acentos de marca sobre fondo claro (referencia Mastercard), eliminando el gradiente de fondo completo.

**Migration**: Reemplazado por el requirement "Hero con tagline y headline".

### Requirement: Sección de features

**Reason**: Las features se reestructuran como secciones de contenido con cards, siguiendo la estructura de la referencia.

**Migration**: Reemplazado por el requirement "Secciones de contenido".
