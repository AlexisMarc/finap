# Spec Delta

## ADDED Requirements

### Requirement: Selector de tipo de gráfica

El sistema SHALL permitir elegir el tipo de gráfica de evolución y de categorías (barras, líneas o pastel).

#### Scenario: Cambiar tipo de gráfica

- **WHEN** el usuario cambia el tipo de gráfica
- **THEN** la gráfica se redibuja con el tipo elegido

## MODIFIED Requirements

### Requirement: Selector de periodo

El sistema SHALL permitir elegir el periodo de análisis (mes, trimestre o año) con los controles agrupados (`sp-action-group`).

#### Scenario: Cambiar periodo

- **WHEN** el usuario selecciona un periodo
- **THEN** las métricas y gráficas se actualizan para ese periodo

#### Scenario: Periodos agrupados

- **WHEN** se renderiza el selector de periodo
- **THEN** los periodos se muestran agrupados como un único control, sin elementos sueltos
