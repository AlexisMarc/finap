# Dashboard Specification

## Purpose

Define la página de inicio (dashboard) de Finap, que presenta el resumen financiero del usuario —balance, ingresos, gastos y deudas—, el desglose de gastos por categoría y los movimientos recientes.

## Requirements

### Requirement: Saludo personalizado

El sistema SHALL mostrar un saludo personalizado con el nombre del usuario y la fecha/periodo actual.

#### Scenario: Saludo con el nombre

- **WHEN** se renderiza el dashboard
- **THEN** se muestra un saludo con el nombre del usuario de la sesión

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

El sistema SHALL mostrar un resumen de las deudas pendientes con su progreso de pago.

#### Scenario: Deudas con progreso

- **WHEN** se renderiza el dashboard
- **THEN** se muestran las deudas con su importe pagado y su progreso

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
