# Design

## Context

Motivación en proposal.md. Estado de partida (fases `ui-spectrum-foundation`/`ui-spectrum-app` archivadas): hay `sp-*` en formularios/diálogos/datos, pero también una capa propia (`finap-button`, `finap-icon`, `finap-card`, `finap-chip`, `finap-avatar`, `finap-progress`, `finap-stat-card`, `finap-list-item`, toggles, `user-menu`) y colores/radios propios. Objetivo: **reemplazar la UI por componentes SWC**, conservando solo lo que aporta contrato o no tiene equivalente.

## Goals / Non-Goals

**Goals:**

- Que todas las piezas visibles sean componentes de Spectrum (o composiciones suyas).
- Neutros/radios/acento alineados con Spectrum; marca solo como acento.
- Eliminar la capa propia que no aporta.

**Non-Goals:**

- No cambia el comportamiento funcional (servicios, router, i18n, PWA lógica).
- Las gráficas siguen con chart.js (no hay componente de chart en SWC).
- No se reescriben los formularios para dejar de usar `finap-input`/`finap-select` (aportan contrato de eventos/validación).

## Decisions

### 1. Qué se elimina y con qué se sustituye

| Componente propio | Sustituto Spectrum | Notas |
|---|---|---|
| `finap-button` | `sp-button` | variantes/treatment de Spectrum |
| `finap-icon` | `sp-icon` + `icons-workflow` | mapear nombres en la vista |
| `finap-card` | `sp-card` / superficie Spectrum | paneles y tarjetas |
| `finap-chip` | `sp-tag` | `selected`/rol botón donde aplique |
| `finap-avatar` | `sp-avatar` | imagen o `label` |
| `finap-progress` | `sp-meter` / `sp-progress-bar` | valor y exceso |
| `finap-stat-card` | `sp-card` + `sp-badge` | composición en la vista |
| `finap-list-item` | `sp-table` / fila Spectrum | listados |
| `finap-theme-toggle` | `sp-switch` / `sp-action-button` | Ajustes / header |
| `finap-language-toggle` | `sp-picker` | Ajustes |
| `finap-user-menu` | `sp-action-menu` | perfil + cerrar sesión |
| `finap-modal` / `finap-confirm-dialog` | `sp-dialog-wrapper` | diálogo modal (overlay, foco, cierre) |

### 2. Qué se conserva (contrato propio o sin equivalente SWC)

- `finap-input`, `finap-select`: emiten `finap-input`/`finap-change` y alimentan la validación de los formularios (rewrite de formularios sería costoso y sin ganancia visual).
- `finap-heading`, `finap-text`: SWC no tiene componente de tipografía → clases `spectrum-*`.
- `finap-container`: utilidad de layout; no hay equivalente SWC.
- `finap-brand-mark`: identidad de marca (logo de rombos).
- `finap-chart`: chart.js.
- Chat del asistente: no hay componente de chat en SWC (se compone con `sp-textfield`, `sp-button`, `sp-avatar` y tokens).

### 3. Modales: `sp-dialog-wrapper`

El componente más cercano a un modal en Spectrum es `sp-dialog-wrapper`: envuelve el diálogo y aporta overlay, placement, foco y cierre (Escape/botón). Se usa directamente en las vistas, eliminando `finap-modal`/`finap-confirm-dialog`; los eventos de negocio (confirmar/cancelar) se gestionan en la vista.

### 4. Layout con CSS Grid

La estructura de las vistas se recompone con **CSS Grid** nativo y tokens de espaciado de Spectrum (gaps/columnas responsivas). Nota: `@spectrum-web-components/grid` (`sp-grid`) es un grid **virtualizado** para listas grandes (lit-virtualizer), no un layout de página, por lo que no se usa para el layout. Esto cambia ligeramente la estructura visual (columnas/gaps de Spectrum) a cambio de coherencia.

### 5. Componentes SWC a adoptar en las vistas

`sp-sidenav`/`sp-sidenav-item` (nav), `sp-search` (búsqueda), `sp-action-menu`/`sp-action-button` (menú de usuario y acciones), `sp-table` (listados), `sp-badge` (tendencias/estados), `sp-meter`/`sp-progress-bar` (avance), `sp-card` (superficies), `sp-tag` (chips), `sp-avatar`, `sp-icon`, `sp-divider`, `sp-link`, `sp-tooltip`, `sp-status-light` (conexión), `sp-illustrated-message` (estados vacíos), `sp-alert-banner`/`sp-toast` (avisos), `sp-switch` (tema), `sp-picker` (idioma/moneda), `sp-dialog-wrapper` (modales).

### 4. Tokens: neutros, radios y acento

- Neutros (fondo/superficie/borde/texto) desde los tokens semánticos de Spectrum.
- Radios pequeños de Spectrum (`4/6/10/14px`; `full` solo píldoras/avatares).
- Acento interactivo = acento de Spectrum; marca (rojo/naranja/amarillo) como acento (logo, hero, gradiente).
- Superficies planas con borde sutil; elevación contenida.

### 5. Estrategia de migración y tests

- **Borrado controlado**: por cada componente retirado, migrar sus consumidores, eliminar el componente y su unit test, y ajustar E2E.
- Los formularios no cambian (siguen con `finap-input`/`finap-select`); el resto de vistas se reescriben para usar `sp-*`.
- `sp-table` en móvil: columnas esenciales.
- Unit tests de los componentes retirados se eliminan; los de vistas pasan a verificar presencia de primitivas SWC y los eventos de negocio.

## Risks / Trade-offs

- **Churn alto** (borrar ~11 componentes y tocar todas las vistas) → migración por pasos con unit + E2E verdes en cada uno.
- **`sp-card` para paneles de app** puede requerir ajustes de layout → si no encaja, se usa superficie con tokens Spectrum (documentado como excepción).
- **`sp-table` en móvil** → columnas esenciales; validar densidad.
- **`sp-action-menu` para el menú de usuario** → revisar el nombre accesible (hay test E2E de logout).
- **Bundle/precache** crecen con más paquetes → medir y optimizar imports.
- **`sp-*` en happy-dom** → unit tests por contrato (elemento/atributos/eventos), render real en E2E.

## Migration Plan

1. Tokens (color/radios) y borrado de `finap-button`/`finap-icon`/`finap-card` (base de casi todo).
2. Borrado de `finap-chip`/`finap-avatar`/`finap-progress` y adopción de `sp-table`/`sp-badge`/`sp-meter`.
3. Shell (`sp-sidenav`/`sp-search`/`sp-action-menu`) y landing.
4. Resto de vistas (dashboard, movimientos, análisis, deudas, categorías/presupuestos, ajustes, asistente, login).
5. PWA/bundle y limpieza final.
Rollback: commits por paso.
