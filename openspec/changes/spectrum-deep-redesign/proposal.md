# Proposal

## Why

Tras la migración inicial a Spectrum, la app usa componentes Spectrum en unos sitios (botones, campos, diálogos, iconos) pero sigue con superficies, navegación y colores propios en otros (sidebar, tarjetas, chips, colores de marca dominantes y radios grandes). El resultado es un **ecosistema híbrido incoherente**. Este change hace una pasada **profunda y transversal** para que toda la interfaz se sienta del mismo sistema: más primitivas de Spectrum, colores y radios alineados con Spectrum, y un lenguaje visual más simple y prolijo.

## What Changes

- **Más Spectrum Web Components en todas las vistas**: navegación lateral (`sp-sidenav`), búsqueda del header (`sp-search`), badges (`sp-badge`) para tendencias y estados, medidores (`sp-meter`/`sp-progress-bar`) para presupuestos y deudas, tablas (`sp-table`) para listados (movimientos, categorías), estados vacíos (`sp-illustrated-message`), indicador de conexión (`sp-status-light`), tooltips (`sp-tooltip`), separadores (`sp-divider`) y enlaces (`sp-link`).
- **Diseño adaptado al color de Spectrum**: los **neutros** (fondos, superficies, bordes, texto) pasan a los tokens semánticos de Spectrum; el **acento interactivo** usa el acento de Spectrum y la paleta de marca de Finap (rojo/naranja/amarillo) queda como **acento de marca** (brand-mark, hero y gradiente), no como color dominante de la UI.
- **Menos redondeo**: la escala de radios se reduce a los valores de Spectrum (esquinas sutiles; `full` solo para píldoras/avatares), eliminando el aspecto "burbuja".
- **Simplificación**: superficies planas con borde sutil y elevación contenida, tipografía Spectrum coherente, y menos decoración (se retira el gradiente como fondo de bloques, sombras pronunciadas y chips de color arbitrario donde no aportan).
- **Revisión de todas las vistas** (dashboard, movimientos, análisis, deudas, categorías/presupuestos, ajustes, asistente, login, landing) para que consuman los componentes y tokens comunes; los cambios son **visuales** (el comportamiento se mantiene).

## Capabilities

### New Capabilities

<!-- Ninguna: rediseño sobre capacidades existentes. -->

### Modified Capabilities

- `design-tokens`: paleta de color (neutros Spectrum + marca como acento), colores semánticos y escala de radios/elevación (menos redondeo).
- `foundation-components`: tarjeta, títulos, texto e iconos alineados a superficies y tipografía de Spectrum (planas, radios pequeños).
- `app-components`: adopción de `sp-badge`, `sp-meter`, `sp-tooltip`, `sp-status-light`, `sp-illustrated-message`, `sp-divider` y `sp-table`, y restyle de stat-card/list-item/chip/progress.
- `app-shell`: navegación con `sp-sidenav` y búsqueda del header con `sp-search`.
- `landing-page`: patrones Spectrum más profundos (navegación con `sp-link`, secciones con `sp-card`/`sp-badge`, base neutral con acento de marca).

## Impact

- **Código**: `src/tokens/` (tokens.css, typography.css), `src/components/*` (card, container, heading, text, stat-card, list-item, chip, progress, app-shell, offline-banner, user-menu, dashboard-*, movements-list, movements-filters, analysis-metrics, debt-item, budget-item, assistant-*, settings-*, category-form, transaction-form, debt-form, login-form, landing) y páginas que las consumen.
- **Dependencias nuevas**: `@spectrum-web-components/{card,badge,sidenav,search,table,meter,status-light,illustrated-message,tooltip,divider,link,switch}`.
- **Tests**: unitarios de los componentes afectados se actualizan al nuevo contrato; E2E se ajusta a los selectores de las nuevas primitivas (tablas, sidenav, badges).
- **PWA/bundle**: precache y tamaño se revisan al añadir paquetes.
- **Relacionado**: continúa `ui-spectrum-foundation` y `ui-spectrum-app` (ambos archivados).
