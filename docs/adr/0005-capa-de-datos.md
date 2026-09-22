# ADR-0005: Capa de datos

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

La app consume una API (ver `docs/api/`). Necesitamos una única puerta a la red para tipar, cachear, manejar errores y, más adelante, soportar offline.

## Decisión

- Crear `src/services/` con un cliente HTTP común y un servicio por dominio (`auth-service`, `transactions-service`, `dashboard-service`, etc.).
- Los componentes y páginas **nunca** llaman a `fetch` directamente; usan los servicios.
- Los tipos de dominio viven en `src/services/types.ts`, alineados con `docs/api/types.md`.
- El cliente centraliza: base URL (`/api/v1`), cabecera de auth, parseo de errores y, opcionalmente, caché (ver `pwa-offline`).

## Consecuencias

- Punto único para cambiar base URL, auth, caché o mocks.
- Los servicios son testeables con el cliente mockeado.
- La lógica de negocio de presentación queda en las páginas/componentes, no en la red.
