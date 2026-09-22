# Tasks

## 1. Servicio

- [ ] 1.1 Crear `src/services/assistant-service.ts` (`ask`) con test (cliente mockeado); verificar que pasa

## 2. Componentes

- [ ] 2.1 Crear `assistant-message` (burbuja) con test; verificar que pasa
- [ ] 2.2 Crear `assistant-chat` (historial, entrada, escribir, errores, preguntas rápidas) con test; verificar que pasa

## 3. Integración

- [ ] 3.1 Integrar el asistente como panel en el dashboard; verificar con test/`npm run dev`
- [ ] 3.2 Traducir textos del asistente (i18n); verificar con test

## 4. Validación

- [ ] 4.1 Ejecutar `npm run test` y confirmar que toda la suite pasa
- [ ] 4.2 Ejecutar `npm run build` y confirmar que compila
- [ ] 4.3 Ejecutar `openspec validate ai-assistant --strict` y confirmar que valida
