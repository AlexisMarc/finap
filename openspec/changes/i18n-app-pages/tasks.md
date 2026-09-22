# Tasks

## 1. Claves y formato

- [ ] 1.1 Añadir a `src/i18n/translations.ts` todas las claves de las páginas/componentes (`shell.*`, `dashboard.*`, `movements.*`, `transactions.*`, `categories.*`, `budgets.*`, `analysis.*`, `debts.*`, `settings.*`, `auth.*`); verificar que el test de paridad es/en pasa
- [ ] 1.2 Localizar `formatDate`/`formatRelativeDate` al idioma activo (p. ej. "Hoy"/"Today") y verificarlo con test

## 2. Shell y navegación

- [ ] 2.1 Localizar `app-shell` (navegación, saludo, buscar, agregar) y `user-menu` (cerrar sesión) con `t()`; verificar con test de cambio de idioma

## 3. Páginas de la aplicación

- [ ] 3.1 Localizar `dashboard` (summary, categories, debts, recent) con test
- [ ] 3.2 Localizar `movements` (page, filters, list) con test
- [ ] 3.3 Localizar `transactions` (transaction-form, confirm-dialog) y el modal "Nuevo registro" del shell con test
- [ ] 3.4 Localizar `categories` y `budgets` (páginas, form, item) con test
- [ ] 3.5 Localizar `analysis` (page, metrics) con test
- [ ] 3.6 Localizar `debts` (page, form, item) con test
- [ ] 3.7 Localizar `settings` (page y secciones) con test
- [ ] 3.8 Localizar `auth` (login-page, login-form) con test

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate i18n-app-pages --strict` y confirmar que valida
