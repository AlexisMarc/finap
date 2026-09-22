# Spec Delta

## Purpose

Define la autenticación de Finap: inicio de sesión con email y contraseña, gestión de la sesión (token y usuario) y cierre de sesión, para proteger las páginas de la aplicación y alimentar el perfil del usuario.

## ADDED Requirements

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
