# Spec Delta

## MODIFIED Requirements

### Requirement: Paleta de color

El sistema SHALL usar la paleta de color de Spectrum como base: los neutros (fondos, superficies, bordes y texto) provienen de los tokens semánticos de Spectrum, el acento interactivo usa el acento de Spectrum, y la paleta de marca de Finap (rojo/naranja/amarillo) se reserva como acento de marca (logo, hero y gradiente), sin dominar la interfaz.

#### Scenario: Neutros de Spectrum

- **WHEN** se consultan los tokens de fondo, superficie, borde y texto
- **THEN** derivan de los tokens neutros semánticos de Spectrum (`--spectrum-background-*`, escala de grises)

#### Scenario: Color primario definido

- **WHEN** se consulta el token de color primario de marca
- **THEN** devuelve un valor de color válido (naranja/rojo) coherente con la identidad de marca

#### Scenario: Acento interactivo de Spectrum

- **WHEN** se renderiza un control interactivo principal (acción primaria, foco, selección)
- **THEN** usa el acento de Spectrum

#### Scenario: Marca como acento

- **WHEN** se renderiza el logo, el hero o el gradiente de marca
- **THEN** se usa la paleta de marca (rojo/naranja/amarillo) sobre una base neutral

#### Scenario: Colores de texto y fondo con contraste suficiente

- **WHEN** se aplican los tokens de color de texto sobre los tokens de color de fondo
- **THEN** la combinación cumple un contraste mínimo accesible (WCAG AA)

### Requirement: Colores semánticos

El sistema SHALL definir tokens de color semánticos para estados financieros (positivo/ingreso, negativo/gasto y deuda) alineados con la paleta semántica de Spectrum y coherentes en tema claro y oscuro.

#### Scenario: Colores semánticos disponibles

- **WHEN** un componente necesita indicar un ingreso
- **THEN** dispone de un token de color positivo (verde) de la paleta semántica correspondiente

#### Scenario: Colores semánticos en modo oscuro

- **WHEN** se activa el tema oscuro
- **THEN** los colores semánticos (ingreso, gasto y deuda) tienen valores coherentes con el tema oscuro

### Requirement: Escala de radios y elevación

El sistema SHALL definir una escala de radios de esquina sutil alineada con los radios de Spectrum (valores pequeños; `full` solo para elementos tipo píldora o avatares) y una elevación contenida, evitando el aspecto de "burbuja".

#### Scenario: Radios por jerarquía

- **WHEN** se construye una superficie (tarjeta, panel, modal)
- **THEN** existe un token de radio adecuado a su jerarquía con un valor sutil (no prominente)

#### Scenario: Sin redondeo prominente

- **WHEN** se renderiza cualquier superficie o control rectangular
- **THEN** su radio es pequeño y coherente con Spectrum (no hay esquinas muy redondeadas)

#### Scenario: Sombra de modal

- **WHEN** se muestra un modal
- **THEN** está disponible un token de elevación para la sombra del modal
