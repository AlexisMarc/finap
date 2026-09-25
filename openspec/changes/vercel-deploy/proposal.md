# Proposal

## Why

El proyecto se desplegará en **Vercel**. Al usar ahora **routing por history** (URLs limpias, sin `#`), cualquier ruta de la SPA (p. ej. `/dashboard`) debe servirse como `index.html` para que el router la resuelva; además, el service worker y el manifest de la PWA requieren cabeceras adecuadas. Sin esta configuración, las rutas profundas darían 404 y la PWA podría servirse con caché incorrecta.

Además, la app ya **consume un backend real** (`src/services/`, base `VITE_API_BASE_URL`), por lo que el build desplegado debe apuntar a una API alcanzable desde el navegador (URL del backend desplegado, con CORS, o same-origin vía proxy/rewrite).

## What Changes

- **`vercel.json`**: build/output, *rewrites* de SPA (todas las rutas → `index.html`) y *headers* para la PWA (`/sw.js` sin caché, manifest con su content-type).
- **Configuración de build** para Vercel (Vite: `npm run build` → `dist`).
- **API en producción**: `VITE_API_BASE_URL` definida como variable de entorno en Vercel (Vite la inyecta en build), documentada en `.env.example`/README.
- Verificación post-despliegue de rutas limpias, assets PWA y consumo del backend.

Este change es **solo configuración de despliegue** (sin cambios de comportamiento de la app), por eso declara `skip_specs: true`.

## Capabilities

### New Capabilities

<!-- Ninguna: configuración de infraestructura. -->

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `vercel.json`.
- **Documentación**: `.env.example` y README (config de `VITE_API_BASE_URL`).
- **Depende de**: routing por history (URLs limpias), `pwa-offline` (SW + manifest) y la capa de datos (`src/services/http.ts`, base `VITE_API_BASE_URL`).
