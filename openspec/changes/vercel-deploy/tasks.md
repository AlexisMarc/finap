# Tasks

## 1. Configuración de Vercel

- [x] 1.1 Crear `vercel.json` con `buildCommand`, `outputDirectory` y el rewrite SPA `/(.*)` → `/index.html`; verificar que es JSON válido
- [x] 1.2 Añadir cabeceras para la PWA (`/sw.js` con `no-cache`, `/manifest.webmanifest` con `application/manifest+json`); verificar que es JSON válido

## 2. Verificación

- [x] 2.1 Ejecutar `npm run build` y confirmar que se generan `dist/index.html`, `dist/sw.js`, `dist/manifest.webmanifest`
- [x] 2.2 Verificar localmente el fallback: `npm run preview` sirve una ruta profunda (p. ej. `/dashboard`) devolviendo `index.html`
- [x] 2.3 Ejecutar `openspec validate vercel-deploy --strict` y confirmar que valida

## 3. Despliegue (post-merge)

- [ ] 3.1 Desplegar en Vercel y verificar: `/` (landing), `/dashboard` y recarga directa (F5) no dan 404
- [ ] 3.2 Verificar la PWA: manifest accesible, service worker servido sin caché y app instalable
