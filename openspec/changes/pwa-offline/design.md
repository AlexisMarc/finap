# Design

## Context

Ver `proposal.md`. El proyecto usa Vite; la opción estándar es `vite-plugin-pwa` (Workbox) para generar el service worker y el manifest.

## Decisions

### 1. `vite-plugin-pwa` + Workbox

- **Decisión**: añadir `vite-plugin-pwa` en `vite.config.ts` con estrategia `generateSW`. Precache del app shell (HTML, JS, CSS, fuentes) y `navigateFallback` al `index.html`.
- **Alternativas**: service worker manual (más control, más trabajo). Se descarta por productividad.
- **Racional**: integración directa con Vite y Workbox.

### 2. Runtime caching de datos

- **Decisión**: estrategia `StaleWhileRevalidate` para los `GET` de la API (`/api/v1/**`) e `CacheFirst` para imágenes y fuentes.
- **Racional**: apertura inmediata con datos cacheados y actualización en segundo plano.

### 3. Cola de mutaciones (background sync)

- **Decisión**: `src/pwa/offline-queue.ts` usa IndexedDB (vía `idb`) para encolar `POST/PATCH/DELETE` fallidos por falta de red; Workbox `BackgroundSyncPlugin` los reintenta al reconectar. La UI aplica actualización optimista.
- **Alternativas**: reintentar solo en memoria (se pierde al cerrar). Se descarta.
- **Racional**: persistencia y sincronización automática.

### 4. Indicador de conexión y actualización

- **Decisión**: `src/pwa/connection-status.ts` (eventos `online`/`offline`) alimenta un componente `finap-offline-banner`; el registro del SW (`virtual:pwa-register`) muestra un aviso de "nueva versión" con acción de recarga.
- **Racional**: feedback claro al usuario.

### 5. Manifest e iconos

- **Decisión**: `manifest.webmanifest` con `name: Finap`, `theme_color`/`background_color` de tokens, `display: standalone`, `start_url: /`, iconos 192/512 (maskable).
- **Racional**: instalabilidad correcta.

## Goals / Non-Goals

**Goals**: PWA instalable, offline y con sincronización.
**Non-Goals**: sincronización bidireccional compleja (conflictos) — se resuelve con "server wins" y reconciliación básica.

## Risks / Trade-offs

- **[Riesgo] Datos cacheados obsoletos** → Indicador de "desactualizado" y revalidación al reconectar.
- **[Riesgo] Conflictos en la cola** → Política simple (server wins); se documenta y se amplía si hace falta.
- **[Trade-off] Cacheo de API** → Requiere que los `GET` sean idempotentes (lo son).
