# Tasks

## 1. Documento de contratos

- [x] 1.1 Crear `docs/api/README.md` (convenciones: base URL, auth, fechas, moneda, paginación, errores); verificar que describe las convenciones
- [x] 1.2 Crear `docs/api/endpoints.md` con todos los endpoints (auth, usuario, cuentas, movimientos, categorías, presupuestos, deudas, análisis, dashboard, asistente); verificar que cada endpoint indica método, ruta y respuesta
- [x] 1.3 Crear `docs/api/types.md` con los tipos TypeScript esperados; verificar que compilan si se copian a un `.ts`
- [x] 1.4 Crear `docs/api/examples.md` (o `examples.json`) con payloads de ejemplo para cada endpoint; verificar que son JSON válidos

## 2. Validación

- [x] 2.1 Verificar que los ejemplos JSON son válidos (parseo) y que los tipos cubren todos los endpoints
- [x] 2.2 Ejecutar `openspec validate api-contracts --strict` y confirmar que el change valida correctamente
