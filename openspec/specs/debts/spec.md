# Debts Specification

## Purpose

Define la gestión de deudas de Finap: listar las deudas con su progreso de pago, crear y editar deudas, registrar pagos y ver el total pendiente.

## Requirements

### Requirement: Listado de deudas

El sistema SHALL mostrar las deudas con jerarquía clara (importe total, pagado, pendiente y progreso con color según cercanía a la meta), en una tabla con bordes y densidad controlada, con un único botón de acción por fila (`sp-action-menu`) y posibilidad de verlas en lista o galería.

#### Scenario: Ver deudas

- **WHEN** el usuario abre la sección Deudas
- **THEN** se muestran las deudas con su progreso y el total pendiente

#### Scenario: Acción única por fila

- **WHEN** el usuario ve una deuda
- **THEN** dispone de un único botón de acción que abre un menú (pagar, editar, eliminar)

#### Scenario: Progreso con color

- **WHEN** se muestra el progreso de una deuda
- **THEN** la barra usa color según lo cerca o lejos que esté de saldarse

#### Scenario: Vista lista o galería

- **WHEN** el usuario alterna la vista
- **THEN** las deudas se muestran como lista o como galería

### Requirement: Crear deuda

El sistema SHALL permitir crear una deuda con nombre, importe total, importe pagado y fecha límite opcional.

#### Scenario: Crear deuda válida

- **WHEN** el usuario introduce el nombre y el importe total y guarda
- **THEN** la deuda se crea y aparece en la lista

#### Scenario: Importe requerido

- **WHEN** el usuario guarda sin importe total
- **THEN** se muestra un error y no se crea la deuda

### Requirement: Editar deuda

El sistema SHALL permitir editar una deuda existente.

#### Scenario: Editar deuda

- **WHEN** el usuario edita una deuda y guarda
- **THEN** los cambios se persisten y se reflejan

### Requirement: Registrar pago

El sistema SHALL permitir registrar un pago que aumente el importe pagado y reduzca el pendiente.

#### Scenario: Registrar pago

- **WHEN** el usuario registra un pago
- **THEN** el importe pagado aumenta, el pendiente disminuye y el progreso se actualiza

#### Scenario: Deuda saldada

- **WHEN** el importe pagado alcanza el total
- **THEN** la deuda se marca como pagada

### Requirement: Eliminar deuda

El sistema SHALL permitir eliminar una deuda con confirmación.

#### Scenario: Eliminar deuda

- **WHEN** el usuario elimina una deuda y confirma
- **THEN** la deuda desaparece de la lista
