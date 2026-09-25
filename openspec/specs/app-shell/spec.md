# App Shell Specification

## Purpose

Define el shell de la aplicación autenticada de Finap: el layout responsivo (navegación lateral con Spectrum en escritorio, barra inferior en móvil), el header con utilidades y la navegación entre las páginas de la app.

## Requirements

### Requirement: Layout responsivo del shell

El sistema SHALL proporcionar un layout de aplicación con navegación lateral implementada con `sp-sidenav`/`sp-sidenav-item` en escritorio y una barra inferior en móvil, ambas con componentes y tokens de Spectrum.

#### Scenario: Sidebar en escritorio

- **WHEN** la viewport es de escritorio
- **THEN** se muestra la navegación como `sp-sidenav` lateral

#### Scenario: Icono y texto alineados

- **WHEN** se renderiza la navegación lateral
- **THEN** el icono y el texto de cada item quedan alineados, sin desborde visible en modo claro u oscuro

#### Scenario: Bottom nav en móvil

- **WHEN** la viewport es móvil
- **THEN** se muestra la navegación como barra inferior con componentes y tokens de Spectrum

### Requirement: Chrome según la página activa

El sistema SHALL mostrar el chrome de la aplicación (sidebar/topbar/bottom nav) cuando la página activa es una página de la app, y solo el contenido cuando es pública, determinándolo por la página activa de la aplicación y no por el orden en que las páginas quedaron montadas.

#### Scenario: Varias páginas montadas tras navegar

- **WHEN** hay varias páginas montadas en el contenedor de la app (las anteriores marcadas como inactivas) y la activa es una página de la app (p. ej. Dashboard)
- **THEN** el shell muestra el chrome de la aplicación (navegación y header)

#### Scenario: Página pública activa

- **WHEN** la página activa es pública (landing o login)
- **THEN** el shell no muestra el chrome de la aplicación

### Requirement: Chrome en Categorías y Presupuestos

El sistema SHALL mostrar el chrome de la aplicación en las páginas de Categorías y Presupuestos, igual que en el resto de páginas autenticadas.

#### Scenario: Navegar a Categorías

- **WHEN** el usuario navega a Categorías (o Presupuestos) estando autenticado
- **THEN** la página se muestra dentro del chrome de la aplicación

### Requirement: Header de la aplicación

El sistema SHALL renderizar un header con un saludo único al usuario (tipografía de Spectrum), un campo de búsqueda implementado con `sp-search` conectado a Movimientos y una acción para agregar un registro.

#### Scenario: Saludo sin duplicación

- **WHEN** hay un usuario con sesión
- **THEN** el header muestra un único saludo con su nombre (sin repetir la palabra de saludo)

#### Scenario: Acción de agregar

- **WHEN** el usuario pulsa "Agregar"
- **THEN** se abre el formulario de nuevo registro

#### Scenario: Acciones agrupadas

- **WHEN** se renderiza el header
- **THEN** "Agregar" y las acciones relacionadas se muestran agrupadas (`sp-action-group`), sin botones sueltos mal ubicados

#### Scenario: Enviar búsqueda

- **WHEN** el usuario envía un término desde el campo de búsqueda (`sp-search`) del header
- **THEN** la aplicación navega a Movimientos con el filtro de búsqueda aplicado

### Requirement: Búsqueda del header conectada a Movimientos

El sistema SHALL hacer funcional el campo de búsqueda del header: al enviar una búsqueda se navega a la página de Movimientos con ese término aplicado como filtro.

#### Scenario: Buscar desde el header

- **WHEN** el usuario escribe un término en el campo de búsqueda del header y envía la búsqueda
- **THEN** la aplicación navega a Movimientos y la lista se filtra por ese término

### Requirement: Navegación con ruta activa

El sistema SHALL mostrar las secciones (Inicio, Análisis, Deudas, Movimientos, Ajustes) con `sp-sidenav-item` e indicar cuál está activa según la ruta actual con el estado seleccionado de Spectrum.

#### Scenario: Ruta activa resaltada

- **WHEN** el usuario navega a una sección
- **THEN** el elemento de navegación correspondiente se muestra como seleccionado (`sp-sidenav-item`)

#### Scenario: Navegar a una sección

- **WHEN** el usuario pulsa una sección
- **THEN** la aplicación navega a la ruta correspondiente

### Requirement: Menú de usuario

El sistema SHALL mostrar el perfil del usuario (nombre, email, avatar) y permitir acciones rápidas de ajustes y cerrar sesión, implementado sobre `sp-action-menu` de Spectrum.

#### Scenario: Nombre accesible del menú de usuario

- **WHEN** el botón del menú de usuario recibe foco o es anunciado por tecnologías asistivas
- **THEN** su nombre accesible expone el nombre y email una sola vez, sin duplicaciones

#### Scenario: Acciones rápidas de ajustes

- **WHEN** el usuario abre el menú de usuario
- **THEN** puede cambiar tema, moneda e idioma, y ver su avatar/nombre

#### Scenario: Cerrar sesión desde el shell

- **WHEN** el usuario elige "Cerrar sesión" en el menú
- **THEN** la sesión finaliza y se redirige a la landing/login

### Requirement: Migas de pan

El sistema SHALL mostrar migas de pan con `sp-breadcrumbs`/`sp-breadcrumb-item` para que el usuario sepa dónde está y qué está haciendo.

#### Scenario: Ubicación visible

- **WHEN** el usuario está en una vista de la app
- **THEN** se muestran migas de pan con la sección actual

### Requirement: Ayuda con tour de pasos

El sistema SHALL ofrecer un botón de ayuda que abre un tour de pasos con `sp-coachmark` explicando las secciones de la interfaz.

#### Scenario: Abrir la ayuda

- **WHEN** el usuario pulsa el botón de ayuda
- **THEN** se muestra un tour de pasos que guía por las secciones
