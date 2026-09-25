# Landing Page Specification

## Purpose

Define la landing page de Finap, la página de entrada a la SPA, que presenta el producto (hero, funciones, beneficios, llamada a la acción y footer) usando el design system de Spectrum, con imágenes de marca (naranjas, azules y rojas) y animaciones sutiles.

## Requirements

### Requirement: Header con logo, navegación y toggle

El sistema SHALL renderizar un header pegajoso en la landing con el logo de Finap (dos rombos), la navegación principal como botones de Spectrum (`sp-action-group` + `sp-action-button`), el selector de idioma (`sp-picker`) y el toggle de tema.

#### Scenario: Header visible

- **WHEN** se renderiza la landing
- **THEN** se muestra un header pegajoso con logo, navegación, selector de idioma y toggle de tema

### Requirement: Hero con imagen cálida de fondo

El sistema SHALL renderizar un hero sobre una imagen cálida (naranja) de fondo con un degradado de contraste, manteniendo el headline, el subtítulo y los dos botones de acción, sin usar el rombo decorativo.

#### Scenario: Hero visible

- **WHEN** se renderiza la landing
- **THEN** se muestra un hero con imagen naranja de fondo, headline, subtítulo y dos botones de acción

#### Scenario: Contraste del texto

- **WHEN** se renderiza el hero
- **THEN** el texto y los botones son legibles sobre la imagen gracias al degradado de contraste

#### Scenario: Sin rombo decorativo

- **WHEN** se renderiza el hero
- **THEN** no aparece el rombo (`.hero__mark`) que existía antes

### Requirement: Tarjetas de funcionalidades con imágenes cálidas

El sistema SHALL presentar las funcionalidades del producto en tarjetas (`sp-card`) con una imagen cálida de portada, un título y una breve descripción.

#### Scenario: Funcionalidades listadas

- **WHEN** se renderiza la sección de funciones
- **THEN** se muestran tarjetas con imagen, título y descripción para Dashboard, Movimientos, Presupuestos, Análisis, Deudas y Asistente IA

#### Scenario: Hover de tarjeta

- **WHEN** el usuario pasa el cursor sobre una tarjeta
- **THEN** la tarjeta pierde el borde, crece ligeramente y su imagen hace un leve zoom

### Requirement: Sección de beneficios con coachmarks

El sistema SHALL renderizar una sección con un título centrado de una oración, un texto complementario más pequeño y un botón de acción azul, seguida de una serie de coachmarks (`sp-coachmark`) con imágenes naranjas, azules y rojas que describen los beneficios de las finanzas personales.

#### Scenario: Beneficios listados

- **WHEN** se renderiza la sección de beneficios
- **THEN** se muestran un título centrado, un texto pequeño, un botón azul y seis coachmarks con imagen, título y descripción

#### Scenario: Origen del contenido

- **WHEN** se revisa el contenido de los beneficios
- **THEN** describe las bases de las finanzas personales (ingresos, gastos, ahorro, inversión, protección y presupuesto)

### Requirement: Llamada a la acción final

El sistema SHALL renderizar una sección final con una imagen azul de fondo, una oración de enganche grande y un botón de acción grande.

#### Scenario: CTA visible

- **WHEN** se renderiza la landing
- **THEN** se muestra una sección con imagen azul de fondo, oración de enganche y botón de acción grande

### Requirement: Footer clásico con contacto

El sistema SHALL renderizar un footer con el logo, las opciones del header (funciones, beneficios e inicio de sesión), el botón de inicio de sesión y los datos de contacto del autor.

#### Scenario: Footer visible

- **WHEN** se renderiza la landing page
- **THEN** se muestra un footer con menús, logo, inicio de sesión y datos de contacto (email, GitHub, LinkedIn y portafolio)

### Requirement: Consumo del design system

La landing page SHALL usar los componentes y primitivas de Spectrum (`sp-button`, `sp-card`, `sp-coachmark`, `sp-link`, tipografía y tokens `--spectrum-*` / `--mod-*`) en lugar de estilos propios duplicados.

#### Scenario: Uso de componentes base

- **WHEN** se renderiza la landing page
- **THEN** los elementos de interfaz están compuestos por componentes y primitivas del design system

### Requirement: Paleta de marca completa

La landing page SHALL mostrar las imágenes y acentos de la paleta de marca (naranja, azul y rojo) sin que dominen la composición.

#### Scenario: Los tres colores visibles

- **WHEN** se renderiza la landing page
- **THEN** aparecen imágenes naranjas, azules y rojas como acento de marca

### Requirement: Animaciones sutiles

El sistema SHALL aplicar animaciones de entrada y reveal on scroll reutilizando las primitivas de `motion`, y respetar `prefers-reduced-motion`.

#### Scenario: Reveal on scroll en las secciones

- **WHEN** una sección de la landing entra en el viewport
- **THEN** la sección se anima a su estado visible

#### Scenario: Respeto de prefers-reduced-motion

- **WHEN** el usuario tiene `prefers-reduced-motion: reduce` activado
- **THEN** las animaciones de la landing no se ejecutan

### Requirement: Diseño responsivo

La landing page SHALL adaptarse a los breakpoints del design system (móvil, tablet y escritorio).

#### Scenario: Adaptación a breakpoints

- **WHEN** la viewport cruza un breakpoint definido
- **THEN** el layout de la landing se reorganiza usando los tokens de breakpoint

### Requirement: Contenido internacionalizado

La landing page SHALL mostrar su contenido (header, hero, funciones, beneficios, CTA y footer) en el idioma activo (español o inglés) usando el sistema i18n.

#### Scenario: Contenido en español

- **WHEN** el idioma activo es español
- **THEN** el contenido de la landing se muestra en español

#### Scenario: Contenido en inglés

- **WHEN** el idioma activo es inglés
- **THEN** el contenido de la landing se muestra en inglés
