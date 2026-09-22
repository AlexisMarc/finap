# Transactions Specification

## Purpose

Define la creación, edición y borrado de movimientos de Finap mediante un formulario de registro (gasto, ingreso o deuda) accesible desde el shell y desde la vista de movimientos.

## Requirements

### Requirement: Formulario de registro

El sistema SHALL proporcionar un formulario para crear un movimiento con tipo (gasto/ingreso/deuda), importe, categoría, fecha y nota opcional.

#### Scenario: Seleccionar tipo

- **WHEN** el usuario abre el formulario
- **THEN** puede elegir entre Gasto, Ingreso y Deuda

#### Scenario: Importe y categoría obligatorios

- **WHEN** el usuario guarda sin importe o sin categoría
- **THEN** se muestran errores de validación y no se guarda

#### Scenario: Nota opcional

- **WHEN** el usuario guarda sin nota
- **THEN** el movimiento se guarda correctamente

### Requirement: Alta de movimiento

El sistema SHALL crear el movimiento y reflejarlo en la interfaz.

#### Scenario: Guardar movimiento

- **WHEN** el usuario guarda un movimiento válido
- **THEN** el movimiento se crea y se actualizan las vistas de dashboard y movimientos

### Requirement: Edición de movimiento

El sistema SHALL permitir editar un movimiento existente.

#### Scenario: Editar

- **WHEN** el usuario edita un movimiento y guarda
- **THEN** los cambios se persisten y se reflejan en la interfaz

### Requirement: Borrado de movimiento

El sistema SHALL permitir eliminar un movimiento con confirmación.

#### Scenario: Confirmar borrado

- **WHEN** el usuario elimina un movimiento y confirma
- **THEN** el movimiento se elimina y desaparece de la lista

#### Scenario: Cancelar borrado

- **WHEN** el usuario cancela la confirmación
- **THEN** el movimiento no se elimina

### Requirement: Estados de guardado

El sistema SHALL mostrar el estado de guardado (en curso, éxito, error) en el formulario.

#### Scenario: Error al guardar

- **WHEN** falla el guardado
- **THEN** se muestra un mensaje de error y el formulario conserva los datos
