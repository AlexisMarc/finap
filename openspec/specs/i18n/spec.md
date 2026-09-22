# i18n Specification

## Purpose

Define el sistema de internacionalización de Finap: traducciones en español e inglés, resolución y persistencia del idioma, y un mecanismo de traducción reactivo para que la interfaz se re-traduzca al cambiar el idioma.

## Requirements

### Requirement: Traducciones en español e inglés

El sistema SHALL proporcionar diccionarios de traducción en español (`es`) e inglés (`en`) con todas las cadenas visibles de la interfaz.

#### Scenario: Idiomas disponibles

- **WHEN** se consultan los idiomas soportados
- **THEN** están disponibles al menos español e inglés

#### Scenario: Cadenas traducidas

- **WHEN** se pide una clave de traducción en español e inglés
- **THEN** cada idioma devuelve su texto correspondiente

### Requirement: Resolución y persistencia del idioma

El sistema SHALL resolver el idioma activo (por defecto español) y persistir la elección del usuario entre sesiones.

#### Scenario: Idioma por defecto

- **WHEN** la aplicación se carga sin preferencia explícita del usuario
- **THEN** se aplica el idioma español

#### Scenario: Cambio de idioma persistido

- **WHEN** el usuario cambia el idioma
- **THEN** la elección se guarda y se reaplica en la siguiente carga

### Requirement: Traducción reactiva

El sistema SHALL notificar el cambio de idioma para que los componentes se re-traduzcan sin recargar la página.

#### Scenario: Cambio de idioma en vivo

- **WHEN** el usuario cambia el idioma
- **THEN** los textos visibles se actualizan al nuevo idioma sin recargar

### Requirement: Selector de idioma

El sistema SHALL proporcionar un selector de idioma (componente `finap-language-toggle`) que permite alternar entre español e inglés.

#### Scenario: Alternar idioma

- **WHEN** el usuario activa el selector de idioma
- **THEN** la aplicación cambia entre español e inglés
