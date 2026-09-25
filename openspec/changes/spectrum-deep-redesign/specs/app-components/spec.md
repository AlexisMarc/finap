# Spec Delta

## ADDED Requirements

### Requirement: Badges con Spectrum

El sistema SHALL usar `sp-badge` para etiquetas de estado y variaciones (tendencias, estados de deuda, resultados), con variantes semánticas de Spectrum.

#### Scenario: Tendencia con badge

- **WHEN** se muestra una variación positiva o negativa
- **THEN** se renderiza con un `sp-badge` de la variante correspondiente (positiva/negativa)

#### Scenario: Estado de deuda

- **WHEN** una deuda está pagada o pendiente
- **THEN** se indica con un `sp-badge` coherente con el estado

### Requirement: Medidor de progreso con Spectrum

El sistema SHALL usar primitivas de medición de Spectrum (`sp-meter`/`sp-progress-bar`) para representar el avance de presupuestos y deudas.

#### Scenario: Avance de presupuesto

- **WHEN** se muestra el avance de un presupuesto
- **THEN** se renderiza un medidor de Spectrum con su valor y, si aplica, el exceso

### Requirement: Tooltips con Spectrum

El sistema SHALL usar `sp-tooltip` para describir controles de solo icono (por ejemplo, toggles de tema/idioma y acciones de fila).

#### Scenario: Control de icono con tooltip

- **WHEN** el usuario pasa el cursor o enfoca un control de solo icono
- **THEN** aparece un `sp-tooltip` con su descripción

### Requirement: Indicador de estado de conexión con Spectrum

El sistema SHALL usar `sp-status-light` (o `sp-badge`) para indicar el estado de conexión de la app.

#### Scenario: Estado offline

- **WHEN** la aplicación pierde la conexión
- **THEN** se muestra un indicador de "sin conexión" con la primitiva de estado de Spectrum

### Requirement: Estado vacío con ilustración

El sistema SHALL usar `sp-illustrated-message` para los estados vacíos de listados y vistas sin datos.

#### Scenario: Listado sin resultados

- **WHEN** una vista no tiene datos que mostrar
- **THEN** se muestra un `sp-illustrated-message` con un mensaje y, si aplica, una acción

### Requirement: Separadores con Spectrum

El sistema SHALL usar `sp-divider` para separar secciones y filas donde haga falta.

#### Scenario: Separación de secciones

- **WHEN** una vista agrupa varias secciones
- **THEN** se separan con `sp-divider` en lugar de bordes decorativos propios

### Requirement: Tabla de datos con Spectrum

El sistema SHALL usar `sp-table` para listados tabulares (por ejemplo, movimientos y categorías), manteniendo las acciones por fila (editar/eliminar) y, en viewports pequeños, una representación legible equivalente.

#### Scenario: Listado tabular

- **WHEN** se muestra un listado de datos
- **THEN** se renderiza con `sp-table` con columnas y acciones por fila

#### Scenario: Viewport pequeño

- **WHEN** el viewport es reducido
- **THEN** el listado sigue siendo legible (columnas esenciales o representación alternativa)

## MODIFIED Requirements

### Requirement: finap-stat-card

El sistema SHALL proporcionar `<finap-stat-card>` para mostrar una métrica con etiqueta, valor y variación opcional, como superficie plana de Spectrum, usando `sp-badge` para la variación cuando exista.

#### Scenario: Métrica con valor

- **WHEN** se renderiza `<finap-stat-card label="Ingresos" value="+$6,200">`
- **THEN** se muestra la etiqueta y el valor

#### Scenario: Variación semántica

- **WHEN** la métrica es positiva o negativa
- **THEN** la variación se muestra con un `sp-badge` de la variante semántica correspondiente

### Requirement: finap-list-item

El sistema SHALL proporcionar `<finap-list-item>` para filas de datos con icono/avatar, título, subtítulo y valor a la derecha, con el estilo de fila de Spectrum (sin superficies redondeadas propias).

#### Scenario: Fila con valor

- **WHEN** se renderiza `<finap-list-item>` con título, subtítulo y valor
- **THEN** se muestran el título, el subtítulo y el valor alineado a la derecha

### Requirement: finap-chip

El sistema SHALL proporcionar `<finap-chip>` como etiqueta compacta (categoría o filtro), opcionalmente seleccionable, implementada sobre `sp-tag` y con los colores de estado de Spectrum (el punto de color de categoría se conserva para identificar la categoría).

#### Scenario: Chip de categoría

- **WHEN** se renderiza `<finap-chip>` con texto y color
- **THEN** se muestra una etiqueta compacta con el color de su categoría

#### Scenario: Chip seleccionable

- **WHEN** se renderiza `<finap-chip clickable selected>`
- **THEN** el chip se muestra con el estado seleccionado de Spectrum y es operable con teclado

### Requirement: finap-progress

El sistema SHALL proporcionar `<finap-progress>` sobre las primitivas de medición de Spectrum, mostrando el valor porcentual y el estado de exceso cuando corresponda.

#### Scenario: Progreso visible

- **WHEN** se renderiza `<finap-progress value="65">`
- **THEN** el medidor refleja el 65% de progreso
