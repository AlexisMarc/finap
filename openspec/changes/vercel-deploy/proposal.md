# Proposal

## Why

El proyecto se desplegará en **Vercel**. Al usar ahora **routing por history** (URLs limpias, sin `#`), cualquier ruta de la SPA (p. ej. `/dashboard`) debe servirse como `index.html` para que el router la resuelva; además, el service worker y el manifest de la PWA requieren cabeceras adecuadas. Sin esta configuración, las rutas profundas darían 404 y la PWA podría servirse con caché incorrecta.

## What Changes

- **`vercel.json`**: build/output, *rewrites* de SPA (todas las rutas → `index.html`) y *headers* para la PWA (`/sw.js` sin caché, manifest con su content-type).
- **Configuración de build** para Vercel (Vite: `npm run build` → `dist`).
- Verificación post-despliegue de rutas limpias y assets PWA.

Este change es **solo configuración de despliegue** (sin cambios de comportamiento de la app), por eso declara `skip_specs: true`.

## Capabilities

### New Capabilities

<!-- Ninguna: configuración de infraestructura. -->

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `vercel.json`.
- **Depende de**: routing por history (URLs limpias) ya habilitado en la app y `pwa-offline` (service worker + manifest).
