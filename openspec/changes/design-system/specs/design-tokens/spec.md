# Spec Delta

## Purpose

Define los tokens de diseño (color, tipografía, espaciado, radio, elevación, motion y breakpoints) como CSS custom properties compartidas por toda la aplicación, con soporte de tema claro y oscuro.

## ADDED Requirements

### Requirement: Tokens expuestos como CSS custom properties

El sistema SHALL exponer todos los tokens de diseño como CSS custom properties (variables CSS) con el prefijo `--finap-`, disponibles globalmente para cualquier componente.

#### Scenario: Tokens globales disponibles

- **WHEN** un componente de la aplicación se renderiza dentro del árbol que importa los tokens
- **THEN** las variables `--finap-*` están definidas y son accesibles desde los estilos del componente

#### Scenario: Prefijo de nomenclatura consistente

- **WHEN** se consulta cualquier token de diseño
- **THEN** su nombre comienza con el prefijo `--finap-`

### Requirement: Paleta de color

El sistema SHALL definir una paleta de color con colores primarios (naranja/rojo), neutros (grises) y fondos, inspirada en la paleta de Mastercard, y exponerla como tokens de color.

#### Scenario: Color primario definido

- **WHEN** se consulta el token de color primario
- **THEN** devuelve un valor de color válido (naranja/rojo) coherente con la identidad de marca

#### Scenario: Colores de texto y fondo con contraste suficiente

- **WHEN** se aplican los tokens de color de texto sobre los tokens de color de fondo
- **THEN** la combinación cumple un contraste mínimo accesible (WCAG AA)

### Requirement: Tema claro y oscuro

El sistema SHALL proporcionar un tema claro (por defecto) y un tema oscuro, seleccionables y aplicables globalmente sin recargar la página.

#### Scenario: Tema por defecto

- **WHEN** la aplicación se carga sin preferencia explícita del usuario
- **THEN** se aplica el tema claro

#### Scenario: Cambio a tema oscuro

- **WHEN** el usuario activa el tema oscuro
- **THEN** los tokens de color cambian a sus valores oscuros en toda la aplicación

#### Scenario: Respetar preferencia del sistema

- **WHEN** el usuario no ha elegido tema y su sistema prefiere modo oscuro (`prefers-color-scheme: dark`)
- **THEN** se aplica el tema oscuro

### Requirement: Tipografía

El sistema SHALL definir una escala tipográfica (tamaños, pesos y alturas de línea) como tokens, aplicable a títulos y texto de cuerpo.

#### Scenario: Escala tipográfica definida

- **WHEN** se consultan los tokens tipográficos (título, cuerpo, etiqueta)
- **THEN** cada uno devuelve tamaño, peso e interlineado coherentes con una escala definida

### Requirement: Espaciado, radio, elevación y breakpoints

El sistema SHALL definir tokens para la escala de espaciado, radios de esquina, niveles de elevación (sombra) y breakpoints de layout responsivo.

#### Scenario: Escala de espaciado disponible

- **WHEN** un componente necesita aplicar espaciado consistente
- **THEN** dispone de tokens de espaciado en una escala definida (por ejemplo, múltiplos de una unidad base)

#### Scenario: Breakpoints de layout

- **WHEN** la viewport cruza un breakpoint definido
- **THEN** el layout puede adaptarse usando los tokens de breakpoint correspondientes

### Requirement: Tokens de motion

El sistema SHALL definir tokens de motion (duraciones y curvas de easing) para las animaciones.

#### Scenario: Tokens de motion disponibles

- **WHEN** se consultan los tokens de motion
- **THEN** devuelven duraciones y easings con nombre (por ejemplo, `--finap-motion-duration-fast`, `--finap-motion-easing-standard`)
