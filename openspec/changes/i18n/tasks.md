# Tasks

## 1. Sistema i18n

- [x] 1.1 Crear `src/i18n/translations.ts` con los diccionarios `es` y `en` (todas las claves de la landing y componentes); verificar que un test compara que ambos diccionarios tienen las mismas claves
- [x] 1.2 Crear `src/i18n/i18n.ts` (`Locale`, `resolveLocale`, `setLocale`, `initLocale`, `getLocale`, `t`, `LOCALE_CHANGED_EVENT`); verificar que el test de resolución/persistencia/evento pasa
- [x] 1.3 Crear `src/i18n/localize.ts` (`LocalizeController` que re-renderiza el host al cambiar el idioma); verificar que el test del controller pasa

## 2. Selector de idioma

- [x] 2.1 Crear `src/components/language-toggle/index.ts` (alterna ES/EN, refleja estado) con su test; verificar que el test de language-toggle pasa
- [x] 2.2 Localizar las etiquetas accesibles de `src/components/theme-toggle/index.ts` con `t()`; verificar que el test de theme-toggle sigue pasando

## 3. Landing traducida

- [x] 3.1 Traducir `src/pages/landing-page.ts` (header, hero, secciones y footer) usando `LocalizeController` + `t()`; verificar que el test de landing cubre cambio de idioma
- [x] 3.2 Añadir el `finap-language-toggle` al header de la landing; verificar que el test de header incluye el selector de idioma
- [x] 3.3 Inicializar el idioma en `src/main.ts` (`initLocale()`); verificar que `npm run dev` arranca sin errores

## 4. Tests

- [x] 4.1 Test de `i18n.ts` (resolución, persistencia, evento de cambio)
- [x] 4.2 Test de `landing-page` (contenido cambia de español a inglés)

## 5. Validación

- [x] 5.1 Ejecutar `npm run test` y confirmar que toda la suite pasa sin fallos
- [x] 5.2 Ejecutar `npm run build` y confirmar que el build de producción compila sin errores
- [x] 5.3 Ejecutar `openspec validate i18n --strict` y confirmar que el change valida correctamente
