# Finap — Gestor de finanzas personales

Aplicación SPA de gestión de finanzas personales construida con
**Open Cells** (framework de BBVA basado en Web Components + Lit + RxJS),
con el objetivo de demostrar buenas prácticas de arquitectura frontend.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)

## Demo

> [https://TU-USUARIO.github.io/finap](https://TU-USUARIO.github.io/finap)

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework SPA | [Open Cells](https://opencells.dev) (BBVA) |
| Componentes | [Lit](https://lit.dev) (Web Components) |
| Lenguaje | TypeScript |
| Estado | RxJS (canales pub/sub de Open Cells) |
| Build/Dev | Vite |
| Tests | Vitest + @web/test-runner |
| Gráficas | Chart.js (envuelto en web component) |
| Lint/Format | ESLint + Prettier |
| Deploy | GitHub Pages / Netlify |

## Funcionalidades

- Dashboard con resumen de saldo, ingresos y gastos (gráficas).
- Listado de movimientos con filtros y ordenación.
- Gestión de categorías (crear/editar/eliminar).
- Presupuestos por categoría con indicador de progreso.
- Persistencia local (`localStorage`) y modo oscuro.
- i18n español/inglés.

## Arquitectura

```
src/
├── components/
│   ├── app-index.ts        # Bootstrap de la app (startApp)
│   ├── finap-card.ts       # Componentes reutilizables
│   ├── finap-table.ts
│   ├── finap-chart.ts
│   └── finap-form.ts
├── pages/
│   ├── dashboard-page.ts   # Páginas (una por ruta)
│   ├── movements-page.ts
│   ├── categories-page.ts
│   ├── budget-page.ts
│   └── settings-page.ts
├── router/
│   └── routes.ts           # Definición de rutas de Open Cells
├── state/
│   ├── channels.ts         # Canales (RxJS) de estado global
│   └── store.ts            # Lógica de negocio / persistencia
└── services/
    └── api.ts              # Capa de datos (mock/API)
```

### Conceptos clave de Open Cells usados

- **Routing**: `routes.ts` asocia cada ruta a su página (web component).
- **Estado**: canales RxJS con `publish`/`subscribe` desde
  `PageController`/`ElementController`.
- **Ciclo de vida**: `onPageEnter` (cargar datos) y `onPageLeave`
  (limpiar estado) en cada página.

## Instalación y uso

```bash
npm install
npm run dev        # entorno de desarrollo
npm run build      # build de producción
npm run preview    # preview del build
npm run test       # tests unitarios
npm run lint       # ESLint
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite + HMR) |
| `npm run build` | Build de producción |
| `npm run test` | Tests (Vitest / Web Test Runner) |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Prettier write |

## Roadmap

- [x] Scaffold con Open Cells + Lit + Vite
- [ ] Dashboard con gráficas
- [ ] CRUD de movimientos y categorías
- [ ] Presupuestos con progreso
- [ ] i18n y modo oscuro
- [ ] Tests de controllers y componentes
- [ ] Deploy a GitHub Pages

## Licencia

Apache-2.0 (misma licencia que Open Cells).
