# Spec Delta

## MODIFIED Requirements

### Requirement: finap-stat-card

El sistema SHALL proporcionar `<finap-stat-card>` para mostrar una métrica con etiqueta, valor y variación opcional (positiva/negativa), estilizado con tokens y tipografía de Spectrum.

#### Scenario: Métrica con valor

- **WHEN** se renderiza `<finap-stat-card label="Ingresos" value="+$6,200">`
- **THEN** se muestra la etiqueta y el valor

#### Scenario: Variación semántica

- **WHEN** la métrica es positiva o negativa
- **THEN** el color de la variación usa el token semántico correspondiente

### Requirement: finap-list-item

El sistema SHALL proporcionar `<finap-list-item>` para filas de lista con icono/avatar, título, subtítulo y valor a la derecha, estilizado con tokens de Spectrum.

#### Scenario: Fila con valor

- **WHEN** se renderiza `<finap-list-item>` con título, subtítulo y valor
- **THEN** se muestran el título, el subtítulo y el valor alineado a la derecha

### Requirement: finap-progress

El sistema SHALL proporcionar `<finap-progress>` que muestra una barra de progreso con su valor porcentual, implementado sobre las primitivas de progreso de Spectrum (`sp-progress-bar`).

#### Scenario: Progreso visible

- **WHEN** se renderiza `<finap-progress value="65">`
- **THEN** la barra refleja el 65% de progreso

### Requirement: finap-chip

El sistema SHALL proporcionar `<finap-chip>` como etiqueta compacta (categoría o filtro), opcionalmente seleccionable, implementada sobre `sp-tag`.

#### Scenario: Chip de categoría

- **WHEN** se renderiza `<finap-chip>` con texto y color
- **THEN** se muestra una etiqueta compacta con ese color

#### Scenario: Chip seleccionable

- **WHEN** se renderiza `<finap-chip clickable selected>`
- **THEN** el chip se muestra con el estado seleccionado de Spectrum y es operable con teclado

### Requirement: finap-avatar

El sistema SHALL proporcionar `<finap-avatar>` que muestra las iniciales del usuario o una imagen, implementado sobre `sp-avatar`.

#### Scenario: Iniciales

- **WHEN** se renderiza `<finap-avatar name="Marcos García">`
- **THEN** se muestran las iniciales del nombre

### Requirement: finap-input

El sistema SHALL proporcionar `<finap-input>` como campo de formulario con etiqueta, soportando texto, número, fecha y área de texto, con estado de error, implementado sobre `sp-textfield`, `sp-number-field` y `sp-textarea`.

#### Scenario: Campo con etiqueta

- **WHEN** se renderiza `<finap-input label="Importe" type="number">`
- **THEN** se muestra la etiqueta y un campo numérico

#### Scenario: Estado de error

- **WHEN** el campo es inválido
- **THEN** se muestra el mensaje de error asociado al campo

### Requirement: finap-select

El sistema SHALL proporcionar `<finap-select>` como selector de opciones con etiqueta, implementado sobre `sp-picker`.

#### Scenario: Opciones desplegables

- **WHEN** se renderiza `<finap-select>` con opciones
- **THEN** el usuario puede seleccionar una de las opciones

### Requirement: finap-modal

El sistema SHALL proporcionar `<finap-modal>` como contenedor modal (diálogo) con título, contenido y acciones, cerrable y accesible, implementado sobre `sp-dialog`.

#### Scenario: Modal abierto

- **WHEN** se abre `<finap-modal>`
- **THEN** se muestra como diálogo con foco atrapado y cierre por Escape o botón

#### Scenario: Modal cerrado

- **WHEN** el modal está cerrado
- **THEN** el diálogo no está visible y el contenido subyacente es interactivo

### Requirement: Consumo de tokens de diseño

Todos los componentes de app SHALL usar los tokens de diseño (`--spectrum-*` o sus alias `--finap-*`) para color, tipografía, espaciado, radio y elevación, sin valores hardcodeados.

#### Scenario: Estilos derivados de tokens

- **WHEN** se cambia un token (por ejemplo, al alternar el tema)
- **THEN** los componentes de app reflejan el nuevo valor automáticamente
