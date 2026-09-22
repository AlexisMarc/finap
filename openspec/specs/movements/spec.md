# Movements Specification

## Purpose

Define la vista de movimientos de Finap: el listado paginado de transacciones con filtros por tipo, categoría y fechas, búsqueda por texto y ordenación.

## Requirements

### Requirement: Listado paginado de movimientos

El sistema SHALL mostrar los movimientos paginados, con más resultados cargables.

#### Scenario: Carga inicial

- **WHEN** el usuario entra en Movimientos
- **THEN** se muestra la primera página de movimientos ordenada por fecha descendente

#### Scenario: Cargar más

- **WHEN** el usuario llega al final de la lista
- **THEN** se cargan más movimientos

### Requirement: Filtros

El sistema SHALL permitir filtrar los movimientos por tipo, categoría y rango de fechas.

#### Scenario: Filtrar por tipo

- **WHEN** el usuario selecciona el tipo "gasto"
- **THEN** solo se muestran movimientos de gasto

#### Scenario: Filtrar por categoría y fechas

- **WHEN** el usuario selecciona una categoría o un rango de fechas
- **THEN** la lista se actualiza con los movimientos que cumplen el filtro

#### Scenario: Limpiar filtros

- **WHEN** el usuario limpia los filtros
- **THEN** se muestra la lista sin filtrar

### Requirement: Búsqueda

El sistema SHALL permitir buscar movimientos por texto.

#### Scenario: Buscar por texto

- **WHEN** el usuario escribe un término de búsqueda
- **THEN** se muestran los movimientos que coinciden (nota o categoría)

### Requirement: Ordenación

El sistema SHALL permitir ordenar los movimientos por fecha e importe.

#### Scenario: Ordenar

- **WHEN** el usuario cambia el criterio de ordenación
- **THEN** la lista se reordena según el criterio

### Requirement: Estados de carga, vacío y error

El sistema SHALL mostrar estados de carga, vacío y error.

#### Scenario: Sin resultados

- **WHEN** no hay movimientos que cumplan los filtros
- **THEN** se muestra un estado vacío con acción para limpiar filtros
