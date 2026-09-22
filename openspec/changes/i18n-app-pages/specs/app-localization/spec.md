# Spec Delta

## Purpose

Extiende la internacionalización a todas las páginas y componentes de la aplicación, para que el idioma activo (español/inglés) se aplique a los textos, la navegación, los formularios y el formato de datos en toda la app.

## ADDED Requirements

### Requirement: Cobertura de las páginas de la aplicación

Todas las páginas de la aplicación (dashboard, movimientos, transacciones, categorías, presupuestos, análisis, deudas, ajustes y login) SHALL mostrar sus textos usando el sistema i18n, sin cadenas hardcodeadas.

#### Scenario: Página en español

- **WHEN** el idioma activo es español
- **THEN** la página muestra sus textos en español

#### Scenario: Página en inglés

- **WHEN** el idioma activo es inglés
- **THEN** la página muestra sus textos en inglés

### Requirement: Navegación y shell localizados

El shell de la aplicación SHALL localizar la navegación, el saludo, las acciones (buscar, agregar) y el menú de usuario.

#### Scenario: Navegación en el idioma activo

- **WHEN** se cambia el idioma
- **THEN** las etiquetas de navegación y el menú de usuario se muestran en el idioma activo

### Requirement: Formularios y mensajes localizados

Los formularios SHALL localizar etiquetas, botones de acción y mensajes de validación/error.

#### Scenario: Etiquetas y botones traducidos

- **WHEN** se abre un formulario (registro, categoría, deuda, pago, login)
- **THEN** sus etiquetas y botones aparecen en el idioma activo

#### Scenario: Mensajes de error traducidos

- **WHEN** un formulario muestra un error de validación
- **THEN** el mensaje aparece en el idioma activo

### Requirement: Formato localizado

El sistema SHALL formatear fechas y números según el idioma activo (los importes y porcentajes usan `Intl` con la moneda activa).

#### Scenario: Fechas en el idioma activo

- **WHEN** se muestra una fecha relativa o corta
- **THEN** se formatea según el idioma activo (p. ej. "Hoy"/"Today")

### Requirement: Cambio de idioma reactivo en toda la app

El sistema SHALL actualizar todas las vistas visibles al cambiar el idioma, sin recargar la página.

#### Scenario: Cambio en vivo

- **WHEN** el usuario cambia de idioma mientras navega
- **THEN** la vista activa se re-traduce sin recargar
