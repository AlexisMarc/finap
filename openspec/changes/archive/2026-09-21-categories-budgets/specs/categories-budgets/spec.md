# Spec Delta

## Purpose

Define la gestión de categorías y presupuestos de Finap: crear, editar y eliminar categorías (con color e icono) y definir un presupuesto por categoría y mes con seguimiento del gasto.

## ADDED Requirements

### Requirement: Listado de categorías

El sistema SHALL mostrar las categorías con su color, icono y gasto asociado.

#### Scenario: Ver categorías

- **WHEN** el usuario abre la gestión de categorías
- **THEN** se muestran las categorías con su color e icono

### Requirement: Crear categoría

El sistema SHALL permitir crear una categoría con nombre, color e icono.

#### Scenario: Crear categoría válida

- **WHEN** el usuario introduce nombre, color e icono y guarda
- **THEN** la categoría se crea y aparece en la lista

#### Scenario: Nombre requerido

- **WHEN** el usuario guarda sin nombre
- **THEN** se muestra un error y no se crea la categoría

### Requirement: Editar categoría

El sistema SHALL permitir editar una categoría existente.

#### Scenario: Editar categoría

- **WHEN** el usuario edita una categoría y guarda
- **THEN** los cambios se persisten y se reflejan en la interfaz

### Requirement: Eliminar categoría

El sistema SHALL permitir eliminar una categoría con confirmación y advertir de movimientos asociados.

#### Scenario: Eliminar con advertencia

- **WHEN** el usuario elimina una categoría con movimientos asociados
- **THEN** se le advierte antes de confirmar

### Requirement: Presupuesto por categoría

El sistema SHALL permitir definir un presupuesto (límite) por categoría y mes.

#### Scenario: Definir presupuesto

- **WHEN** el usuario define un límite para una categoría y mes
- **THEN** el presupuesto se guarda y se muestra su progreso

### Requirement: Progreso del presupuesto

El sistema SHALL mostrar el gasto frente al límite y avisar cuando se excede.

#### Scenario: Presupuesto excedido

- **WHEN** el gasto de la categoría supera el límite
- **THEN** se muestra un aviso visual de exceso
