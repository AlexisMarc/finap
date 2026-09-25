# Design

## Context

Motivación en proposal.md. Restricciones:

- Stack actual: Lit 3, Open Cells (router), Vite, TypeScript; tokens propios en `src/tokens/`, tema en `src/theme/`, componentes base en `src/components/`.
- Los componentes de app (páginas) consumen `--finap-*`; cambiarlos todos de golpe rompería la app. La migración debe ser progresiva.
- Spectrum Web Components (`@spectrum-web-components/*`) usa el mismo modelo: custom elements Lit con shadow DOM, tema vía `sp-theme` y tokens `--spectrum-*` (o `--system-*`).

## Goals / Non-Goals

**Goals:**

- Base Spectrum funcionando (tema claro/oscuro, tipografía, componentes base) sin cambiar el comportamiento de la app.
- Los `--finap-*` siguen existiendo como alias → nada se rompe visualmente a medias.

**Non-Goals:**

- No se migran en esta fase inputs/selects/chips/modales/avatares ni los layouts de página (fase 2).
- No se tocan tests E2E/unitarios de páginas salvo los que rompan por el cambio de base (fase 3 hace el repaso completo).
- No se cambia el router, servicios, PWA ni CI.

## Decisions

### 1. Un solo `sp-theme` raíz en `app-index`

`finap-app` renderiza todo dentro de `<sp-theme scale="medium" color="light|dark">`. El estado del tema sigue en `src/theme/` (persistencia en localStorage + `prefers-color-scheme`), pero en lugar de mover variables propias, actualiza el atributo `color` del `sp-theme`.

- **Alternativa**: mantener `[data-theme]` con variables propias y mapear a Spectrum por componente → rechazada, duplica el tema.

### 2. Tokens: alias, no reescritura

`src/tokens/spectrum-alias.css` define `--finap-color-*`, `--finap-space-*`, `--finap-radius-*`, etc. como alias de `--spectrum-*`. Se conservan los tokens semánticos de Finap (ingreso/gasto/deuda, gradiente de marca) con valores elegidos de la paleta Spectrum (p. ej. verdes/rojos del theme). La lista canónica de alias se obtiene de la tabla de tokens de Spectrum.

- **Alternativa**: borrar `--finap-*` y migrar todas las páginas en la misma fase → rechazada, big-bang.

### 3. Componentes base sobre Spectrum

- `finap-button` pasa a renderizar `<sp-button>` mapeando `variant` → `variant` de Spectrum (primary→accent, secondary→secondary, text→… `quiet`).
- `finap-heading`/`finap-text`: mantienen su API (level/size) y aplican clases tipográficas Spectrum (`spectrum-Heading`, `spectrum-Body`).
- `finap-card`/`finap-container`: wrappers de superficie con tokens Spectrum.
- `finap-icon` mapea el nombre al set de workflow icons de Spectrum (`@spectrum-icons/workflow`); nombres desconocidos → fallback silencioso.
- `finap-brand-mark` y `finap-language-toggle`: sin cambios.

### 4. Fuentes

Se importa la tipografía de Spectrum (`@spectrum-web-components/styles/typography.css` + fuente Adobe Clean del paquete). Se eliminan `@fontsource-variable/inter` y `sora`. `src/tokens/typography.ts` (usado por tests de tipografía) pasa a reflejar la escala Spectrum.

### 5. Verificación en esta fase

- Unit tests existentes de tokens/contraste/tipografía se ajustan a los nuevos valores.
- Smoke E2E (landing/auth/dashboard) debe seguir en verde; los selectores de rol sobreviven porque `sp-button` sigue siendo un `<button>`.

## Risks / Trade-offs

- **Diferencias visuales iniciales** (espaciados/colores cambian al aliñar tokens) → aceptado: es el objetivo del rediseño; se revisa página a página en la fase 2.
- **Peso del bundle** (Spectrum + icons) → se importan solo los paquetes usados; fase 3 revisa tamaño y precache PWA.
- **Mapa icono→nombre de Spectrum incompleto** (algunos iconos custom no existen en workflow) → fallback a un icono genérico y lista de pendientes para la fase 2.
- **Compatibilidad de estilos de Spectrum con happy-dom en unit tests** → los tests de componentes base pasan a verificar estructura/atributos, no CSS real.

## Migration Plan

1. Añadir dependencias y envolver la app en `sp-theme` (sin cambios visuales).
2. Publicar alias `--finap-*` → `--spectrum-*` y ajustar tokens semánticos.
3. Migrar componentes base uno a uno (button → heading/text → card/container → icon), verificando unit tests y smoke E2E en cada paso.
4. Eliminar fuentes antiguas y dependencias innecesarias.
Rollback: revertir commits por componente (cada paso es independiente).
