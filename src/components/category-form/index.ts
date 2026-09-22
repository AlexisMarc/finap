import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../select/index.js';
import '../button/index.js';
import type { Category } from '../../services/types.js';

const COLORS = [
  '#EB001B',
  '#FF5F00',
  '#F79E1B',
  '#2FC78A',
  '#7C4DFF',
  '#9B9BA8',
];

const ICONS = [
  'home',
  'settings',
  'chart',
  'wallet',
  'credit-card',
  'list',
  'arrow-right',
  'check',
];

interface FormErrors {
  name?: string;
}

export class FinapCategoryForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: grid;
      gap: var(--finap-space-4);
    }

    .label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .swatches {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-2);
      margin-top: var(--finap-space-1);
    }

    .swatch {
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-full);
      background-color: var(--c);
      cursor: pointer;
    }

    .swatch[data-selected] {
      outline: 2px solid var(--finap-color-text);
      outline-offset: 2px;
    }

    .error {
      margin: 0;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-expense);
    }

    .error[hidden] {
      display: none;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--finap-space-3);
    }
  `;

  static properties = {
    category: { type: Object },
    saving: { type: Boolean },
    error: { type: String },
    errors: { type: Object },
    name: { type: String },
    color: { type: String },
    icon: { type: String },
  };

  category: Category | null = null;

  saving = false;

  error = '';

  errors: FormErrors = {};

  name = '';

  color = COLORS[0];

  icon = ICONS[0];

  private get _colors(): string[] {
    return COLORS;
  }

  private get _iconOptions() {
    return ICONS.map((icon) => ({ value: icon, label: icon }));
  }

  willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('category') && this.category) {
      this.name = this.category.name;
      this.color = this.category.color;
      this.icon = this.category.icon;
    }
  }

  private _onName(event: Event): void {
    this.name = (event as CustomEvent<string>).detail;
  }

  private _onIcon(event: Event): void {
    this.icon = (event as CustomEvent<string>).detail;
  }

  private _cancel(): void {
    this.dispatchEvent(
      new CustomEvent('finap-cancel', { bubbles: true, composed: true }),
    );
  }

  private _submit(): void {
    if (!this.name.trim()) {
      this.errors = { name: 'El nombre es obligatorio' };
      return;
    }
    this.errors = {};
    this.dispatchEvent(
      new CustomEvent('finap-save', {
        detail: { name: this.name.trim(), color: this.color, icon: this.icon },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="form">
        <finap-input
          label="Nombre"
          type="text"
          .value=${this.name}
          error=${this.errors.name ?? ''}
          @finap-input=${this._onName}
        ></finap-input>
        <div class="field">
          <span class="label">Color</span>
          <div class="swatches">
            ${this._colors.map(
              (color) => html`
                <button
                  class="swatch"
                  type="button"
                  style="--c: ${color}"
                  aria-label=${color}
                  ?data-selected=${this.color === color}
                  @click=${() => (this.color = color)}
                ></button>
              `,
            )}
          </div>
        </div>
        <finap-select
          label="Icono"
          .value=${this.icon}
          .options=${this._iconOptions}
          @finap-change=${this._onIcon}
        ></finap-select>
        <p class="error" ?hidden=${!this.error}>${this.error}</p>
        <div class="actions">
          <finap-button variant="secondary" @click=${this._cancel}>
            Cancelar
          </finap-button>
          <finap-button ?disabled=${this.saving} @click=${this._submit}>
            ${this.saving ? 'Guardando…' : 'Guardar'}
          </finap-button>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-category-form', FinapCategoryForm);

declare global {
  interface HTMLElementTagNameMap {
    'finap-category-form': FinapCategoryForm;
  }
}
