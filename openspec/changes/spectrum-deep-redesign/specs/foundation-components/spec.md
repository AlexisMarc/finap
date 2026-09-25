# Spec Delta

## MODIFIED Requirements

### Requirement: finap-card

El sistema SHALL proporcionar un componente `<finap-card>` como superficie plana con borde sutil, radio pequeño y elevación contenida (estilo panel de Spectrum), con un slot para contenido.

#### Scenario: Contenido proyectado en el slot

- **WHEN** se renderiza `<finap-card>` con contenido en su slot
- **THEN** el contenido se muestra dentro de la tarjeta con el estilo de superficie del design system (plana, borde sutil, radio pequeño)

#### Scenario: Sin sombra prominente

- **WHEN** se renderiza `<finap-card>` en reposo
- **THEN** no muestra una sombra elevada prominente

### Requirement: finap-heading

El sistema SHALL proporcionar un componente `<finap-heading>` para títulos con niveles semánticos (h1-h6) y el estilo y pesos tipográficos de Spectrum (títulos sobrios, sin exceso de tamaño).

#### Scenario: Nivel semántico

- **WHEN** se renderiza `<finap-heading level="2">`
- **THEN** el componente renderiza un elemento `h2` con el estilo tipográfico de Spectrum correspondiente

#### Scenario: Jerarquía visual sobria

- **WHEN** se renderizan títulos de distintos niveles
- **THEN** la jerarquía se percibe por tamaño y peso de Spectrum sin recurrir a tamaños desproporcionados

### Requirement: finap-text

El sistema SHALL proporcionar un componente `<finap-text>` para texto de cuerpo con variantes de tamaño basadas en la escala de Spectrum y colores de texto neutros de Spectrum.

#### Scenario: Texto de cuerpo

- **WHEN** se renderiza `<finap-text>` con contenido
- **THEN** el contenido se muestra con el estilo de texto de cuerpo del design system
