# Spec Delta

## Purpose

Define el asistente financiero de Finap: un chat que permite al usuario hacer preguntas en lenguaje natural sobre sus finanzas y recibir respuestas, con preguntas rápidas sugeridas.

## ADDED Requirements

### Requirement: Chat del asistente

El sistema SHALL proporcionar un chat con historial de mensajes (usuario y asistente) y un campo de entrada para escribir preguntas.

#### Scenario: Enviar pregunta

- **WHEN** el usuario escribe una pregunta y envía
- **THEN** la pregunta aparece en el historial junto con la respuesta del asistente

#### Scenario: Estado de escritura

- **WHEN** el asistente está generando una respuesta
- **THEN** se muestra un indicador de "escribiendo"

### Requirement: Preguntas rápidas

El sistema SHALL ofrecer preguntas sugeridas que el usuario puede enviar con un clic.

#### Scenario: Usar pregunta rápida

- **WHEN** el usuario pulsa una pregunta sugerida
- **THEN** se envía como una pregunta normal

### Requirement: Manejo de errores

El sistema SHALL manejar los errores del asistente sin perder la pregunta del usuario.

#### Scenario: Error del asistente

- **WHEN** falla la consulta al asistente
- **THEN** se muestra un mensaje de error y se permite reintentar
