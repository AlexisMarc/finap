# Tasks

## 1. Configuración de Vercel

- [x] 1.1 Crear `vercel.json` con `buildCommand`, `outputDirectory` y el rewrite SPA `/(.*)` → `/index.html`; verificar que es JSON válido
- [x] 1.2 Añadir cabeceras para la PWA (`/sw.js` con `no-cache`, `/manifest.webmanifest` con `application/manifest+json`); verificar que es JSON válido
- [x] 1.3 Documentar la variable `VITE_API_BASE_URL` para producción (`.env.example` + README) y confirmar que `src/services/http.ts` la usa con fallback `/api/v1`
- [x] 1.4 Añadir el rewrite de proxy `/api/v1/:path*` → `https://finap-service.vercel.app/api/v1/:path*` en `vercel.json` (same-origin, evita CORS); verificar que es JSON válido y que va antes del catch-all

## 2. Verificación

- [x] 2.1 Ejecutar `npm run build` y confirmar que se generan `dist/index.html`, `dist/sw.js`, `dist/manifest.webmanifest`
- [x] 2.2 Verificar localmente el fallback: `npm run preview` sirve una ruta profunda (p. ej. `/dashboard`) devolviendo `index.html`
- [x] 2.3 Ejecutar `openspec validate vercel-deploy --strict` y confirmar que valida

## 3. Despliegue (post-merge)

- [ ] 3.1 Desplegar en Vercel y verificar: `/` (landing), `/dashboard` y recarga directa (F5) no dan 404
- [ ] 3.2 Verificar la PWA: manifest accesible, service worker servido sin caché y app instalable
- [ ] 3.3 Verificar en producción que el proxy `/api/v1` funciona: login + datos reales (dashboard/movimientos) sin errores de CORS
