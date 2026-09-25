# Spec Delta

## MODIFIED Requirements

### Requirement: Layout responsivo del shell

El sistema SHALL proporcionar un layout de aplicación que muestra una navegación lateral implementada con `sp-sidenav` en escritorio y una barra inferior en móvil, ambas con estilos de Spectrum.

#### Scenario: Sidebar en escritorio

- **WHEN** la viewport es de escritorio
- **THEN** se muestra la navegación como `sp-sidenav` lateral

#### Scenario: Bottom nav en móvil

- **WHEN** la viewport es móvil
- **THEN** se muestra la navegación como barra inferior con estilos de Spectrum

### Requirement: Header de la aplicación

El sistema SHALL renderizar un header con un saludo único al usuario (tipografía de Spectrum), un campo de búsqueda implementado con `sp-search` conectado a Movimientos y una acción para agregar un registro.

#### Scenario: Saludo sin duplicación

- **WHEN** hay un usuario con sesión
- **THEN** el header muestra un único saludo con su nombre (sin repetir la palabra de saludo)

#### Scenario: Acción de agregar

- **WHEN** el usuario pulsa "Agregar"
- **THEN** se abre el formulario de nuevo registro

#### Scenario: Enviar búsqueda

- **WHEN** el usuario envía un término desde el campo de búsqueda (`sp-search`) del header
- **THEN** la aplicación navega a Movimientos con el filtro de búsqueda aplicado

### Requirement: Navegación con ruta activa

El sistema SHALL mostrar las secciones (Inicio, Análisis, Deudas, Movimientos, Ajustes) con `sp-sidenav-item` e indicar cuál está activa según la ruta actual con el estado seleccionado de Spectrum.

#### Scenario: Ruta activa resaltada

- **WHEN** el usuario navega a una sección
- **THEN** el elemento de navegación correspondiente se muestra como seleccionado (`sp-sidenav-item`)

#### Scenario: Navegar a una sección

- **WHEN** el usuario pulsa una sección
- **THEN** la aplicación navega a la ruta correspondiente
