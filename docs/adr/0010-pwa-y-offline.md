# ADR-0010: PWA y offline

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

Finap es una PWA (ver mockup "Finap PWA Desktop") y debe ser instalable y funcionar sin conexión.

## Decisión

- Usar **`vite-plugin-pwa`** (Workbox) con estrategia `generateSW`.
- **Precache** del app shell (HTML/JS/CSS/fuentes) y `navigateFallback` al `index.html`.
- **Runtime caching**: API `StaleWhileRevalidate` (datos) y `CacheFirst` (imágenes/fuentes).
- **Cola de mutaciones** en IndexedDB (`src/pwa/offline-queue.ts`) + `BackgroundSyncPlugin` para reintentar al reconectar, con actualización optimista.
- **Indicador** de estado de conexión (`online`/`offline`) y **aviso de nueva versión** con recarga controlada.

## Consecuencias

- La app abre y navega sin red y sincroniza al reconectar.
- Se asume una política de conflicto simple ("server wins").
- El service worker debe actualizarse con cuidado para no servir versiones obsoletas.
