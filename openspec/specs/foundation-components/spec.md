# Foundation Components Specification

## Purpose

Define los componentes web base que Finap conserva (títulos, texto, contenedor y marca) construidos con Lit sobre Spectrum; el resto de elementos se resuelven con componentes de Spectrum Web Components (`sp-button`, `sp-card`, `sp-icon`, `sp-switch`, `sp-picker`, …).

## Requirements

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

### Requirement: finap-brand-mark

El sistema SHALL proporcionar un componente `<finap-brand-mark>` que renderiza el logo de Finap compuesto por dos rombos (diamantes) solapados, usando los colores de marca.

#### Scenario: Logo de dos rombos

- **WHEN** se renderiza `<finap-brand-mark>`
- **THEN** se muestran dos rombos con los colores de marca

#### Scenario: Forma propia, no círculos

- **WHEN** se renderiza el logo de Finap
- **THEN** la figura usada son rombos y no círculos
