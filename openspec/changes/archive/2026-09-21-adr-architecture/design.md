# Design

## Context

Ver `proposal.md`. Este change materializa los ADR y la documentación de arquitectura. La estructura debe seguir las capas de Open Cells (BBVA): `@open-cells/core` (bridge/router/estado), `@open-cells/page-controller` (páginas con ciclo de vida) y `@open-cells/element-controller` (componentes con inbounds/outbounds).

## Decisiones (contenido de los ADR)

### Capas de Open Cells

| Capa | Paquete | Responsabilidad | En Finap |
|------|---------|-----------------|----------|
| Core | `@open-cells/core` | Bootstrap (`startApp`), router, canales RxJS (pub/sub), bridge | `src/components/app-index.ts`, `src/router/routes.ts` |
| Páginas | `@open-cells/page-controller` | Páginas asociadas a rutas; ciclo de vida `onPageEnter`/`onPageLeave` | `src/pages/*-page.ts` |
| Elementos | `@open-cells/element-controller` | Componentes reutilizables con `inbounds`/`outbounds` (canales) | `src/components/*` |

### Estructura de carpetas

```
src/
├── components/        # ElementController: UI reutilizable + app-index (core)
│   ├── app-index.ts   # bootstrap startApp
│   └── <nombre>/      # componente + styles + test
├── pages/             # PageController: una página por ruta
├── router/            # definición declarativa de rutas
├── services/          # capa de datos (API client); única puerta a la red
├── state/             # canales (channels) y store
├── i18n/              # traducciones y localización
├── theme/             # tema claro/oscuro + evento
├── tokens/            # design tokens (CSS custom properties)
├── motion/            # primitivas de animación
└── main.ts            # entry: estilos globales + initTheme + initLocale + startApp
```

### Convenciones

- **Nomenclatura**: componentes `finap-<nombre>`; páginas `<nombre>-page`; servicios `<dominio>-service`.
- **Un test por componente** (Vitest + `src/test/fixture.ts`).
- **Estilos** solo con tokens (`--finap-*`), sin valores hardcodeados.
- **Datos**: los componentes/páginas nunca llaman a `fetch` directamente; usan `src/services/`.
- **Estado**: la comunicación entre elementos usa canales de Open Cells; el estado local usa propiedades reactivas de Lit.
- **i18n**: todo texto visible usa `t('clave')` (módulo propio, es/en).
- **PWA**: capa de caché/offline aislada (ver ADR de PWA).

### ADR a crear (`docs/adr/`)

1. `0001-stack-y-framework.md` — Lit + Open Cells + Vite + TypeScript.
2. `0002-estructura-por-capas-opencells.md` — capas core/page/element y carpetas.
3. `0003-estado-y-comunicacion.md` — canales RxJS, store, `element-controller`.
4. `0004-routing.md` — `startApp` + rutas declarativas + lazy loading + guard.
5. `0005-capa-de-datos.md` — `services/` como única puerta a la red; contratos tipados.
6. `0006-design-system-y-estilos.md` — tokens, componentes base, convenciones de estilo.
7. `0007-theming.md` — light/dark con `data-theme` + evento.
8. `0008-i18n.md` — módulo propio es/en + `LocalizeController`.
9. `0009-testing.md` — Vitest, `fixture`, convenciones de test.
10. `0010-pwa-y-offline.md` — service worker/estrategia offline (referencia al change `pwa-offline`).

Además, `docs/architecture.md` como resumen (índice + diagrama de capas).

## Goals / Non-Goals

**Goals**: dejar documentados estándares y estructura por capas Open Cells.
**Non-Goals**: no se escribe código de producto en este change.

## Risks / Trade-offs

- **[Riesgo] ADR desactualizados** → Se enlazan desde `docs/architecture.md` y se actualizan con `openspec-update`.
- **[Trade-off] Formato de ADR propio** → Se usa el formato estándar (Contexto / Decisión / Estado / Consecuencias).
