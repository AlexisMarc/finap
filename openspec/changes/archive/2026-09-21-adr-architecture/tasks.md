# Tasks

## 1. ADR fundacionales

- [x] 1.1 Crear `docs/adr/0001-stack-y-framework.md` (Lit + Open Cells + Vite + TS); verificar formato ADR (Contexto/Decisión/Estado/Consecuencias)
- [x] 1.2 Crear `docs/adr/0002-estructura-por-capas-opencells.md` (core/page/element + carpetas); verificar que refleja la estructura real de `src/`

## 2. ADR de arquitectura de aplicación

- [x] 2.1 Crear `docs/adr/0003-estado-y-comunicacion.md`; verificar que describe canales RxJS, store y `element-controller`
- [x] 2.2 Crear `docs/adr/0004-routing.md`; verificar que describe `startApp`, rutas declarativas, lazy loading y guard
- [x] 2.3 Crear `docs/adr/0005-capa-de-datos.md`; verificar que define `services/` como única puerta a la red y contratos tipados
- [x] 2.4 Crear `docs/adr/0006-design-system-y-estilos.md`; verificar que describe tokens y convenciones de estilo
- [x] 2.5 Crear `docs/adr/0007-theming.md`; verificar que describe light/dark con `data-theme` y evento
- [x] 2.6 Crear `docs/adr/0008-i18n.md`; verificar que describe el módulo i18n y `LocalizeController`
- [x] 2.7 Crear `docs/adr/0009-testing.md`; verificar que describe Vitest + `fixture`
- [x] 2.8 Crear `docs/adr/0010-pwa-y-offline.md`; verificar que describe la estrategia offline (referencia a `pwa-offline`)

## 3. Resumen

- [x] 3.1 Crear `docs/architecture.md` (índice + diagrama de capas) enlazando los ADR; verificar que los enlaces resuelven
- [x] 3.2 Ejecutar `openspec validate adr-architecture --strict` y confirmar que el change valida correctamente
