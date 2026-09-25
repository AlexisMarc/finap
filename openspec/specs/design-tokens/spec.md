# Design Tokens Specification

## Purpose

Define los tokens de diseño (color, tipografía, espaciado, radio, elevación, motion y breakpoints) como CSS custom properties compartidas por toda la aplicación, con soporte de tema claro y oscuro, basados en Spectrum.

## Requirements

### Requirement: Tokens expuestos como CSS custom properties

El sistema SHALL exponer los tokens de diseño como CSS custom properties disponibles globalmente, con el prefijo `--finap-` para los tokens propios de Finap y el prefijo `--spectrum-` para los tokens del design system.

#### Scenario: Tokens globales disponibles

- **WHEN** un componente de la aplicación se renderiza dentro del árbol que importa los tokens
- **THEN** las variables `--finap-*` y `--spectrum-*` están definidas y son accesibles desde los estilos del componente

#### Scenario: Prefijo de nomenclatura consistente

- **WHEN** se consulta cualquier token propio de Finap
- **THEN** su nombre comienza con el prefijo `--finap-`

### Requirement: Paleta de color

El sistema SHALL usar la paleta de color de Spectrum como base, manteniendo el acento de marca de Finap (naranja/rojo) mediante tokens propios derivados.

#### Scenario: Color primario definido

- **WHEN** se consulta el token de color primario de marca
- **THEN** devuelve un valor de color válido (naranja/rojo) coherente con la identidad de marca

#### Scenario: Colores de texto y fondo con contraste suficiente

- **WHEN** se aplican los tokens de color de texto sobre los tokens de color de fondo
- **THEN** la combinación cumple un contraste mínimo accesible (WCAG AA)

### Requirement: Tema claro y oscuro

El sistema SHALL proporcionar un tema claro (por defecto) y un tema oscuro, seleccionables y aplicables globalmente sin recargar la página, con cobertura completa de todos los tokens y componentes (fondos, superficies, textos, acentos y gradiente de marca).

#### Scenario: Tema por defecto

- **WHEN** la aplicación se carga sin preferencia explícita del usuario
- **THEN** se aplica el tema claro

#### Scenario: Cambio a tema oscuro

- **WHEN** el usuario activa el tema oscuro
- **THEN** los tokens de color cambian a sus valores oscuros en toda la aplicación

#### Scenario: Respetar preferencia del sistema

- **WHEN** el usuario no ha elegido tema y su sistema prefiere modo oscuro (`prefers-color-scheme: dark`)
- **THEN** se aplica el tema oscuro

#### Scenario: Cobertura completa en modo oscuro

- **WHEN** se activa el tema oscuro
- **THEN** todos los componentes y tokens (incluidos los acentos de marca y el gradiente) muestran valores coherentes con el tema oscuro

### Requirement: Tipografía

El sistema SHALL definir una escala tipográfica (familias, tamaños, pesos y alturas de línea) como tokens basados en la escala tipográfica de Spectrum.

#### Scenario: Escala tipográfica definida

- **WHEN** se consultan los tokens tipográficos (título, cuerpo, etiqueta)
- **THEN** cada uno devuelve familia, tamaño, peso e interlineado coherentes con la escala de Spectrum

#### Scenario: Familias de cuerpo y títulos

- **WHEN** se consultan los tokens de familia tipográfica
- **THEN** devuelven las familias de Spectrum definidas por el design system

### Requirement: Espaciado, radio, elevación y breakpoints

El sistema SHALL definir tokens para la escala de espaciado, radios de esquina, niveles de elevación (sombra) y breakpoints de layout responsivo, derivados de las escalas de Spectrum.

#### Scenario: Escala de espaciado disponible

- **WHEN** un componente necesita aplicar espaciado consistente
- **THEN** dispone de tokens de espaciado en una escala definida (por ejemplo, múltiplos de una unidad base)

#### Scenario: Breakpoints de layout

- **WHEN** la viewport cruza un breakpoint definido
- **THEN** el layout puede adaptarse usando los tokens de breakpoint correspondientes

### Requirement: Tokens de motion

El sistema SHALL definir tokens de motion (duraciones y curvas de easing) para las animaciones, alineados con las curvas de motion de Spectrum.

