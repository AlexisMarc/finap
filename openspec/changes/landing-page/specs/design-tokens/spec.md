# Spec Delta

## ADDED Requirements

### Requirement: Gradiente de marca

El sistema SHALL definir un token de gradiente de marca compuesto por los tres colores de la paleta (rojo, naranja y amarillo) para fondos y elementos decorativos de identidad.

#### Scenario: Token de gradiente disponible

- **WHEN** un componente necesita aplicar el gradiente de marca
- **THEN** dispone de un token `--finap-*` que expone un gradiente lineal rojo → naranja → amarillo

#### Scenario: Tres colores en el gradiente

- **WHEN** se consulta el token de gradiente de marca
- **THEN** el gradiente contiene los colores primario (rojo), secundario (naranja) y acento (amarillo)
