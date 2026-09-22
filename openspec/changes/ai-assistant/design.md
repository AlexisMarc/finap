# Design

## Context

Ver `proposal.md`, el bloque "Asistente IA" del mockup desktop y el contrato `POST /assistant/ask` en `api-contracts`.

## Decisions

### 1. Componentes

- **Decisión**: `assistant-chat` (historial + entrada) y `assistant-message` (burbuja usuario/asistente). El historial se mantiene en estado reactivo de la página/panel.
- **Racional**: componentes pequeños y testeables.

### 2. Servicio

- **Decisión**: `src/services/assistant-service.ts` (`ask(question)`) que llama al endpoint; el estado "escribiendo" se modela con una propiedad reactiva.
- **Racional**: separa red de UI.

### 3. Preguntas rápidas

- **Decisión**: preguntas sugeridas (p.ej. "¿En qué gasté más este mes?", "¿Cuánto debo?") que se envían al hacer clic; i18n.
- **Racional**: reduce la fricción inicial.

### 4. Ubicación

- **Decisión**: panel en el dashboard (como el mockup) y opción de página/panel expandible en móvil.
- **Racional**: cerca de los datos que el usuario consulta.

### 5. Streaming (futuro)

- **Decisión**: por ahora respuesta completa; se deja preparado para *streaming* si el backend lo soporta.
- **Racional**: simplicidad inicial.

## Goals / Non-Goals

**Goals**: chat funcional con preguntas y respuestas.
**Non-Goals**: acciones sobre datos desde el chat (crear movimientos) — futuro.

## Risks / Trade-offs

- **[Riesgo] Respuestas del backend** → El asistente solo presenta la respuesta; la lógica es del backend.
- **[Trade-off] Sin streaming** → Latencia percibida; se mitiga con el indicador "escribiendo".
