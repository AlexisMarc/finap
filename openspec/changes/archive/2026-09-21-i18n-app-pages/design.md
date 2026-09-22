# Design

## Context

El módulo i18n (`src/i18n/`) ya existe: `t(key)`, `setLocale`, `LOCALE_CHANGED_EVENT` y `LocalizeController` (re-renderiza el host al cambiar el idioma). La landing y algunos componentes base ya lo usan. Ver `proposal.md`.

## Decisions

### 1. Patrón uniforme: `LocalizeController` + `t()`

- **Decisión**: cada página/sección/componente con texto crea `private _localize = new LocalizeController(this);` y usa `t('clave')` en `render()`. El controller ya fuerza el re-render al cambiar el idioma.
- **Alternativas**: recargar la página al cambiar idioma. Se descarta.
- **Racional**: consistente con la landing y los componentes ya localizados.

### 2. Claves de traducción por dominio

- **Decisión**: extender `src/i18n/translations.ts` con claves agrupadas por dominio (`dashboard.*`, `movements.*`, `transactions.*`, `categories.*`, `budgets.*`, `analysis.*`, `debts.*`, `settings.*`, `auth.*`, `shell.*`). Un test garantiza paridad de claves es/en.
- **Racional**: diccionarios planos y trazables; el test evita olvidos.

### 3. Formato localizado

- **Decisión**: `formatDate`/`formatRelativeDate` reciben el locale activo por defecto vía `getLocale()` (nuevo `src/i18n/format.ts` o import en `utils/format.ts`). Las palabras relativas ("Hoy"/"Ayer") se resuelven con claves i18n. `formatCurrency`/`formatPercent` siguen usando `Intl` con la moneda activa.
- **Racional**: fechas y textos relativos coherentes con el idioma.

### 4. Sin cambios de comportamiento funcional

- **Decisión**: solo se sustituyen cadenas por `t()`; la lógica no cambia.
- **Racional**: cambio seguro y verificable con los tests existentes + nuevos tests de idioma.

## Goals / Non-Goals

**Goals**: toda la app responde al selector de idioma.
**Non-Goals**: no se añaden nuevos idiomas; no se traducen datos del backend (nombres de categorías, notas), solo la UI.

## Risks / Trade-offs

- **[Riesgo] Claves olvidadas** → `t()` devuelve la clave como fallback; el test de paridad y la revisión de tests por página lo detectan.
- **[Trade-off] Traducciones de marcador** → Las traducciones en inglés se redactan con cuidado pero pueden refinarse; el sistema ya está listo.
