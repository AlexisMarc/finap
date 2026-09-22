# ADR-0002: Estructura por capas de Open Cells

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

Open Cells organiza una aplicación en capas con responsabilidades distintas. Necesitamos una estructura de carpetas que las refleje y sea extensible.

## Decisión

Estructurar `src/` siguiendo las capas de Open Cells:

| Capa | Paquete | Responsabilidad | Ubicación |
|------|---------|-----------------|-----------|
| Core | `@open-cells/core` | Bootstrap (`startApp`), router, canales RxJS | `src/components/app-index.ts`, `src/router/` |
| Páginas | `@open-cells/page-controller` | Páginas por ruta con ciclo de vida `onPageEnter`/`onPageLeave` | `src/pages/` |
| Elementos | `@open-cells/element-controller` | Componentes reutilizables con `inbounds`/`outbounds` | `src/components/` |

Carpetas de apoyo:

```
src/
├── components/   # ElementController + app-index (core)
├── pages/        # PageController (una por ruta)
├── router/       # definición de rutas
├── services/     # capa de datos (única puerta a la red)
├── state/        # canales y store
├── i18n/         # traducciones
├── theme/        # tema claro/oscuro
├── tokens/       # design tokens
├── motion/       # primitivas de animación
└── main.ts       # entry
```

## Consecuencias

- Responsabilidades claras: la UI no accede a la red directamente (usa `services/`).
- La comunicación entre elementos usa canales; el estado local usa propiedades reactivas de Lit.
- Convención de nombres: componentes `finap-<nombre>`, páginas `<nombre>-page`, servicios `<dominio>-service`.
