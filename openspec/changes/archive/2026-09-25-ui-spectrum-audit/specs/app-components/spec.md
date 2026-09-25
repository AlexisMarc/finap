# Spec Delta

## ADDED Requirements

### Requirement: Uso conforme a la API de Spectrum

El sistema SHALL usar los componentes de Spectrum Web Components conforme a su API documentada: slots correctos (`slot="icon"` en `sp-sidenav-item`/`sp-action-button`), variantes oficiales y propiedades soportadas, sin sobrescribir variables internas del componente.

#### Scenario: Iconos en su slot

- **WHEN** un componente Spectrum recibe un icono (navegación lateral, botones de acción)
- **THEN** el icono se coloca en `slot="icon"`

#### Scenario: Grupos de opciones con API oficial

- **WHEN** se presenta un grupo de opciones seleccionables (filtros de tipo, periodos)
- **THEN** se usa `sp-action-group` con `sp-action-button` y su propiedad `selected`, no `sp-tag`

#### Scenario: Sin sobrescrituras internas

- **WHEN** se necesita ajustar el aspecto de un componente Spectrum
- **THEN** se usan variantes/slots oficiales o la capa de personalización documentada (`--mod-*`), sin redefinir variables internas del componente
