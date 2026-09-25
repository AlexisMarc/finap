# App Components Specification

## Purpose

Define los componentes reutilizables de aplicación que Finap conserva (campos de formulario) y las primitivas de Spectrum Web Components con las que se componen las vistas (tablas, badges, medidores, diálogos modales y layout con grid).

## Requirements

### Requirement: finap-input

El sistema SHALL proporcionar `<finap-input>` como campo de formulario con etiqueta, soportando texto, número, fecha y área de texto, con estado de error, implementado sobre `sp-textfield` y `sp-number-field` (texto/número) y con `textarea`/`date` como controles nativos estilizados con tokens; conserva el evento `finap-input` que consumen los formularios.

#### Scenario: Campo con etiqueta

- **WHEN** se renderiza `<finap-input label="Importe" type="number">`
- **THEN** se muestra la etiqueta y un campo numérico

#### Scenario: Estado de error

- **WHEN** el campo es inválido
- **THEN** se muestra el mensaje de error asociado al campo

### Requirement: finap-select

El sistema SHALL proporcionar `<finap-select>` como selector de opciones con etiqueta, implementado sobre `sp-picker`; conserva el evento `finap-change` que consumen los formularios.

#### Scenario: Opciones desplegables

- **WHEN** se renderiza `<finap-select>` con opciones
- **THEN** el usuario puede seleccionar una de las opciones

### Requirement: Consumo de tokens de diseño

Todos los componentes de app que se conservan SHALL usar los tokens de diseño de Spectrum (`--spectrum-*` o sus alias `--finap-*`) para color, tipografía, espaciado, radio y elevación, sin valores hardcodeados.

#### Scenario: Estilos derivados de tokens

- **WHEN** se cambia un token (por ejemplo, al alternar el tema)
- **THEN** los componentes de app reflejan el nuevo valor automáticamente

### Requirement: Listados con sp-table

El sistema SHALL mostrar los listados de datos (movimientos y categorías) con `sp-table` de Spectrum, con columnas y acciones por fila, y una representación legible en viewports pequeños.

#### Scenario: Listado tabular

- **WHEN** se muestra un listado de datos
- **THEN** se renderiza con `sp-table` con columnas y acciones por fila

#### Scenario: Viewport pequeño

- **WHEN** el viewport es reducido
- **THEN** el listado conserva las columnas esenciales y sigue siendo legible

### Requirement: Badges con sp-badge

El sistema SHALL usar `sp-badge` para variaciones y estados (tendencia de métricas, estado de deuda, exceso de presupuesto).

#### Scenario: Tendencia con badge

- **WHEN** se muestra una variación positiva o negativa
- **THEN** se renderiza con un `sp-badge` de la variante correspondiente

#### Scenario: Estado de deuda

- **WHEN** una deuda está pagada o pendiente
- **THEN** se indica con un `sp-badge` coherente con el estado

### Requirement: Medidores con primitivas de Spectrum

El sistema SHALL representar el avance de presupuestos y deudas con las primitivas de medición de Spectrum (`sp-meter`/`sp-progress-bar`).

#### Scenario: Avance de presupuesto

- **WHEN** se muestra el avance de un presupuesto
- **THEN** se renderiza un medidor de Spectrum con su valor y, si aplica, el exceso

### Requirement: Diálogos modales con sp-dialog-wrapper

El sistema SHALL mostrar los modales con el componente de diálogo modal de Spectrum (`sp-dialog-wrapper`), que gestiona overlay, posición, foco y cierre, sin wrapper propio.

#### Scenario: Abrir un modal

- **WHEN** se abre un diálogo modal (nuevo registro, editar, confirmar borrado)
- **THEN** se muestra con `sp-dialog-wrapper` con su overlay y foco atrapado

#### Scenario: Cerrar un modal

- **WHEN** el usuario cierra con Escape, botón de cierre o acción de cancelar
- **THEN** el diálogo se cierra y la vista recupera la interacción

### Requirement: Layout de vistas con CSS Grid

El sistema SHALL estructurar el layout de las vistas (chrome, dashboard y páginas) con CSS Grid, usando los tokens de espaciado de Spectrum para gaps y columnas responsivas, en lugar de layouts ad-hoc.

#### Scenario: Layout con grid

- **WHEN** se renderiza una vista
- **THEN** su estructura usa CSS Grid con gaps/columnas basados en tokens de Spectrum

#### Scenario: Grid responsivo

- **WHEN** la viewport cruza un breakpoint
- **THEN** las columnas del grid se reorganizan de forma coherente
