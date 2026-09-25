# Analysis Specification

## Purpose

Define la página de análisis de Finap, que presenta métricas y gráficas de la evolución financiera del usuario por periodo (ingresos, gastos y deudas), con comparación respecto al periodo anterior.

## Requirements

### Requirement: Selector de periodo

El sistema SHALL permitir elegir el periodo de análisis (mes, trimestre o año) con los controles agrupados (`sp-action-group`).

#### Scenario: Cambiar periodo

- **WHEN** el usuario selecciona un periodo
- **THEN** las métricas y gráficas se actualizan para ese periodo

#### Scenario: Periodos agrupados

- **WHEN** se renderiza el selector de periodo
- **THEN** los periodos se muestran agrupados como un único control, sin elementos sueltos

### Requirement: Selector de tipo de gráfica

El sistema SHALL permitir elegir el tipo de gráfica de evolución y de categorías (barras, líneas o pastel).

#### Scenario: Cambiar tipo de gráfica

- **WHEN** el usuario cambia el tipo de gráfica
- **THEN** la gráfica se redibuja con el tipo elegido

### Requirement: Métricas del periodo

El sistema SHALL mostrar las métricas clave del periodo (ingresos, gastos, deuda y balance).

#### Scenario: Métricas visibles

- **WHEN** se renderiza el análisis
- **THEN** se muestran los totales de ingresos, gastos, deuda y balance del periodo

### Requirement: Gráfica de evolución

El sistema SHALL mostrar la evolución de ingresos y gastos a lo largo del periodo.

#### Scenario: Evolución temporal

- **WHEN** el usuario ve la gráfica de evolución
- **THEN** se muestran las series de ingresos y gastos por intervalo de tiempo

### Requirement: Gráfica por categoría

El sistema SHALL mostrar la distribución de gastos por categoría.

#### Scenario: Distribución por categoría

- **WHEN** el usuario ve la gráfica por categoría
- **THEN** se muestra la proporción de cada categoría sobre el total

### Requirement: Comparación con el periodo anterior

El sistema SHALL mostrar la variación respecto al periodo anterior.

#### Scenario: Variación

- **WHEN** el usuario ve las métricas
- **THEN** se indica la variación porcentual frente al periodo anterior

### Requirement: Adaptación al tema

El sistema SHALL adaptar las gráficas al tema claro/oscuro.

#### Scenario: Gráfica en modo oscuro

- **WHEN** se activa el tema oscuro
- **THEN** los colores de las gráficas se adaptan al tema oscuro
