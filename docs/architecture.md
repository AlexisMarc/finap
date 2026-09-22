# Arquitectura de Finap

Resumen de la arquitectura de Finap. Las decisiones detalladas están en [`docs/adr/`](./adr/README.md).

## Capas (Open Cells)

```
┌─────────────────────────────────────────────────────────────┐
│                         main.ts (entry)                     │
│         estilos globales · initTheme · initLocale · startApp │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  Core         │   │  Páginas         │   │  Elementos       │
│  @open-cells/ │   │  page-controller │   │  element-        │
│  core         │   │                  │   │  controller      │
│               │   │  src/pages/*-    │   │                  │
│ startApp      │   │  page.ts         │   │ src/components/* │
│ router        │   │  onPageEnter/    │   │ inbounds/        │
│ canales RxJS  │   │  onPageLeave     │   │ outbounds        │
└───────────────┘   └──────────────────┘   └──────────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                    ┌───────────────────┐
                    │  services/        │  ← única puerta a la red
                    │  API /api/v1      │
                    └───────────────────┘
```

## Estructura de carpetas

```
src/
├── components/   # ElementController + app-index (core bootstrap)
├── pages/        # PageController (una por ruta)
├── router/       # rutas declarativas
├── services/     # capa de datos (API)
├── state/        # canales y store
├── i18n/         # traducciones (es/en)
├── theme/        # tema claro/oscuro + evento
├── tokens/       # design tokens (--finap-*)
├── motion/       # primitivas de animación
└── main.ts       # entry
```

## Flujo de datos

1. El usuario navega → el router resuelve la ruta y carga la página (lazy).
2. La página (`onPageEnter`) pide datos a `services/`.
3. El servicio llama a la API (`/api/v1`) y tipa la respuesta.
4. La página renderiza con componentes, que consumen tokens.
5. Los cambios de estado se difunden por canales de Open Cells.

## Documentación relacionada

- ADR: [`docs/adr/`](./adr/README.md)
- Contratos de API: [`docs/api/`](./api/README.md)
- Filosofía de diseño: [`docs/design-philosophy.md`](./design-philosophy.md)
