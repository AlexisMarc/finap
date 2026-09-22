# App Bootstrap Specification

## Purpose

Define el arranque de la SPA con Open Cells: inicialización de la aplicación (`startApp`), definición de rutas y render de la landing page como ruta raíz.

## Requirements

### Requirement: Arranque de la aplicación

El sistema SHALL inicializar la SPA mediante `startApp` de Open Cells, renderizando el contenido en un nodo principal del documento.

#### Scenario: Aplicación arranca

- **WHEN** se carga la aplicación en el navegador
- **THEN** la SPA se inicializa y renderiza el contenido en el nodo principal

### Requirement: Ruta raíz hacia la landing

El sistema SHALL mapear la ruta raíz (`/`) a la landing page.

#### Scenario: Navegación a la raíz

- **WHEN** el usuario navega a `/`
- **THEN** se renderiza la landing page

### Requirement: Definición declarativa de rutas

El sistema SHALL definir las rutas de forma declarativa (nombre, patrón y componente asociado) para que sean extensibles con nuevas páginas.

#### Scenario: Rutas declarativas

- **WHEN** se define una nueva ruta
- **THEN** se asocia un nombre, un patrón de URL y un componente sin modificar el bootstrap

### Requirement: Rutas de la aplicación

El sistema SHALL definir rutas para las páginas de la aplicación (`/dashboard`, `/analysis`, `/debts`, `/movements`, `/settings`), cargadas de forma perezosa.

#### Scenario: Navegación a una página

- **WHEN** el usuario navega a `/dashboard`
- **THEN** se renderiza la página del dashboard

### Requirement: Guard de sesión

El sistema SHALL redirigir a la landing/login cuando el usuario no tiene sesión y permitir el acceso a las páginas de la app cuando sí la tiene.

#### Scenario: Acceso sin sesión

- **WHEN** el usuario sin sesión intenta acceder a una ruta de la app
- **THEN** es redirigido a la landing/login

#### Scenario: Acceso con sesión

- **WHEN** el usuario con sesión navega a una ruta de la app
- **THEN** accede a la página correspondiente
