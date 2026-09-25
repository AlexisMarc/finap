# Design

## Context

Motivación en proposal.md. El shell usa `sp-sidenav`, `sp-search`, `sp-action-menu` y `sp-button` (fases previas), pero con problemas de acabado y sin breadcrumbs/ayuda.

## Goals / Non-Goals

**Goals:** chrome ordenado y guiado (sidebar alineado, header agrupado, menú con ajustes, breadcrumbs, ayuda).

**Non-Goals:** no cambia la lógica de navegación ni los servicios.

## Decisions

### 1. Sidebar

- `sp-sidenav-item` con icono en el slot por defecto y texto; se alinea con flex y se quita el borde/línea que desborda en oscuro (usar `--spectrum-*` de sidenav o borde con radio contenido).

### 2. Header

- `sp-action-group` para "Agregar" + acciones.
- El menú de usuario (`sp-action-menu`) incluye avatar+nombre y sub-items: tema, moneda, idioma, cerrar sesión. Cambio de tema como acción de menú (y en Ajustes como botón con icono).

### 3. Tema como botón con icono

Se sustituye `sp-switch` por un `sp-action-button` con icono sol/luna (`sp-tooltip` para el label); la lógica de `src/theme/` no cambia.

### 4. Breadcrumbs

`sp-breadcrumbs` con items: Inicio / sección actual, derivados de `currentSection`.

### 5. Ayuda (tour)

Botón de ayuda → `sp-coachmark` secuencial sobre puntos clave (navegación, búsqueda, Agregar, menú). Si `sp-coachmark` resulta inestable, se usa `sp-overlay`/`sp-dialog` propio con carrucel de pasos (CSS scroll-snap).

## Risks / Trade-offs

- **Coachmark sobre shadow DOM** puede fallar al posicionar → plan B con overlay propio.
- **Menú con sub-items** requiere `sp-menu-group`/submenús → validar accesibilidad del nombre.
- **Tema como botón** cambia el E2E actual de `sp-switch` → actualizar selectores.

## Migration Plan

1. Sidebar alineado.
2. Header + menú de acciones rápidas + tema como botón.
3. Breadcrumbs y botón de ayuda/tour.
Rollback por commit.
