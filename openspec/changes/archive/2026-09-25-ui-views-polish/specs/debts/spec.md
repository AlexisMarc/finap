# Spec Delta

## MODIFIED Requirements

### Requirement: Listado de deudas

El sistema SHALL mostrar las deudas con jerarquía clara (importe total, pagado, pendiente y progreso con color según cercanía a la meta), en una tabla con bordes y densidad controlada, con un único botón de acción por fila (`sp-action-menu`) y posibilidad de verlas en lista o galería.

#### Scenario: Ver deudas

- **WHEN** el usuario abre la sección Deudas
- **THEN** se muestran las deudas con su progreso y el total pendiente

#### Scenario: Acción única por fila

- **WHEN** el usuario ve una deuda
- **THEN** dispone de un único botón de acción que abre un menú (pagar, editar, eliminar)

#### Scenario: Progreso con color

- **WHEN** se muestra el progreso de una deuda
- **THEN** la barra usa color según lo cerca o lejos que esté de saldarse

#### Scenario: Vista lista o galería

- **WHEN** el usuario alterna la vista
- **THEN** las deudas se muestran como lista o como galería
