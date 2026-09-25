# Design

## Context

Motivación en proposal.md. Estado actual:

- Fase 1 (fundación) dejó `sp-theme`, tokens alias y componentes base sobre Spectrum; fase 2 migró formularios/diálogos/datos.
- Siguen siendo custom y con lenguaje propio: el chrome (`app-shell`: sidebar/topbar/bottom nav), superficies (`finap-card`), filas/listados (`finap-list-item`, `movements-list`), chips, medidores, estados vacíos, y **colores/radios**: `--finap-radius-{sm:8,md:12,lg:21,xl:32}` y una paleta de marca (rojo/naranja/amarillo) que domina la UI.
- Los paquetes SWC disponibles en 1.12.2 incluyen `card`, `badge`, `sidenav`, `search`, `table`, `meter`, `switch`, `status-light`, `illustrated-message`, `tooltip`, `divider`, `link`, `action-menu`, `tabs`.

## Goals / Non-Goals

**Goals:**

- Un único lenguaje visual Spectrum en todas las vistas (menos "mix").
- Neutros y radios alineados con Spectrum; marca relegada a acento.
- Superficies planas, jerarquía por tipografía/espaciado, no por sombras.

**Non-Goals:**

- No cambia el comportamiento funcional ni los servicios/router.
- No se rediseñan las gráficas (chart.js se mantiene, solo se ajustan colores al tema).
- No se añade funcionalidad nueva (p. ej. toasts) salvo lo estrictamente visual.

## Decisions

### 1. Tokens: neutros Spectrum, radios pequeños, marca como acento

- **Neutros**: fondo/superficies/bordes/texto siguen alias a tokens semánticos de Spectrum (`--spectrum-background-*`, escala de grises y borde de Spectrum), afinando el mapeo para que superficie y borde coincidan con el panel de Spectrum.
- **Radios**: nueva escala `--finap-radius-{sm:4px,md:6px,lg:10px,xl:14px}` y `full` solo para píldoras/avatares. Sustituye la escala actual (8/12/21/32).
- **Acento**: el acento interactivo (botón primario, foco, selección) usa el acento de Spectrum; la paleta de marca queda para `finap-brand-mark`, el hero y el gradiente. Se reduce el uso de `--finap-color-primary/secondary/accent` en superficies y estados.
- **Alternativa**: mantener la marca como color primario y solo reducir radios → rechazada: no resuelve el "mix" de ecosistemas.

### 2. Mapa de adopción de primitivas Spectrum por superficie

| Superficie actual | Primitiva Spectrum | Notas |
|---|---|---|
| Sidebar del shell | `sp-sidenav` / `sp-sidenav-item` | `selected` según ruta; navegación por evento |
| Búsqueda del header | `sp-search` | mantiene el "pending search" y navegación actuales |
| `finap-card` | superficie plana (tokens Spectrum) | no se usa `sp-card` para paneles de app (su API es de tarjeta de contenido) |
| Tendencias/variaciones | `sp-badge` | variantes positiva/negativa/neutral |
| Estados de deuda/presupuesto | `sp-badge` | pagada/pendiente/excedido |
| Medidor de presupuesto/deuda | `sp-meter` / `sp-progress-bar` | valor y exceso |
| Listados (movimientos/categorías) | `sp-table` | acciones por fila; en móvil, columnas esenciales |
| Estados vacíos | `sp-illustrated-message` | mensaje + acción |
| Estado de conexión | `sp-status-light` | offline/online |
| Controles de solo icono | `sp-tooltip` | tema, idioma, acciones |
| Separadores | `sp-divider` | secciones y filas |
| Navegación de landing/footer | `sp-link` | enlaces |
| Toggle de tema en Ajustes | `sp-switch` | preferencia claro/oscuro |

- **Alternativa**: `sp-card` para todos los paneles → rechazada, su estructura (preview/heading) no encaja con dashboards.

### 3. Tabla en móvil

`sp-table` no es responsive por sí sola: en viewports pequeños se muestran solo las columnas esenciales (fecha, concepto, importe, acciones) y se oculta el resto, o se conserva el `finap-list-item` como representación alternativa. Se decide por **columnas esenciales** para mantener una sola implementación.

### 4. Shell y routing

`sp-sidenav`/`sp-sidenav-item` no son `<a>`: se mantiene la navegación por evento (`click` → `navigate()`), se marca el item activo con `selected`, y se conserva el bottom nav móvil (restilizado). El chrome sigue dependiendo de la página activa (lógica ya existente).

### 5. Landing

El hero y las secciones se recomponen con base neutral de Spectrum y acento de marca puntual; navegación y footer con `sp-link`; secciones con superficies planas y `sp-badge` donde aporten.

### 6. Verificación

- Unit tests de los componentes afectados al nuevo contrato (nuevas primitivas, radios, colores).
- E2E: actualizar selectores rotos (tablas, sidenav, badges) manteniendo aserciones por rol/texto.
- PWA/bundle: revisar precache y tamaño (nuevos paquetes); optimizar imports si hace falta.

## Risks / Trade-offs

- **Más paquetes SWC** (`table`, `sidenav`, `meter`, `status-light`, `illustrated-message`, `tooltip`, `divider`, `link`, `badge`, `switch`) → bundle/precache crecen; se importan individualmente y se mide; optimizar en última tarea si supera el umbral.
- **`sp-table` en móvil** → se acota a columnas esenciales; riesgo de densidad, se valida en viewport pequeño.
- **Cambio visual amplio** (colores/radios) → impacto en capturas y tests de estilo; los tests de tokens/contraste se actualizan y se mantiene WCAG AA.
- **Marca menos protagonista** → decisión de producto asumida; la marca sigue presente en logo/hero/gradiente.
- **`sp-*` en happy-dom** → los unit tests verifican contrato (elemento, atributos, eventos), no render interno; el render real se cubre en E2E.

## Migration Plan

1. Tokens (colores/radios) — base del cambio.
2. Componentes de fundación y de app (superficies, badges, medidores, estados).
3. Shell (sidenav/search) y landing.
4. Vistas que los consumen, una por una, verificando unit + E2E en cada paso.
5. Ajuste final de PWA/bundle y limpieza.
Rollback: commits por paso; los tokens se pueden revertir primero.
