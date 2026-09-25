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

### 4. API en producción: llamada directa + CORS en el backend

- **Contexto**: el backend desplegado es `https://finap-service.vercel.app` y **aún no envía cabeceras CORS**. El equipo de backend configurará CORS con el **origen del front desplegado**.
- **Decisión**: el front llama **directamente** al backend. En producción `VITE_API_BASE_URL=https://finap-service.vercel.app/api/v1` (`.env.production`). En desarrollo, `.env.development` apunta a `http://localhost:3000/api/v1` (el local sí tiene CORS `*`).
- **Requisito**: el backend debe incluir el **origen del front** (p. ej. `https://<proyecto>.vercel.app`) en su CORS (`Access-Control-Allow-Origin` y `Access-Control-Allow-Headers: authorization`), incluidos los preflight `OPTIONS`. Se obtiene tras el primer despliegue.
- **Alternativas**: proxy same-origin mediante rewrite en `vercel.json` (`/api/v1/:path*` → backend), que evita CORS. Queda como plan B si el backend no puede habilitar CORS.
- **Racional**: alineado con el plan del equipo de backend; mantiene la misma capa de datos (`src/services/http.ts`).

> Nota: hasta que el backend habilite CORS para el origen del front, el despliegue mostrará errores de red. Si se prefiere, se puede activar temporalmente el proxy del plan B (rewrite) para que funcione sin CORS.

## Goals / Non-Goals

**Goals**: desplegar la SPA en Vercel con URLs limpias y PWA correcta.
**Non-Goals**: no se configura dominio/analytics/CDN; no se cambia el ciclo de build local.

## Risks / Trade-offs

- **[Riesgo] Rewrite que capture assets** → Vercel resuelve el filesystem antes del rewrite; se verifica que `/assets/*`, `/sw.js`, `/icon.svg` se sirven directamente.
- **[Riesgo] History routing frágil (parches a Open Cells)** → Verificar en despliegue: rutas profundas (`/dashboard`) y recarga (F5) funcionan; el SW/`manifest` con cabeceras correctas.
