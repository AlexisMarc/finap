# Spec Delta

## REMOVED Requirements

### Requirement: finap-button

**Reason**: Sustituido por el componente `sp-button` de Spectrum Web Components, que ya cubre variantes, estados y accesibilidad.

**Migration**: Usar `<sp-button>` directamente en las vistas (variante/treatment de Spectrum). `primary` → `accent`, `secondary` → `secondary`, `text` → `secondary` con `treatment="outline"`.

### Requirement: finap-card

**Reason**: Sustituido por `sp-card` de Spectrum para las superficies de contenido.

**Migration**: Usar `<sp-card>` (o superficies con tokens de Spectrum para paneles de app) en lugar de `<finap-card>`.

### Requirement: finap-icon

**Reason**: Sustituido por `sp-icon` con el set `@spectrum-web-components/icons-workflow`.

**Migration**: Usar `<sp-icon>` con el icono de workflow correspondiente en las vistas.

### Requirement: finap-theme-toggle

**Reason**: Sustituido por controles de Spectrum (`sp-switch` en Ajustes y `sp-action-button` con `sp-tooltip` en el header).

**Migration**: Cambiar el tema con `sp-switch` en Ajustes o `sp-action-button` en el header, usando la misma lógica de `src/theme/`.

### Requirement: finap-language-toggle

**Reason**: Sustituido por `sp-picker` de Spectrum.

**Migration**: Cambiar el idioma con un `sp-picker` (o `sp-action-menu`) conectado a `setLocale`.

## MODIFIED Requirements

### Requirement: finap-heading

El sistema SHALL proporcionar un componente `<finap-heading>` para títulos con niveles semánticos (h1-h6) aplicando las clases tipográficas de Spectrum (títulos sobrios y coherentes), al no existir un componente de título en Spectrum.

#### Scenario: Nivel semántico

- **WHEN** se renderiza `<finap-heading level="2">`
- **THEN** el componente renderiza un elemento `h2` con el estilo tipográfico de Spectrum correspondiente

#### Scenario: Jerarquía visual sobria

- **WHEN** se renderizan títulos de distintos niveles
- **THEN** la jerarquía se percibe por tamaño y peso de Spectrum sin tamaños desproporcionados

### Requirement: finap-text

El sistema SHALL proporcionar un componente `<finap-text>` para texto de cuerpo con las clases tipográficas de Spectrum y colores de texto neutros de Spectrum, al no existir un componente de texto en Spectrum.

#### Scenario: Texto de cuerpo

- **WHEN** se renderiza `<finap-text>` con contenido
- **THEN** el contenido se muestra con el estilo de texto de cuerpo del design system

### Requirement: finap-container

El sistema SHALL proporcionar un componente `<finap-container>` que limita el ancho de contenido y aplica el espaciado responsivo de Spectrum, como utilidad de layout.

#### Scenario: Ancho máximo consistente

- **WHEN** se renderiza `<finap-container>` con contenido
- **THEN** el contenido queda limitado al ancho máximo definido y centrado

### Requirement: Consumo de tokens de diseño

Todos los componentes propios que se conservan SHALL usar los tokens de diseño de Spectrum (`--spectrum-*` o sus alias `--finap-*`) para color, tipografía, espaciado y elevación, sin valores hardcodeados.

#### Scenario: Estilos derivados de tokens

- **WHEN** se cambia un token de color (por ejemplo, al alternar el tema)
- **THEN** los componentes reflejan el nuevo valor automáticamente
