# Dashboard Specification

## Purpose

Define la página de inicio (dashboard) de Finap, que presenta el resumen financiero del usuario —balance, ingresos, gastos y deudas—, el desglose de gastos por categoría y los movimientos recientes.

## Requirements

### Requirement: Saludo personalizado

El sistema SHALL mostrar un único saludo con el nombre del usuario (en el header), sin duplicarlo en el dashboard.

#### Scenario: Saludo con el nombre

- **WHEN** el usuario abre la app autenticada
- **THEN** se muestra un saludo con el nombre del usuario de la sesión

#### Scenario: Saludo único

- **WHEN** se renderiza el dashboard
- **THEN** no se muestra un segundo saludo (el saludo está en el header)

### Requirement: Resumen de balance

El sistema SHALL mostrar el balance total y su variación respecto al periodo anterior.

#### Scenario: Balance y variación

- **WHEN** se renderiza el dashboard
- **THEN** se muestra el balance total y su variación (positiva o negativa)

### Requirement: Estadísticas del mes

El sistema SHALL mostrar tarjetas con los ingresos, gastos y deuda total del mes.

#### Scenario: Tarjetas de estadística

- **WHEN** se renderiza el dashboard
- **THEN** se muestran los ingresos, los gastos y la deuda total del mes

### Requirement: Gastos por categoría

El sistema SHALL mostrar el desglose de gastos por categoría con su importe y porcentaje.

#### Scenario: Desglose por categoría

- **WHEN** se renderiza el dashboard
- **THEN** se muestran las categorías con su importe y porcentaje del total

### Requirement: Deudas pendientes

El sistema SHALL mostrar un resumen acotado de las deudas pendientes (las primeras N) con su progreso de pago y un enlace para ver todas, en lugar de listarlas todas.

#### Scenario: Deudas con progreso

- **WHEN** se renderiza el dashboard
- **THEN** se muestran las primeras deudas con su importe pagado y su progreso

#### Scenario: Resumen acotado

- **WHEN** hay más deudas de las que se muestran
- **THEN** se muestra un enlace para ver todas las deudas

### Requirement: Movimientos recientes

El sistema SHALL mostrar los últimos movimientos con categoría, importe y fecha, y un enlace a ver todos.

#### Scenario: Últimos movimientos

- **WHEN** se renderiza el dashboard
- **THEN** se muestran los últimos movimientos ordenados por fecha

### Requirement: Estados de carga, vacío y error

El sistema SHALL mostrar estados de carga, vacío y error al obtener los datos del dashboard.

#### Scenario: Estado de error

- **WHEN** falla la obtención de datos
- **THEN** se muestra un mensaje de error con opción de reintentar

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
