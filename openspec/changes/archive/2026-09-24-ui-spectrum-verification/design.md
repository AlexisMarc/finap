# Design

## Context

Las fases anteriores migran la UI a Spectrum. Este change cierra la verificación. Puntos de partida:

- 267+ tests unitarios (Vitest + happy-dom) y 28 tests E2E (Playwright) que asumen la estructura anterior de los componentes.
- PWA con `vite-plugin-pwa` (workbox generateSW) cuyo precache incluye el build entero.
- La suite E2E usa selectores por rol/texto en su mayoría (sobreviven a Spectrum, que es accesible) y algunos selectores de estructura interna (`.row`, `finap-* .class`) que sí pueden romper.

## Goals / Non-Goals

**Goals:**

- Toda la suite (unit + E2E) en verde sobre la implementación Spectrum.
- PWA precacheando correctamente las fuentes/assets de Spectrum.
- Bundle medido y saneado.

**Non-Goals:**

- No se añaden funcionalidades ni specs nuevas.
- No se modifica la lógica de negocio para hacer pasar tests.

## Decisions

### 1. Estrategia de tests unitarios

- Los tests de tokens/contraste verifican ahora alias y valores Spectrum (WCAG AA).
- Los tests de componentes migrados verifican contrato externo (tag, atributos, eventos, slots), no CSS interno.
- happy-dom no soporta algunos APIs de Spectrum (focus management de `sp-dialog`, `sp-picker` overlay) → esos tests se limitan a presencia/atributos y el comportamiento real se cubre en E2E.

### 2. Estrategia E2E

- Mantener `getByRole`/`getByText`/`getByLabel` siempre que funcionen; ajustar solo los locators estructurales rotos (p. ej. `finap-transaction-form input[type=number]` → label del `sp-textfield`, pickers con `sp-picker`).
- Los diálogos pasan a `sp-dialog`: revisar los tests de crear/eliminar (movimientos, categorías, deudas) y el modal de "Agregar".
- Ejecutar la suite completa y dejar todo en verde antes de cerrar.

### 3. PWA y bundle

- Asegurar que `@spectrum-web-components` y `@spectrum-icons` queden en el precache (revisar globs de workbox si los assets externos no entran).
- Medir el build (`vite build` + informe de tamaños); si el bundle supera ~1 MB en gzip, aplicar imports individuales y/o carga de icons bajo demanda, y repetir la medición.

### 4. Limpieza de dependencias

Eliminar `@fontsource-variable/inter`, `@fontsource-variable/sora` y cualquier import de iconos/tokens custom que quede sin uso tras la migración.

## Risks / Trade-offs

- **Selectores E2E rotos por doquier** → se ajustan en una pasada y se re-ejecuta la suite completa.
- **happy-dom vs Spectrum** (estilos/foco no implementados) → los unit tests verifican contrato, no render real; el render real lo cubre E2E.
- **Tamaño del bundle** → medir antes/después y solo optimizar si el umbral se supera.

## Migration Plan

Sin migración de datos. Los pasos son verificaciones incrementales; cada tarea termina con su comando de verificación. Rollback: revertir los ajustes de tests/config sin afectar las fases anteriores.
