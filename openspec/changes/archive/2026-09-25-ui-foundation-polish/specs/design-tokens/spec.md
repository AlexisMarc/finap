# Spec Delta

## MODIFIED Requirements

### Requirement: Paleta de color

El sistema SHALL usar la paleta de color de Spectrum como base: los neutros (fondos, superficies, bordes y texto) provienen de los tokens semánticos de Spectrum con su tono cálido natural, el acento interactivo usa el acento de Spectrum, y la paleta de marca de Finap (rojo/naranja/amarillo) se reserva como acento de marca (logo, hero y gradiente), sin dominar la interfaz.

#### Scenario: Neutros de Spectrum

- **WHEN** se consultan los tokens de fondo, superficie, borde y texto
- **THEN** derivan de los tokens neutros semánticos de Spectrum (`--spectrum-background-*`, escala de grises)

#### Scenario: Tono cálido coherente

- **WHEN** se renderiza la interfaz
- **THEN** los neutros reflejan el tono cálido de Spectrum, sin parecer más fríos que la librería

#### Scenario: Contraste fondo/superficie en modo claro

- **WHEN** se renderiza una superficie sobre el fondo en modo claro
- **THEN** la superficie se distingue del fondo (borde y/o tono con contraste suficiente)

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
