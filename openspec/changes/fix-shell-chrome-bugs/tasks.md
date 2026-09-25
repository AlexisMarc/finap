# Tasks

## 1. Detección de la página activa (ya aplicada, formalizar)

- [x] 1.1 `_syncPage` detecta el hijo con `state="active"` (fallback `lastElementChild`) y observa `#app` con `childList`/`subtree`/`attributes(state)`; verificar con el unit test "detecta la página activa cuando hay varias páginas montadas" y la spec E2E de auth (login → chrome visible)
- [x] 1.2 Añadir `categories` y `budgets` a `APP_PAGES`; verificar que `/categories` y `/budgets` renderizan el chrome (E2E de categories/budgets navegando desde Ajustes)

## 2. Saludo del header sin duplicación

- [ ] 2.1 La línea de nombre del topbar muestra solo `{nombre} 👋` (la palabra de saludo aparece una sola vez); verificar con unit test del app-shell (sin "Hola Hola") y snapshot E2E de dashboard

## 3. Búsqueda del header conectada a Movimientos

- [ ] 3.1 Crear `src/state/search.ts` con `setPendingSearch`/`consumePendingSearch` (lee y limpia); verificar con unit test del módulo
- [ ] 3.2 El shell captura el envío (Enter) del `finap-input` del topbar, guarda el término y navega a `movements`; verificar con unit test del app-shell (pending search seteado + navigate llamado)
- [ ] 3.3 `movements-page` consume la búsqueda pendiente en `_init()` y la siembra en `filters.search` antes del primer fetch; verificar con unit test de movements-page
- [ ] 3.4 E2E: buscar desde el header navega a Movimientos con el filtro aplicado (assert del término en la lista y URL `/movements`); verificar que la spec pasa

## 4. A11y del shell

- [ ] 4.1 Avatar del trigger del user-menu con `aria-hidden` para que el nombre accesible no duplique nombre/email; verificar con unit test del user-menu (accessible name con una sola aparición del nombre)
- [ ] 4.2 `aria-current` en la nav del shell solo cuando la sección está activa (sin `aria-current="false"`); verificar con unit test del app-shell

## 5. Validación

- [ ] 5.1 `npm test` (unitarios) en verde y `npm run build` compila
- [ ] 5.2 `npm run test:e2e` completa en verde (suite existente + nuevo caso de búsqueda)
- [ ] 5.3 `openspec validate fix-shell-chrome-bugs --strict` valida
