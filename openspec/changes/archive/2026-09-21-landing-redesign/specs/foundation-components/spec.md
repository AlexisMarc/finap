# Spec Delta

## ADDED Requirements

### Requirement: finap-brand-mark

El sistema SHALL proporcionar un componente `<finap-brand-mark>` que renderiza el logo de Finap compuesto por dos rombos (diamantes) solapados, usando los colores de marca.

#### Scenario: Logo de dos rombos

- **WHEN** se renderiza `<finap-brand-mark>`
- **THEN** se muestran dos rombos con los colores de marca

#### Scenario: Forma propia, no círculos

- **WHEN** se renderiza el logo de Finap
- **THEN** la figura usada son rombos y no círculos

### Requirement: finap-theme-toggle

El sistema SHALL proporcionar un componente `<finap-theme-toggle>` que alterna entre tema claro y oscuro, persiste la elección y respeta la preferencia del sistema.

#### Scenario: Alternar tema

- **WHEN** el usuario activa el toggle
- **THEN** la aplicación cambia entre tema claro y oscuro

#### Scenario: Persistencia de la elección

- **WHEN** el usuario elige un tema
- **THEN** la elección se guarda y se reaplica en la siguiente carga
