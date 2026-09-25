# Spec Delta

## MODIFIED Requirements

### Requirement: Filtros

El sistema SHALL permitir filtrar los movimientos con controles simplificados: chips de tipo (todos, gasto, ingreso, deuda), un campo de búsqueda con icono y un `sp-popover` para fechas y categorías (con filtro propio dentro del popover).

#### Scenario: Filtrar por tipo

- **WHEN** el usuario selecciona el tipo "gasto"
- **THEN** solo se muestran movimientos de gasto

#### Scenario: Filtrar por categoría y fechas

- **WHEN** el usuario abre el popover y selecciona una categoría o un rango de fechas
- **THEN** la lista se actualiza con los movimientos que cumplen el filtro

#### Scenario: Limpiar filtros

- **WHEN** el usuario limpia los filtros
- **THEN** se muestra la lista sin filtrar

### Requirement: Búsqueda

El sistema SHALL permitir buscar movimientos por texto con un campo de búsqueda que muestre el icono de búsqueda (`sp-search`).

#### Scenario: Buscar por texto

- **WHEN** el usuario escribe un término de búsqueda
- **THEN** se muestran los movimientos que coinciden (nota o categoría)
