# Spec Delta

## ADDED Requirements

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
