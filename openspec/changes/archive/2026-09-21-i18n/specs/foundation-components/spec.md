# Spec Delta

## ADDED Requirements

### Requirement: finap-language-toggle

El sistema SHALL proporcionar un componente `<finap-language-toggle>` que alterna el idioma de la aplicación entre español e inglés.

#### Scenario: Alternar idioma

- **WHEN** el usuario activa el selector de idioma
- **THEN** la aplicación cambia entre español e inglés

#### Scenario: Estado reflejado

- **WHEN** se renderiza el selector de idioma
- **THEN** el selector refleja el idioma activo
