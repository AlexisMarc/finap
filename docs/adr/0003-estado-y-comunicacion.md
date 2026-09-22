# ADR-0003: Estado y comunicación

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

La aplicación tiene estado global (sesión, idioma, tema, datos compartidos) y estado local por componente. Hace falta un criterio claro de cuándo usar cada mecanismo.

## Decisión

- **Estado local**: propiedades reactivas de Lit (`static properties`). Es la opción por defecto.
- **Estado global**: canales RxJS de Open Cells (`publish`/`subscribe`), gestionados desde un módulo en `src/state/`.
- **Comunicación entre componentes**: canales de Open Cells, con `inbounds`/`outbounds` cuando el componente es reutilizable (`element-controller`).
- **Persistencia ligera** (tema, idioma, sesión): `localStorage`, encapsulada en su módulo correspondiente.

## Consecuencias

- Menos acoplamiento: los componentes no se conocen entre sí, se comunican por canales.
- El estado global vive en `src/state/`; el estado de vista, en cada componente.
- Se evita duplicar el estado en varios sitios.
