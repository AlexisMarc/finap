# Proposal

## Why

El mockup desktop incluye un "Asistente IA" con un chat ("¡Hola, Marcos! 👋 ¿En qué gasté más este mes? Vivienda (40%)..."). Es una funcionalidad diferenciadora que permite consultar las finanzas en lenguaje natural.

## What Changes

- **Componente de asistente** `finap-assistant`: lista de mensajes (usuario/asistente), campo de entrada y envío.
- **Preguntas rápidas** sugeridas (basadas en los datos del usuario).
- **Integración** con `POST /assistant/ask` (contrato en `api-contracts`), con estado de "escribiendo" y manejo de errores.
- **Ubicación** en el dashboard (panel) y/o página propia.

## Capabilities

### New Capabilities

- `ai-assistant`: chat de asistente financiero con preguntas en lenguaje natural.

### Modified Capabilities

<!-- Ninguna. -->

## Impact

- **Nuevo**: `src/components/assistant/`, `src/services/assistant-service.ts`.
- **Depende de**: `dashboard`, `design-system-extensions`, `api-contracts`.
