# Spec Delta

## MODIFIED Requirements

### Requirement: Tipografía

El sistema SHALL definir una escala tipográfica (familias, tamaños, pesos y alturas de línea) como tokens, usando **Inter** para texto de cuerpo y **Sora** para títulos y display.

#### Scenario: Escala tipográfica definida

- **WHEN** se consultan los tokens tipográficos (título, cuerpo, etiqueta)
- **THEN** cada uno devuelve familia, tamaño, peso e interlineado coherentes con una escala definida

#### Scenario: Familias de cuerpo y títulos

- **WHEN** se consultan los tokens de familia tipográfica
- **THEN** el cuerpo usa `Inter` y los títulos/display usan `Sora`

## ADDED Requirements

### Requirement: Colores semánticos

El sistema SHALL definir tokens de color semánticos para estados financieros y acentos: positivo/ingreso, negativo/gasto, deuda y acento secundario.

#### Scenario: Colores semánticos disponibles

- **WHEN** un componente necesita indicar un ingreso
- **THEN** dispone de un token de color positivo (verde) coherente con el tema

#### Scenario: Colores semánticos en modo oscuro

- **WHEN** se activa el tema oscuro
- **THEN** los colores semánticos (ingreso, gasto, deuda y acento) tienen valores coherentes con el tema oscuro

### Requirement: Escala de radios y elevación

El sistema SHALL definir una escala de radios de esquina y niveles de elevación alineada a la interfaz de la app (radios variados según jerarquía y sombra de modal).

#### Scenario: Radios por jerarquía

- **WHEN** se construye una superficie (tarjeta, panel, modal)
- **THEN** existe un token de radio adecuado a su jerarquía

#### Scenario: Sombra de modal

- **WHEN** se muestra un modal
- **THEN** está disponible un token de elevación para la sombra del modal
