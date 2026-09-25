# Design

## Context

Motivación en proposal.md. Restricciones relevantes:

- Open Cells mantiene montadas las páginas anteriores en `#app` marcándolas con `state="inactive"`/`state="active"` (cache de rutas). Por eso el orden de hijos de `#app` no refleja la página visible.
- El router usa history mode (parche propio en `src/router/history.ts`); no hay soporte de query strings para pasar estado entre páginas.
- El shell ya tiene `SECTIONS` (items de navegación) y `APP_PAGES` (páginas con chrome).
- La suite E2E (`e2e/`) ya ejerce estos flujos (auth, dashboard, movimientos) y debe seguir pasando.

## Goals / Non-Goals

**Goals:**

- Chrome correcto en toda página autenticada, saludo y a11y del header coherentes, búsqueda del header funcional.
- Cambios mínimos y cubiertos por unit tests + E2E.

**Non-Goals:**

- No se añaden nuevos items de navegación (Categorías/Presupuestos siguen accesibles desde Ajustes).
- No se toca el parche del router ni se introduce soporte de query strings.
- No se rediseña el layout del shell.

## Decisions

### 1. Detección de la página activa (`_syncPage`)

Leer el hijo de `#app` con `state="active"` (`:scope > [state="active"]`) con fallback a `lastElementChild`, y observar `#app` con `childList` + `subtree` + `attributes` (`state`). *(Ya aplicado durante el trabajo de E2E; este change lo formaliza con spec y tests.)*

- **Alternativa considerada**: seguir con `firstElementChild` → rechazada, es el bug (devuelve la primera página montada, normalmente inactiva).
- **Alternativa considerada**: solo `lastElementChild` → rechazada, depende del orden de montaje y no de la semántica de página activa.

### 2. Chrome en Categorías y Presupuestos

Añadir `categories` y `budgets` al set `APP_PAGES`, sin tocarlas en `SECTIONS` (no son items de navegación). *(Ya aplicado; se formaliza.)*

- **Alternativa considerada**: añadirlas al nav → rechazada, no se quieren nuevos items en el menú.

### 3. Saludo sin duplicación

En el topbar, la línea de "hello" mantiene `Hola,` y la línea de nombre pasa a mostrar solo `{nombre} 👋` (hoy muestra `Hola, {nombre} 👋`, duplicando el saludo).

### 4. Búsqueda del header conectada a Movimientos

Sin soporte de query strings, el estado viaja por un módulo compartido: `src/state/search.ts` con `setPendingSearch(term)` / `consumePendingSearch()` (lee y limpia). El shell captura el envío (Enter) del `finap-input` del topbar, guarda el término y navega a `movements`; `movements-page` consume el término en su `_init()` y lo siembra en `filters.search` antes del primer fetch.

- **Alternativa considerada**: query param `?q=` → rechazada, requiere tocar el parche del router y la resolución de rutas.
- **Alternativa considerada**: eliminar el campo del header → rechazada, el diseño y la spec lo requieren.

### 5. A11y del menú de usuario

`aria-hidden="true"` en el avatar dentro del trigger (el bloque `.info` ya expone nombre y email) para que el nombre accesible no duplique. Además, en la nav del shell, `aria-current` se renderiza solo cuando la sección está activa (hoy emite `aria-current="false"`, valor inválido).

### 6. Verificación

- Unit tests: app-shell (detección con varias páginas —ya añadido—, saludo único, búsqueda → pending search + navigate), movements-page (consume pending search y filtra), user-menu (nombre accesible sin duplicar).
- E2E: añadir caso "buscar desde el header navega a Movimientos con el filtro aplicado"; la suite existente debe seguir verde.

## Risks / Trade-offs

- **Selector `:scope >` en entornos limitados (happy-dom)** → ya verificado en el unit test existente; fallback a `lastElementChild` cubre ausencias.
- **Observer con `subtree` dispara más veces** → `_syncPage` es barato y Lit solo re-renderiza si `currentPage` cambia.
- **Búsqueda pendiente "pegajosa"** → `consumePendingSearch()` limpia tras leerla, evitando filtros heredados en visitas posteriores a Movimientos.
- **Duplicar estado de búsqueda con los filtros de la página** → el término solo siembra el filtro inicial; después la página es dueña del estado.

## Migration Plan

Cambios solo de cliente, sin migración de datos. Rollback: revertir commits; los fixes de detección y `APP_PAGES` son reversibles sin efectos colaterales persistentes.
