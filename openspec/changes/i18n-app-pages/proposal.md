# Proposal

## Why

El change `i18n` cubrió el módulo de traducción, la landing y algunos componentes base, pero las **páginas de la aplicación** (dashboard, movimientos, transacciones, categorías/presupuestos, análisis, deudas, ajustes y auth) y el **app shell** todavía tienen textos en español hardcodeados. Para cumplir la promesa de la capability `i18n` (todas las cadenas visibles) y que el selector de idioma tenga efecto en toda la app, hay que traducir el resto.

## What Changes

- **Claves de traducción** para todas las páginas, secciones y formularios de la app (es/en).
- **Uso de `LocalizeController` + `t()`** en cada página/componente (dashboard, movimientos, transacciones, categorías, presupuestos, análisis, deudas, ajustes, login) y en el `app-shell` (navegación, saludo, acciones, menú de usuario).
- **Formato localizado**: `formatDate`/`formatRelativeDate` usan el idioma activo (los importes y porcentajes ya usan `Intl`).
- **Reacción al cambio de idioma** en todas las vistas (re-render sin recargar).
- **Tests** de traducción por página/componente y de que el cambio de idioma actualiza el contenido.

> Este change complementa la capability existente `i18n`; como los changes previos aún no están archivados, se declara como capability nueva `app-localization` para ser autocontenido.

## Capabilities

### New Capabilities

- `app-localization`: cobertura de internacionalización de todas las páginas y componentes de la aplicación (textos, navegación, formularios y formato).

### Modified Capabilities

<!-- Ninguna (ver nota arriba). -->

## Impact

- **Modificado**: `src/pages/*-page.ts` (dashboard, movements, transactions, categories, budgets, analysis, debts, settings, login), `src/components/*` con textos (filtros, formularios, listas, secciones del dashboard, user-menu), `src/components/app-shell/`, `src/utils/format.ts`.
- **Sin dependencias nuevas**.
- **Depende de**: `i18n` (módulo `t()`/`LocalizeController`), ya implementado.
