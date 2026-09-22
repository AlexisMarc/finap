# Spec Delta

## MODIFIED Requirements

### Requirement: Tema claro y oscuro

El sistema SHALL proporcionar un tema claro (por defecto) y un tema oscuro, seleccionables y aplicables globalmente sin recargar la página, con cobertura completa de todos los tokens y componentes (fondos, superficies, textos, acentos y gradiente de marca).

#### Scenario: Tema por defecto

- **WHEN** la aplicación se carga sin preferencia explícita del usuario
- **THEN** se aplica el tema claro

#### Scenario: Cambio a tema oscuro

- **WHEN** el usuario activa el tema oscuro
- **THEN** los tokens de color cambian a sus valores oscuros en toda la aplicación

#### Scenario: Respetar preferencia del sistema

- **WHEN** el usuario no ha elegido tema y su sistema prefiere modo oscuro (`prefers-color-scheme: dark`)
- **THEN** se aplica el tema oscuro

#### Scenario: Cobertura completa en modo oscuro

- **WHEN** se activa el tema oscuro
- **THEN** todos los componentes y tokens (incluidos los acentos de marca y el gradiente) muestran valores coherentes con el tema oscuro
