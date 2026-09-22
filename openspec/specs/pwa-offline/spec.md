# PWA Offline Specification

## Purpose

Define las capacidades de aplicación web progresiva (PWA) de Finap: instalación, funcionamiento sin conexión, caché de activos y datos, cola de sincronización de cambios y aviso de actualizaciones.

## Requirements

### Requirement: Instalabilidad

El sistema SHALL proporcionar un manifest y un service worker que permitan instalar la aplicación como PWA.

#### Scenario: App instalable

- **WHEN** el navegador soporta instalación y se cumplen los requisitos
- **THEN** la aplicación se puede instalar en el dispositivo

### Requirement: Funcionamiento offline

El sistema SHALL permitir abrir y navegar la aplicación sin conexión, sirviendo el app shell desde la caché.

#### Scenario: Abrir sin conexión

- **WHEN** el usuario abre la app sin conexión
- **THEN** el app shell carga desde la caché y la navegación funciona

#### Scenario: Datos cacheados

- **WHEN** el usuario accede a una vista con datos previamente cargados y está sin conexión
- **THEN** se muestran los datos cacheados (stale) con indicación de que pueden estar desactualizados

### Requirement: Indicador de estado de conexión

El sistema SHALL indicar cuándo la aplicación está offline y cuándo ha vuelto la conexión.

#### Scenario: Cambio a offline

- **WHEN** se pierde la conexión
- **THEN** se muestra un indicador de "sin conexión"

### Requirement: Cola de sincronización

El sistema SHALL encolar los cambios realizados sin conexión y sincronizarlos al recuperar la red.

#### Scenario: Crear movimiento offline

- **WHEN** el usuario crea un movimiento sin conexión
- **THEN** el cambio se encola y se aplica localmente (optimista)

#### Scenario: Sincronizar al reconectar

- **WHEN** la conexión se restaura
- **THEN** los cambios en cola se envían al servidor y la interfaz se reconcilia

### Requirement: Actualización de la aplicación

El sistema SHALL avisar cuando hay una nueva versión disponible y permitir actualizar.

#### Scenario: Nueva versión disponible

- **WHEN** el service worker detecta una nueva versión
- **THEN** se muestra un aviso para actualizar y, al aceptar, se recarga con la nueva versión
