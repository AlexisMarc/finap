# Settings Specification

## Purpose

Define la página de ajustes de Finap, que agrupa el perfil del usuario, las preferencias (tema, idioma y moneda), la gestión de la sesión y los accesos a categorías y presupuestos.

## Requirements

### Requirement: Perfil del usuario

El sistema SHALL mostrar el perfil del usuario (nombre, email y avatar).

#### Scenario: Ver perfil

- **WHEN** el usuario abre Ajustes
- **THEN** se muestran su nombre, email y avatar

### Requirement: Preferencia de tema

El sistema SHALL permitir cambiar entre tema claro y oscuro desde Ajustes con un botón con icono (sol/luna), en lugar de un switch.

#### Scenario: Cambiar tema

- **WHEN** el usuario cambia el tema en Ajustes
- **THEN** la preferencia se aplica y se persiste

#### Scenario: Control con icono

- **WHEN** se renderiza la preferencia de tema
- **THEN** se muestra un botón con icono que indica el tema actual

### Requirement: Preferencia de idioma

El sistema SHALL permitir cambiar el idioma (español/inglés) desde Ajustes.

#### Scenario: Cambiar idioma

- **WHEN** el usuario cambia el idioma en Ajustes
- **THEN** la preferencia se aplica y se persiste

### Requirement: Preferencia de moneda

El sistema SHALL permitir elegir la moneda de visualización.

#### Scenario: Cambiar moneda

- **WHEN** el usuario cambia la moneda
- **THEN** los importes se muestran en la moneda elegida

### Requirement: Sesión

El sistema SHALL permitir cerrar sesión desde Ajustes.

#### Scenario: Cerrar sesión

- **WHEN** el usuario cierra sesión en Ajustes
- **THEN** la sesión se elimina y se redirige a la landing/login

### Requirement: Accesos a categorías y presupuestos

El sistema SHALL ofrecer accesos a la gestión de categorías y presupuestos.

#### Scenario: Ir a categorías

- **WHEN** el usuario selecciona "Categorías"
- **THEN** navega a la gestión de categorías
