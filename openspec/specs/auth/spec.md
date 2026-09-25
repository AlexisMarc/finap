# Auth Specification

## Purpose

Define la autenticación de Finap: inicio de sesión con email y contraseña, gestión de la sesión (token y usuario) y cierre de sesión, para proteger las páginas de la aplicación y alimentar el perfil del usuario.

## Requirements

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión con email y contraseña, mostrando el estado de carga y los errores de validación.

#### Scenario: Login correcto

- **WHEN** el usuario introduce credenciales válidas
- **THEN** se crea la sesión y se redirige a la aplicación

#### Scenario: Credenciales inválidas

- **WHEN** el usuario introduce credenciales inválidas
- **THEN** se muestra un mensaje de error y no se crea la sesión

#### Scenario: Validación de campos

- **WHEN** el usuario envía el formulario con campos vacíos o email inválido
- **THEN** se muestran errores de validación y no se envía la petición

### Requirement: Presentación de la página de login

El sistema SHALL presentar la página de login con una imagen cálida (naranja) de fondo en el lateral izquierdo, mostrando el logo, el nombre y un eslogan; a la derecha, un recuadro con el título "Inicio de sesión", los campos de email y contraseña, el botón de acción azul y un botón volver en su interior. Además SHALL incluir un aviso de creación de cuenta con enlace de contacto por correo dentro de una barra de acción de Spectrum (`sp-action-bar`).

#### Scenario: Lateral de marca

- **WHEN** se renderiza la página de login
- **THEN** se muestra una imagen naranja con el logo, el nombre de la app y un eslogan

#### Scenario: Recuadro de inicio de sesión

- **WHEN** se renderiza la página de login
- **THEN** se muestra un recuadro con el título, los campos de email y contraseña y el botón azul

#### Scenario: Botón volver

- **WHEN** el usuario pulsa el botón volver dentro del recuadro
- **THEN** se navega de vuelta a la landing

#### Scenario: Aviso de creación de cuenta

- **WHEN** se renderiza la página de login
- **THEN** aparece una barra de acción (`sp-action-bar`) con el aviso de que crear la cuenta estará disponible pronto y un enlace `mailto` de contacto

#### Scenario: Diseño de escritorio

- **WHEN** la viewport es de escritorio
- **THEN** la página se divide en dos columnas (imagen a la izquierda, formulario a la derecha)

#### Scenario: Diseño móvil

- **WHEN** la viewport es móvil
- **THEN** el lateral y el formulario se apilan en una columna

### Requirement: Gestión de sesión

El sistema SHALL persistir la sesión (token y usuario) y restaurarla al cargar la aplicación.

#### Scenario: Restaurar sesión

- **WHEN** la aplicación se carga y existe una sesión guardada
- **THEN** el usuario se considera autenticado sin volver a iniciar sesión

#### Scenario: Exponer el usuario actual

- **WHEN** un componente necesita el usuario actual
- **THEN** puede consultar el nombre, email y avatar de la sesión

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión, limpiar el estado y redirigir a la landing/login.

#### Scenario: Cerrar sesión

- **WHEN** el usuario cierra sesión
- **THEN** la sesión se elimina y se redirige a la landing/login
