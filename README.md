# Finap — Gestor de finanzas personales

SPA (PWA) de gestión de finanzas personales construida con **Open Cells** (BBVA) +
**Lit** + **Vite** + **TypeScript**, con el objetivo de demostrar buenas prácticas de
arquitectura frontend: design system con tokens, capas desacopladas, i18n,
accesibilidad, testing y offline.

![Estado](https://img.shields.io/badge/estado-MVP%20funcional-green)
![Tests](https://img.shields.io/badge/tests-259%20passing-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-Apache--2.0-blue)

## Demo

> Desplegable en **Vercel** (ver [`vercel.json`](./vercel.json)). `npm run dev` levanta el entorno local.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework SPA | [Open Cells](https://opencells.dev) (BBVA) — `@open-cells/core` |
| Componentes | [Lit](https://lit.dev) 3 (Web Components) |
| Lenguaje | TypeScript (estricto) |
| Build/Dev | [Vite](https://vite.dev) |
| Routing | Open Cells (history API, URLs limpias) |
| Estado | Canales de Open Cells (RxJS) + propiedades reactivas de Lit |
| Tests | Vitest + happy-dom |
| Gráficas | Chart.js (envuelto en `finap-chart`) |
| Tipografías | Inter (cuerpo) + Sora (títulos) vía `@fontsource` |
| PWA | `vite-plugin-pwa` (Workbox): offline, caché y background sync |
| Deploy | Vercel |

## Funcionalidades

- **Landing** de producto (hero, features, footer) con identidad de marca y animaciones sutiles.
- **Autenticación**: inicio de sesión, sesión persistida y cierre de sesión.
- **Dashboard**: balance, estadísticas del mes, gastos por categoría, deudas y últimos movimientos.
- **Movimientos**: listado paginado con filtros (tipo, categoría, fechas), búsqueda y ordenación.
- **Registro de movimientos**: alta/edición/borrado (gasto, ingreso o deuda).
- **Categorías y presupuestos**: CRUD de categorías y presupuestos por categoría con progreso.
- **Deudas**: alta/edición, registro de pagos y progreso.
- **Análisis**: métricas y gráficas (evolución y distribución por categoría) con Chart.js.
- **Asistente IA**: chat con preguntas en lenguaje natural.
- **Ajustes**: perfil, tema (claro/oscuro), idioma (es/en) y moneda.
- **PWA/offline**: instalable, funciona sin conexión y sincroniza al reconectar.
- **i18n** español/inglés (toda la interfaz) y **modo oscuro**.

## Arquitectura

```
src/
├── components/        # Web Components: foundation + app + app-shell + app-index (bootstrap)
├── pages/             # una página por ruta (dashboard, movements, login, ...)
├── router/            # routes.ts (rutas) + history.ts (URLs limpias)
├── services/          # capa de datos: http.ts + types.ts + <dominio>-service.ts
├── state/             # sesión, eventos de cambio (transacciones/deudas)
├── i18n/              # i18n.ts (t()/setLocale) + translations.ts + localize.ts
├── theme/             # theme.ts + theme.css (claro/oscuro, evento finap-theme-changed)
├── tokens/            # design tokens (--finap-*)
├── motion/            # primitivas de animación (reveal on scroll, fade/slide)
├── pwa/               # connection-status, offline-queue, register-sw
├── utils/             # formato (Intl: moneda, porcentaje, fechas)
├── test/              # helper de test (fixture)
└── main.ts            # entry: estilos + initTheme + initLocale + PWA + startApp
```

### Capas de Open Cells

- **Core** (`@open-cells/core`): `startApp` arranca la app con `mainNode` y **rutas declarativas**
  (`name`, `path`, `component`, `action` → import perezoso de la página).
- **Guard**: un `interceptor` en `appConfig` protege las rutas de la app y redirige a login.
- **Routing por history**: URLs limpias (sin `#`); en Vercel se resuelven con un *rewrite* a `index.html`.
- **Datos**: los componentes/páginas **nunca** llaman a `fetch`; usan `src/services/` (única puerta a la red).
- **Estado**: comunicación por eventos/canales; estado de vista con propiedades reactivas de Lit.

> El ciclo de vida `PageController`/`ElementController` de Open Cells (que vive en paquetes separados)
> queda previsto para páginas con carga/limpieza de datos.

## Documentación

- **ADR** ([`docs/adr/`](./docs/adr/README.md)): decisiones de arquitectura (stack, capas, estado, routing, datos, design system, theming, i18n, testing, PWA).
- **Contratos de API** ([`docs/api/`](./docs/api/README.md)): endpoints, tipos y payloads de ejemplo para el backend.
- **Arquitectura** ([`docs/architecture.md`](./docs/architecture.md)): resumen y diagrama de capas.
- **Filosofía de diseño** ([`docs/design-philosophy.md`](./docs/design-philosophy.md)): identidad visual (_Faceta Cálida_), inspirada en la paleta de Mastercard y en la sutileza de las animaciones de Apple.

## Instalación y uso

```bash
npm install
npm run dev        # servidor de desarrollo (Vite + HMR)
npm run build      # build de producción (tsc + vite build)
npm run preview    # previsualiza el build
npm run test       # tests unitarios
npm run test:watch # tests en modo watch
```

## Configuración

La URL del backend se define con la variable de entorno **`VITE_API_BASE_URL`** (ver [`.env.example`](./.env.example)):

- **Desarrollo**: `.env.development` → `http://localhost:3000/api/v1` (backend local, con CORS).
- **Producción (Vercel)**: el frontend usa `/api/v1` (same-origin) y Vercel **proxea** `/api/v1/*` al backend desplegado mediante un *rewrite* en [`vercel.json`](./vercel.json) (`https://finap-service.vercel.app/api/v1/*`), evitando CORS. Si el backend habilita CORS, basta definir `VITE_API_BASE_URL` como variable de entorno en Vercel.

La capa de datos está aislada en `src/services/` (única puerta a la red); los contratos están documentados en [`docs/api/`](./docs/api/README.md).

## Tests

- **Vitest** + **happy-dom**, un test unitario por componente y por módulo con lógica.
- Helper `src/test/fixture.ts`: monta componentes con `new Componente()` + `connectedCallback()`
  + `updateComplete` (evita el problema conocido de happy-dom con `document.createElement` + Shadow DOM).
- Se testean también tokens, tema, i18n, formato y los servicios (con `fetch` mockeado).

## Despliegue (Vercel)

- `vercel.json` incluye el **rewrite SPA** (`/(.*)` → `/index.html`) y cabeceras para la PWA
  (`/sw.js` sin caché, manifiesto con `application/manifest+json`).
- Build: `npm run build` → `dist/` (incluye `sw.js` y `manifest.webmanifest`).

## Roadmap

- [x] Scaffold Open Cells + Lit + Vite
- [x] Design system (tokens + componentes base y de app)
- [x] Landing de producto
- [x] App shell, routing y guard de sesión
- [x] Autenticación (login/sesión)
- [x] Dashboard, movimientos, transacciones, categorías/presupuestos, análisis y deudas
- [x] Ajustes, i18n (es/en) y modo oscuro
- [x] Asistente IA
- [x] PWA + offline
- [x] Tests unitarios y despliegue en Vercel

## Licencia

Apache-2.0 (misma licencia que Open Cells).
