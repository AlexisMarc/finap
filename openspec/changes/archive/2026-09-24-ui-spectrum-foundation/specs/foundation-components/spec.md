# Spec Delta

## MODIFIED Requirements

### Requirement: finap-button

El sistema SHALL proporcionar un componente `<finap-button>` con variantes (primaria, secundaria, texto), estado deshabilitado y soporte de teclado/accesibilidad, implementado sobre `<sp-button>` de Spectrum.

#### Scenario: Render con variante por defecto

- **WHEN** se renderiza `<finap-button>` sin atributo de variante
- **THEN** el botón se muestra con el estilo de variante primaria de Spectrum

#### Scenario: Variante explícita

- **WHEN** se renderiza `<finap-button variant="secondary">`
- **THEN** el botón se muestra con el estilo de la variante secundaria de Spectrum

#### Scenario: Botón deshabilitado

- **WHEN** se renderiza `<finap-button disabled>`
- **THEN** el botón no responde a clics y se muestra con estilo deshabilitado

#### Scenario: Activación por teclado

- **WHEN** el botón tiene el foco y se presiona Enter o Space
- **THEN** se dispara el mismo comportamiento que un clic

### Requirement: finap-card

El sistema SHALL proporcionar un componente `<finap-card>` contenedor con elevación y esquinas redondeadas de Spectrum, con un slot para contenido.

#### Scenario: Contenido proyectado en el slot

- **WHEN** se renderiza `<finap-card>` con contenido en su slot
- **THEN** el contenido se muestra dentro de la tarjeta con el estilo del design system

### Requirement: finap-heading

El sistema SHALL proporcionar un componente `<finap-heading>` para títulos con niveles semánticos (h1-h6) y estilo tipográfico de Spectrum.

#### Scenario: Nivel semántico

- **WHEN** se renderiza `<finap-heading level="2">`
- **THEN** el componente renderiza un elemento `h2` con el estilo tipográfico correspondiente de Spectrum

### Requirement: finap-text

El sistema SHALL proporcionar un componente `<finap-text>` para texto de cuerpo con variantes de tamaño basadas en la escala de Spectrum.

#### Scenario: Texto de cuerpo

- **WHEN** se renderiza `<finap-text>` con contenido
- **THEN** el contenido se muestra con el estilo de texto de cuerpo del design system

### Requirement: finap-icon

El sistema SHALL proporcionar un componente `<finap-icon>` que renderiza un icono por nombre desde el set de workflow icons de Spectrum.

#### Scenario: Icono por nombre

- **WHEN** se renderiza `<finap-icon name="home">`
- **THEN** se muestra el icono de Spectrum correspondiente al nombre indicado

#### Scenario: Nombre de icono desconocido

- **WHEN** se renderiza `<finap-icon name="no-existe">`
- **THEN** el componente no renderiza contenido visual roto (icono vacío o fallback)

### Requirement: finap-container

El sistema SHALL proporcionar un componente `<finap-container>` que limita el ancho de contenido y aplica el espaciado responsivo del design system.

#### Scenario: Ancho máximo consistente

- **WHEN** se renderiza `<finap-container>` con contenido
- **THEN** el contenido queda limitado al ancho máximo definido y centrado

### Requirement: Consumo de tokens de diseño

Todos los componentes base SHALL usar los tokens de diseño (`--spectrum-*` o sus alias `--finap-*`) para color, tipografía, espaciado y elevación, sin valores hardcodeados.

#### Scenario: Estilos derivados de tokens

- **WHEN** se cambia un token de color (por ejemplo, al alternar el tema)
- **THEN** los componentes base reflejan el nuevo valor automáticamente

### Requirement: finap-theme-toggle

El sistema SHALL proporcionar un componente `<finap-theme-toggle>` que alterna entre tema claro y oscuro del `sp-theme` raíz, persiste la elección y respeta la preferencia del sistema.

#### Scenario: Alternar tema

- **WHEN** el usuario activa el toggle
- **THEN** la aplicación cambia entre tema claro y oscuro

#### Scenario: Persistencia de la elección

- **WHEN** el usuario elige un tema
- **THEN** la elección se guarda y se reaplica en la siguiente carga
