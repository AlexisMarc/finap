# Spec Delta

## ADDED Requirements

### Requirement: Campos de fecha y área de texto coherentes

El sistema SHALL estilizar el campo de fecha (`finap-input type="date"`) y el área de texto nativos con el mismo diseño que `sp-textfield` (etiqueta, borde, foco y mensaje de error), al no existir un componente de fecha ni `sp-textarea` en Spectrum.

#### Scenario: Campo de fecha con el diseño del textfield

- **WHEN** se renderiza `<finap-input type="date">`
- **THEN** el campo nativo muestra el mismo aspecto que un `sp-textfield` (etiqueta, borde y foco)

#### Scenario: Área de texto coherente

- **WHEN** se renderiza `<finap-input type="textarea">`
- **THEN** el textarea nativo se muestra con el mismo aspecto que un campo de Spectrum

### Requirement: Estados de carga con skeleton

El sistema SHALL mostrar skeletons (placeholders con shimmer) con tokens de Spectrum durante la carga, en lugar del texto "Cargando…".

#### Scenario: Skeleton durante la carga

- **WHEN** una vista está cargando datos
- **THEN** se muestra un skeleton con shimmer en lugar de un texto de carga

### Requirement: Ayuda contextual

El sistema SHALL proporcionar ayuda contextual mediante `sp-coachmark` (tours de pasos) y `sp-tooltip`/`sp-help-text` para guiar campos y controles.

#### Scenario: Tour de ayuda

- **WHEN** el usuario abre la ayuda
- **THEN** se muestra un tour de pasos con `sp-coachmark` que explica las secciones

#### Scenario: Ayuda en campos

- **WHEN** un campo tiene ayuda asociada
- **THEN** se muestra con `sp-help-text` o `sp-tooltip`

### Requirement: Badges y estados

El sistema SHALL usar `sp-badge` y `sp-status-light` para indicar el estado de los datos (ingreso, gasto, deuda, pagado/pendiente) de forma coherente.

#### Scenario: Estado de un movimiento

- **WHEN** se muestra un movimiento
- **THEN** se indica con un `sp-badge` si es ingreso o gasto

#### Scenario: Estado de una deuda

- **WHEN** se muestra una deuda
- **THEN** se indica con un `sp-badge` o `sp-status-light` si está pagada o pendiente

### Requirement: Grupos de acciones y campos

El sistema SHALL usar `sp-action-group` para agrupar botones relacionados y `sp-field-group` para agrupar campos con una etiqueta común, aportando jerarquía visual.

#### Scenario: Grupo de acciones

- **WHEN** varios botones están relacionados (por ejemplo, periodos o filtros)
- **THEN** se agrupan con `sp-action-group`

#### Scenario: Grupo de campos

- **WHEN** varios campos comparten un contexto
- **THEN** se agrupan con `sp-field-group` y su etiqueta
