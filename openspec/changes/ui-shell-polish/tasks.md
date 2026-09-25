# Tasks

## 1. Sidebar

- [ ] 1.1 Alinear icono/texto de `sp-sidenav-item` y corregir el desborde de la línea divisoria en modo oscuro; verificar unit tests del shell y revisión visual

## 2. Header y menú de usuario

- [ ] 2.1 Agrupar "Agregar" y acciones con `sp-action-group`; verificar `e2e/dashboard.spec.ts`
- [ ] 2.2 Ampliar el `sp-action-menu` del usuario con avatar/nombre y acciones de tema, moneda, idioma y cerrar sesión; verificar `e2e/auth.spec.ts`

## 3. Tema como botón

- [ ] 3.1 Sustituir `sp-switch` por `sp-action-button` con icono sol/luna (en header/menú y Ajustes); actualizar unit tests y E2E de tema (landing/settings)

## 4. Breadcrumbs y ayuda

- [ ] 4.1 Añadir `sp-breadcrumbs` derivados de la sección actual; verificar unit test del shell
- [ ] 4.2 Añadir botón de ayuda con tour de pasos (`sp-coachmark` o plan B con overlay); verificar con E2E puntual

## 5. Validación

- [ ] 5.1 `npm test` en verde y `npm run build` compila
- [ ] 5.2 `npm run test:e2e` completa en verde
- [ ] 5.3 `openspec validate ui-shell-polish --strict` valida
