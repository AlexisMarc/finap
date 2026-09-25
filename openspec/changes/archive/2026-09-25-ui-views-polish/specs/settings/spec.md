# Spec Delta

## MODIFIED Requirements

### Requirement: Preferencia de tema

El sistema SHALL permitir cambiar entre tema claro y oscuro desde Ajustes con un botón con icono (sol/luna), en lugar de un switch.

#### Scenario: Cambiar tema

- **WHEN** el usuario cambia el tema en Ajustes
- **THEN** la preferencia se aplica y se persiste

#### Scenario: Control con icono

- **WHEN** se renderiza la preferencia de tema
- **THEN** se muestra un botón con icono que indica el tema actual
