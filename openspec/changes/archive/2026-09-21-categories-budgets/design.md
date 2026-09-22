# Design

## Context

Ver `proposal.md` y los contratos de `/categories` y `/budgets` en `api-contracts`.

## Decisions

### 1. Páginas separadas para categorías y presupuestos

- **Decisión**: `categories-page` (CRUD) y `budgets-page` (límites y progreso). Se accede desde Ajustes o desde una sección de la nav.
- **Alternativas**: una sola página con pestañas. Se prefiere separar por claridad, con enlaces cruzados.
- **Racional**: cada página tiene un propósito claro.

### 2. Formulario de categoría

- **Decisión**: `category-form` con nombre, selector de color y de icono (usando `finap-input`/`finap-select` y un selector de color). Reutilizable para crear/editar.
- **Racional**: un formulario para alta y edición.

### 3. Presupuesto con progreso

- **Decisión**: `budget-item` muestra límite, gasto y `finap-progress`; color semántico de exceso cuando supera el límite.
- **Racional**: reutiliza `finap-progress` y tokens semánticos.

### 4. Eliminar con advertencia

- **Decisión**: al eliminar una categoría con movimientos, se usa `confirm-dialog` con advertencia.
- **Racional**: evita pérdida de datos inesperada.

## Goals / Non-Goals

**Goals**: gestionar categorías y presupuestos.
**Non-Goals**: presupuestos recurrentes automáticos (futuro).

## Risks / Trade-offs

- **[Riesgo] Categorías en uso** → Se advierte y (según backend) se reasignan o bloquean.
- **[Trade-off] Color/icono libres** → Se ofrece un set predefinido para mantener coherencia visual.
