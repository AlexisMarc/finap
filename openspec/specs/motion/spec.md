# Motion Specification

## Purpose

Define las primitivas de animación y micro-interacciones del design system (entradas, reveal on scroll y estados hover/press), con soporte obligatorio de `prefers-reduced-motion`.

## Requirements

### Requirement: Animaciones de entrada

El sistema SHALL proporcionar primitivas de entrada (fade y slide) aplicables a elementos al aparecer.

#### Scenario: Fade-in

- **WHEN** un elemento con la primitiva de fade-in aparece en el DOM
- **THEN** el elemento transiciona de opacidad 0 a 1 usando los tokens de motion

#### Scenario: Slide-in

- **WHEN** un elemento con la primitiva de slide-in aparece
- **THEN** el elemento se desliza desde su offset definido hasta su posición final

### Requirement: Reveal on scroll

El sistema SHALL proporcionar una primitiva de reveal que anima elementos al entrar en el viewport durante el scroll.

#### Scenario: Elemento revelado al entrar al viewport

- **WHEN** un elemento con reveal on scroll entra en el viewport
- **THEN** el elemento se anima a su estado visible

#### Scenario: Elemento aún fuera del viewport

- **WHEN** un elemento con reveal on scroll permanece fuera del viewport
- **THEN** el elemento se mantiene en su estado inicial (oculto) sin animar

### Requirement: Micro-interacciones

El sistema SHALL definir estados de micro-interacción (hover y press) con transiciones suaves para los elementos interactivos.

#### Scenario: Transición en hover

- **WHEN** el usuario coloca el puntero sobre un elemento interactivo con micro-interacción
- **THEN** el elemento transiciona suavemente a su estado de hover

### Requirement: Soporte de prefers-reduced-motion

El sistema SHALL desactivar o minimizar todas las animaciones cuando el usuario tiene activada la preferencia `prefers-reduced-motion: reduce`.

#### Scenario: Animaciones desactivadas

- **WHEN** el usuario tiene `prefers-reduced-motion: reduce` activado
- **THEN** las animaciones de entrada, reveal y micro-interacciones no se ejecutan (o se reducen a un cambio instantáneo de estado)