#### Scenario: Tokens de motion disponibles

- **WHEN** se consultan los tokens de motion
- **THEN** devuelven duraciones y easings con nombre (por ejemplo, `--finap-motion-duration-fast`, `--finap-motion-easing-standard`)

### Requirement: Gradiente de marca

El sistema SHALL definir un token de gradiente de marca compuesto por los tres colores de la paleta (rojo, naranja y amarillo) para fondos y elementos decorativos de identidad.

#### Scenario: Token de gradiente disponible

- **WHEN** un componente necesita aplicar el gradiente de marca
- **THEN** dispone de un token `--finap-*` que expone un gradiente lineal rojo → naranja → amarillo

#### Scenario: Tres colores en el gradiente

- **WHEN** se consulta el token de gradiente de marca
- **THEN** el gradiente contiene los colores primario (rojo), secundario (naranja) y acento (amarillo)

### Requirement: Colores semánticos

El sistema SHALL definir tokens de color semánticos para estados financieros y acentos: positivo/ingreso, negativo/gasto, deuda y acento secundario.

#### Scenario: Colores semánticos disponibles

- **WHEN** un componente necesita indicar un ingreso
- **THEN** dispone de un token de color positivo (verde) coherente con el tema

#### Scenario: Colores semánticos en modo oscuro

- **WHEN** se activa el tema oscuro
- **THEN** los colores semánticos (ingreso, gasto, deuda y acento) tienen valores coherentes con el tema oscuro

### Requirement: Escala de radios y elevación

El sistema SHALL definir una escala de radios de esquina y niveles de elevación alineada a la interfaz de la app (radios variados según jerarquía y sombra de modal), derivada de las escalas de Spectrum.

#### Scenario: Radios por jerarquía

- **WHEN** se construye una superficie (tarjeta, panel, modal)
- **THEN** existe un token de radio adecuado a su jerarquía

#### Scenario: Sombra de modal

- **WHEN** se muestra un modal
- **THEN** está disponible un token de elevación para la sombra del modal

### Requirement: Tema raíz Spectrum

El sistema SHALL renderizar la aplicación dentro de un único `sp-theme` raíz con escala y color configurables, y SHALL aplicar el tema claro u oscuro modificando el atributo de color del `sp-theme` sin recargar la página.

#### Scenario: Tema por defecto

- **WHEN** la aplicación se carga sin preferencia explícita del usuario
- **THEN** el `sp-theme` raíz se aplica con el color claro (o el del sistema si prefiere oscuro)

#### Scenario: Cambio a tema oscuro

- **WHEN** el usuario activa el tema oscuro
- **THEN** el `sp-theme` raíz cambia a color oscuro y todos los componentes Spectrum reflejan el cambio

#### Scenario: Respetar preferencia del sistema

- **WHEN** el usuario no ha elegido tema y su sistema prefiere modo oscuro (`prefers-color-scheme: dark`)
- **THEN** se aplica el tema oscuro

### Requirement: Tokens propios como alias de Spectrum

El sistema SHALL exponer los tokens existentes `--finap-*` como alias de los tokens de Spectrum (`--spectrum-*`) para que los componentes de app sigan funcionando durante la migración, y SHALL añadir tokens semánticos propios (ingreso, gasto, deuda y gradiente de marca) sobre la paleta Spectrum.

#### Scenario: Alias disponible

- **WHEN** un componente consulta un token `--finap-*` existente
- **THEN** el token devuelve un valor derivado de un token `--spectrum-*`

#### Scenario: Tokens semánticos en ambos temas

- **WHEN** se activa el tema oscuro
- **THEN** los tokens semánticos (ingreso, gasto, deuda) tienen valores coherentes con el tema oscuro

### Requirement: Tipografía Spectrum

El sistema SHALL usar las fuentes del design system de Spectrum para cuerpo y títulos en toda la aplicación.

#### Scenario: Familias tipográficas

- **WHEN** se consultan los tokens de familia tipográfica
- **THEN** devuelven las familias de Spectrum (Adobe Clean o las definidas por el paquete de estilos de Spectrum)
