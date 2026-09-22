# Design

## Context

La landing y los componentes tienen strings hardcodeados en español. Ver `proposal.md`. El proyecto ya usa un patrón similar para el tema (`theme.ts` con estado, persistencia en `localStorage` y un evento `finap-theme-changed`). Reusaremos ese patrón para el idioma.

## Goals / Non-Goals

**Goals:**
- Sistema i18n es/en con diccionarios, resolución y persistencia.
- Traducción reactiva (re-render sin recargar).
- Selector de idioma en el header.
- Landing y etiquetas accesibles traducidas.

**Non-Goals:**
- No se añaden más idiomas (solo es/en por ahora).
- No se usa librería externa de i18n (se implementa un módulo propio).
- No se traduce contenido de páginas aún inexistentes (dashboard, movimientos, etc.).

## Decisions

### 1. Módulo i18n propio (sin dependencias)

- **Decisión**: `src/i18n/translations.ts` con un objeto `translations: Record<Locale, Record<string, string>>` y `src/i18n/i18n.ts` con `Locale = 'es' | 'en'`, `resolveLocale` (almacenado → 'es'), `setLocale`, `initLocale`, `getLocale`, `t(key)` y `LOCALE_CHANGED_EVENT`.
- **Alternativas**: usar una librería (p.ej. `lit-localize`, `i18next`). Se descartan: para es/en, un módulo propio es suficiente y evita dependencias.
- **Racional**: consistente con el patrón de `theme.ts`; simple y testeable.

### 2. Traducción reactiva con `LocalizeController`

- **Decisión**: un `LocalizeController` (ReactiveController de Lit) que escucha `finap-locale-changed` y llama `requestUpdate()` en el host. Los componentes traducen en `render()` con `t('clave')`.
- **Alternativas**: recargar la página al cambiar idioma, o usar una directive `translate`. El controller es el patrón de Lit más limpio para re-render reactivo.
- **Racional**: re-render automático sin recargar, consistente con `RevealController`.

### 3. Selector de idioma `finap-language-toggle`

- **Decisión**: componente `finap-language-toggle` con botones ES/EN (o un toggle), que usa `setLocale` y refleja el idioma activo escuchando `finap-locale-changed`. Se coloca en el header junto al `finap-theme-toggle`.
- **Alternativas**: un `<select>` nativo. Se descarta por coherencia visual con el toggle de tema.
- **Racional**: mismo patrón y estética que el toggle de tema.

### 4. Localizar etiquetas accesibles

- **Decisión**: `finap-theme-toggle` y `finap-language-toggle` usan `t()` para sus `aria-label` (y el texto visible del selector), con `LocalizeController`.
- **Racional**: accesibilidad en ambos idiomas.

### 5. Landing traducida

- **Decisión**: `landing-page` usa `LocalizeController` + `t()` para header, hero, secciones y footer. Las claves se definen en los diccionarios es/en.
- **Racional**: elimina los strings hardcodeados.

### 6. Tests

- **Decisión**: tests unitarios con Vitest + `src/test/fixture.ts`. Se testean: `i18n.ts` (resolución, persistencia, evento), `translations` (es/en con las claves), `finap-language-toggle`, y `landing-page` (cambio de idioma actualiza el texto).
- **Racional**: consistente con los cambios anteriores.

## Risks / Trade-offs

- **[Riesgo] Claves de traducción desincronizadas entre es/en** → Un test compara que ambos diccionarios tienen las mismas claves.
- **[Riesgo] Cadenas olvidadas sin traducir** → `t()` devuelve la clave como fallback visible para detectarlas en desarrollo.
- **[Trade-off] Sin pluralización/interpolación avanzada** → No necesario para el contenido actual; se añade si hace falta.
