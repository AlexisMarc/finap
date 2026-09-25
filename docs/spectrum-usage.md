# Uso de Spectrum Web Components

Reglas para usar componentes de Adobe Spectrum Web Components (SWC) en Finap sin
distorsionarlos. Referencia: <https://opensource.adobe.com/spectrum-web-components/storybook/index.html>.

## Reglas

1. **Usar la API documentada**: variantes, atributos y eventos oficiales del
   componente (revisar el Storybook antes de usarlo).
2. **Slots correctos**:
   - Iconos en `slot="icon"` (`sp-sidenav-item`, `sp-action-button`, `sp-tag`, …).
   - Contenido de texto en el slot por defecto.
   - Título/contenido de diálogos y cards en sus slots (`heading`, `button`, …).
3. **Grupos de opciones**: usar `sp-action-group` + `sp-action-button` con
   `selected` (o `sp-tabs` si es navegación de contenido). Nunca `sp-tag` como
   toggle.
4. **Botones de solo icono**: incluir `label` para el nombre accesible y el
   icono en `slot="icon"`.
5. **Personalización**: usar las variantes oficiales y, si hace falta ajustar,
   la capa de personalización documentada (`--mod-<componente>-<propiedad>`).
   **No** redefinir variables internas (`--spectrum-<componente>-*`) en los
   componentes de la app.
6. **Estados**: `sp-badge`/`sp-status-light` para estado, `sp-meter`/
   `sp-progress-bar` para progreso, `sp-illustrated-message` para vacíos.

## Ejemplos

```html
<!-- Sidebar -->
<sp-sidenav-item ?selected=${active}>
  <sp-icon slot="icon">…</sp-icon>
  Movimientos
</sp-sidenav-item>

<!-- Grupo de filtros -->
<sp-action-group @change=${onChange}>
  <sp-action-button value=${id} ?selected=${current === id}>Todos</sp-action-button>
</sp-action-group>

<!-- Botón de solo icono -->
<sp-action-button label="Cambiar tema">
  <sp-icon slot="icon">…</sp-icon>
</sp-action-button>
```
