# App Shell Specification

## Purpose

Define el shell de la aplicación autenticada de Finap: el layout responsivo (sidebar en escritorio, bottom nav en móvil), el header con utilidades y la navegación entre las páginas de la app.

## Requirements

### Requirement: Layout responsivo del shell

El sistema SHALL proporcionar un layout de aplicación que muestra una barra lateral (sidebar) en escritorio y una barra inferior (bottom nav) en móvil.

#### Scenario: Sidebar en escritorio

- **WHEN** la viewport es de escritorio
- **THEN** se muestra la navegación como sidebar lateral

#### Scenario: Bottom nav en móvil

- **WHEN** la viewport es móvil
- **THEN** se muestra la navegación como barra inferior

### Requirement: Header de la aplicación

El sistema SHALL renderizar un header con el saludo al usuario, un campo de búsqueda y una acción para agregar un registro.

#### Scenario: Acción de agregar

- **WHEN** el usuario pulsa "Agregar"
- **THEN** se abre el formulario de nuevo registro

### Requirement: Navegación con ruta activa

El sistema SHALL mostrar las secciones (Inicio, Análisis, Deudas, Movimientos, Ajustes) e indicar cuál está activa según la ruta actual.

#### Scenario: Ruta activa resaltada

- **WHEN** el usuario navega a una sección
- **THEN** el elemento de navegación correspondiente se muestra como activo

#### Scenario: Navegar a una sección

- **WHEN** el usuario pulsa una sección
- **THEN** la aplicación navega a la ruta correspondiente

### Requirement: Menú de usuario

El sistema SHALL mostrar el perfil del usuario (nombre, email, avatar) y permitir cerrar sesión.

#### Scenario: Cerrar sesión desde el shell

- **WHEN** el usuario elige "Cerrar sesión" en el menú
- **THEN** la sesión finaliza y se redirige a la landing/login
