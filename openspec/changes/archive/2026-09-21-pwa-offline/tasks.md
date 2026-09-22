# Tasks

## 1. Configuración PWA

- [x] 1.1 Añadir `vite-plugin-pwa` y configurar `generateSW` (precache + `navigateFallback`); verificar que `npm run build` genera `sw.js` y el manifest
- [x] 1.2 Crear `public/manifest.webmanifest` + iconos (192/512, maskable) y enlazarlo en `index.html`; verificar instalabilidad (Lighthouse)

## 2. Offline y caché

- [x] 2.1 Configurar runtime caching (API `StaleWhileRevalidate`, imágenes/fuentes `CacheFirst`); verificar que `/api/v1/**` se cachea
- [x] 2.2 Crear `src/pwa/connection-status.ts` + `finap-offline-banner` con test; verificar que refleja online/offline
- [x] 2.3 Adaptar `services/` para leer de caché y mostrar aviso de datos desactualizados; verificar con test

## 3. Cola de sincronización

- [x] 3.1 Crear `src/pwa/offline-queue.ts` (`localStorage`) con test; verificar que encola, lista, limpia y reenvía
- [x] 3.2 Integrar `BackgroundSyncPlugin` en las mutaciones (SW) y la sincronización manual desde el banner; verificar con test (mock de red)

## 4. Actualizaciones

- [x] 4.1 Registrar el SW con `virtual:pwa-register` y mostrar aviso de nueva versión; verificar con test/simulación

## 5. Validación

- [x] 5.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [x] 5.2 Ejecutar `npm run build` y verificar que el service worker y manifest se generan
- [x] 5.3 Ejecutar `openspec validate pwa-offline --strict` y confirmar que valida
