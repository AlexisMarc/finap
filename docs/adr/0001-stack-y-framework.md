# ADR-0001: Stack y framework

- **Estado**: Aceptado
- **Fecha**: 2026-09-21

## Contexto

Finap es una SPA de finanzas personales que debe ser una PWA, con Web Components, buenas prácticas de arquitectura frontend y multi-idioma. El proyecto nace como demostración de arquitectura frontend.

## Decisión

Usar **TypeScript** con **Lit** (Web Components) y **Open Cells** (BBVA) para el bootstrap, routing y estado, y **Vite** para desarrollo/build. Los estilos se basan en **design tokens** (CSS custom properties). Los tests usan **Vitest** con `happy-dom`.

## Consecuencias

- Web Components nativos: encapsulación por Shadow DOM y portabilidad.
- Open Cells aporta router, canales de estado y ciclo de vida de páginas.
- Vite da HMR y builds rápidos; permite integración PWA.
- Se asume el coste de aprendizaje de Open Cells y la gestión de Shadow DOM en tests.
