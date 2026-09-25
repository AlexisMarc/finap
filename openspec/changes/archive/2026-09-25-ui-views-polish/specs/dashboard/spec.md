# Spec Delta

## ADDED Requirements

### Requirement: Sugerencias con carrusel

El sistema SHALL mostrar al final del dashboard una sección de sugerencias con tarjetas y un carrusel (CSS scroll-snap) de recomendaciones.

#### Scenario: Sugerencias visibles

- **WHEN** se renderiza el dashboard
- **THEN** aparece una sección final con tarjetas de sugerencias y un carrusel

### Requirement: Asistente flotante

El sistema SHALL presentar el asistente de IA como un chat flotante accesible (botón que abre un panel), integrado con el sistema, en lugar de un formulario suelto al final de la página.

#### Scenario: Abrir el asistente

- **WHEN** el usuario pulsa el acceso al asistente
- **THEN** se abre un panel de chat flotante con la conversación

## MODIFIED Requirements

### Requirement: Saludo personalizado

El sistema SHALL mostrar un único saludo con el nombre del usuario (sin duplicarlo con el saludo del header).

#### Scenario: Saludo con el nombre

- **WHEN** se renderiza el dashboard
- **THEN** se muestra un saludo con el nombre del usuario de la sesión

#### Scenario: Saludo único

- **WHEN** se renderiza el dashboard
- **THEN** no se repite el saludo que ya muestra el header

### Requirement: Deudas pendientes

El sistema SHALL mostrar un resumen acotado de las deudas pendientes (las primeras N) con su progreso de pago y un enlace para ver todas, en lugar de listarlas todas.

#### Scenario: Deudas con progreso

- **WHEN** se renderiza el dashboard
- **THEN** se muestran las primeras deudas con su importe pagado y su progreso

#### Scenario: Resumen acotado

- **WHEN** hay más deudas de las que se muestran
- **THEN** se muestra un enlace para ver todas las deudas
