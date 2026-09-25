# Design

## Context

Ver `proposal.md`. La app es una SPA con **routing por history** (Open Cells en modo `useHistory`, habilitado en `src/router/history.ts`) y una **PWA** generada por `vite-plugin-pwa` (`dist/sw.js`, `dist/manifest.webmanifest`). Vercel debe servir `index.html` en rutas profundas y no cachear el service worker.

## Decisions

### 1. SPA fallback con `rewrites`

- **Decisión**: `vercel.json` con `rewrites: [{ "source": "/(.*)", "destination": "/index.html" }]`. Vercel sirve primero los ficheros estáticos existentes (assets, `sw.js`, iconos) y aplica el rewrite al resto → `index.html` → el router resuelve la ruta.
- **Alternativas**: *hash routing* (no requiere rewrite) — descartado por el requisito de URLs limpias.
- **Racional**: es el patrón estándar de Vercel para SPAs con history API.

### 2. Cabeceras para la PWA

- **Decisión**: cabeceras en `vercel.json`:
  - `/sw.js`: `Cache-Control: no-cache` (el SW debe actualizarse).
  - `/manifest.webmanifest`: `Content-Type: application/manifest+json`.
- **Alternativas**: dejar las cabeceras por defecto. Se descarta: el SW cacheado provoca actualizaciones obsoletas.
- **Racional**: evita servir versiones antiguas del SW.

### 3. Build en Vercel

- **Decisión**: `buildCommand: "npm run build"` y `outputDirectory: "dist"` (Vite). Node ≥ 22 (como en `engines`/entorno local).
- **Alternativas**: confiar en el autodetect de Vercel (framework Vite). Se explicita para robustez.
- **Racional**: build reproducible.

### 4. API en producción: proxy same-origin en Vercel

- **Contexto**: el backend desplegado es `https://finap-service.vercel.app` y **no envía cabeceras CORS** (`OPTIONS` → 404, sin `Access-Control-Allow-Origin`). Una llamada directa desde el navegador (otro origen) quedaría bloqueada.
- **Decisión**: **proxy same-origin**. Se añade un *rewrite* en `vercel.json` que reenvía `/api/v1/:path*` → `https://finap-service.vercel.app/api/v1/:path*` (antes del catch-all de la SPA). Así el frontend llama a `/api/v1` (mismo origen) y **no hay CORS**. En producción `VITE_API_BASE_URL` queda sin definir → default `/api/v1`. En desarrollo, `.env.development` apunta a `http://localhost:3000/api/v1` (el backend local sí tiene CORS `*`).
- **Alternativas**: configurar `VITE_API_BASE_URL=https://finap-service.vercel.app/api/v1` y que el backend habilite CORS. Se descarta por ahora: exige tocar el backend; el proxy lo evita y es transparente.
- **Racional**: funciona con el backend actual sin cambios y mantiene la misma capa de datos (`src/services/http.ts`).

> Nota: si en el futuro el backend habilita CORS, basta con definir `VITE_API_BASE_URL` como variable de entorno en Vercel y quitar el rewrite del proxy.

## Goals / Non-Goals

**Goals**: desplegar la SPA en Vercel con URLs limpias y PWA correcta.
**Non-Goals**: no se configura dominio/analytics/CDN; no se cambia el ciclo de build local.

## Risks / Trade-offs

- **[Riesgo] Rewrite que capture assets** → Vercel resuelve el filesystem antes del rewrite; se verifica que `/assets/*`, `/sw.js`, `/icon.svg` se sirven directamente.
- **[Riesgo] History routing frágil (parches a Open Cells)** → Verificar en despliegue: rutas profundas (`/dashboard`) y recarga (F5) funcionan; el SW/`manifest` con cabeceras correctas.
