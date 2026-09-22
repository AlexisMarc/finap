# Proposal

## Why

Finap es una PWA (el mockup es "Finap PWA Desktop"). Debe ser instalable y funcionar sin conexión: abrir la app, ver datos cacheados y encolar cambios para sincronizarlos al recuperar la red. Hoy no hay manifest, service worker ni estrategia offline.

## What Changes

- **Manifest PWA**: nombre, iconos, colores de tema, `display: standalone`, `start_url`.
- **Service worker** (vía `vite-plugin-pwa`/Workbox): precache del app shell y assets; runtime caching de datos (stale-while-revalidate) e imágenes.
- **Modo offline**: la app abre y navega sin red mostrando datos cacheados; indicador de estado offline.
- **Cola de mutaciones offline**: los movimientos creados sin conexión se encolan (IndexedDB) y se sincronizan al volver la red (background sync).
- **Actualizaciones**: aviso de nueva versión disponible y recarga controlada.
- **Instalación**: prompt de instalación (A2HS) cuando esté disponible.

## Capabilities

### New Capabilities

- `pwa-offline`: instalabilidad PWA, funcionamiento offline, caché de datos/activos y cola de sincronización.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `public/manifest.webmanifest`, iconos, `vite-plugin-pwa` en `vite.config.ts`, `src/pwa/` (registro del SW, indicador offline, cola).
- **Dependencia nueva**: `vite-plugin-pwa` (+ Workbox).
- **Transversal**: `services/` (lecturas con caché y mutaciones con cola).
