# Design

## Context

La fase anterior (`ui-spectrum-foundation`) deja el `sp-theme` raíz, los tokens alias y los componentes base (button, heading, text, card, container, icon) funcionando. Referencias clave:

- `src/components/` contiene los componentes de app a migrar: input, select, chip, avatar, progress, modal, confirm-dialog, stat-card, list-item, y los formularios (transaction/category/debt/login-form, settings-preferences).
- `src/pages/landing-page.ts` y `src/components/app-shell/index.ts` son los únicos layouts visuales grandes.
- Las páginas y formularios emiten/escuchan eventos propios (`finap-input`, `finap-change`, `finap-save`, `finap-close`) que NO deben cambiar: los wrappers preservan esos contratos.

## Goals / Non-Goals

**Goals:**

- Sustituir las primitivas de formulario/listas/feedback por Spectrum manteniendo APIs, eventos y validación.
- Rediseñar landing y chrome de la app con patrones Spectrum.
- Comportamiento de páginas intacto (aserciones E2E por rol sobreviven en su mayoría).

**Non-Goals:**

- No se cambian servicios, router, i18n ni lógica de negocio.
- No se toca el apartado visual de dashboard/analysis/debts/settings más allá de lo que heredan de los componentes migrados.
- Los repasos de tests/E2E/PWA/bundle se hacen en `ui-spectrum-verification`.

## Decisions

### 1. Wrappers que preservan la API pública

Cada `finap-*` sigue exponiendo el mismo nombre de elemento, atributos, slots y eventos (p. ej. `finap-input` sigue emitiendo `finap-input`). Internamente renderizan la primitiva Spectrum:

- `finap-input`: `sp-textfield` (text/password/email/date), `sp-number-field` (number), `sp-textarea` (textarea); el estado `error`/`invalid` se mapea al atributo `invalid` + mensaje.
- `finap-select`: `sp-picker` con `sp-menu-item`; emite `finap-change` con el valor seleccionado.
- `finap-modal`: `sp-dialog` (mode default) con underlay `sp-underlay`; conserva trap de foco/Escape de Spectrum y emite `finap-close`.
- `finap-chip`: `sp-tag`; `clickable`/`selected` → `deletable`/`selected` de Spectrum.
- `finap-progress`: `sp-progress-bar` con `value`/`max` y etiqueta porcentual.
- `finap-avatar`: `sp-avatar` (iniciales o `image`).

**Alternativa**: usar las primitivas directamente en las páginas → rechazada, rompería el contrato actual de eventos/atributos y forzaría tocar todas las páginas a la vez.

### 2. `finap-stat-card` y `finap-list-item` compuestos

Se mantienen como componentes propios (no existe equivalente 1:1 en Spectrum) pero se restilan con tokens/tipografía Spectrum, conservando el slot/atributos actuales.

### 3. Confirm-dialog sobre `sp-dialog` de alerta

`finap-confirm-dialog` pasa a usar `sp-dialog` (dismissable, esc), conservando eventos `finap-confirm`/`finap-cancel`.

### 4. Landing

Reestructura de `landing-page.ts` con: header (brand-mark + nav con estilos Spectrum + toggles), hero con headline tipográfico Spectrum y CTA `sp-button`, secciones de cards y footer. Se reutilizan las primitivas de `motion` existentes (reveal, fade) y `prefers-reduced-motion`. El contenido i18n no cambia.

### 5. Chrome de la app

`app-shell` conserva la estructura (sidebar/topbar/bottom-nav, búsqueda, Agregar, user-menu) y adopta tokens/tipografía Spectrum; no cambia ninguna lógica (detección de página activa, navegación, pending search).

### 6. Verificación de fase

Unit tests de cada componente migrado (render interno nuevo + mismos eventos) y smoke E2E de los flujos principales (auth, dashboard, movimientos, ajustes). El repaso completo de tests queda en la fase 3.

## Risks / Trade-offs

- **Diferencias de focus/teclado de Spectrum** (sp-picker, sp-dialog gestionan su propio foco) → los unit tests de modal deben pasar a verificar presencia/atributos en lugar de manipulación manual del foco.
- **Iconos de Spectrum en chips/avatar** → uso de workflow icons existentes; los nombres custom pendientes se listan en la fase 3.
- **Formularios compuestos** dependen del valor/evento de los wrappers → si un evento difiere, se ajusta el wrapper, no el formulario.
- **Date input**: Spectrum no tiene date-picker; `finap-input type="date"` mantiene el input nativo estilizado con tokens.

## Migration Plan

1. Migrar en orden: input → select → chip → avatar → progress → modal/confirm-dialog (los formularios y páginas los consumen; van juntos).
2. Recomponer stat-card/list-item.
3. Rediseñar landing y chrome del shell.
4. Smoke E2E + unit tests de los migrados; `npm run build`.
Rollback: commits independientes por componente.
