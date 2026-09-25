import { LitElement, html, nothing, css } from 'lit';

import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

export interface SelectOption {
  value: string;
  label: string;
}

export class FinapSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .field {
      display: grid;
      gap: var(--finap-space-1);
    }

    .finap-label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    sp-picker {
      width: 100%;
    }
  `;

  static properties = {
    label: { type: String },
    value: { type: String },
    error: { type: String },
    options: { type: Array },
  };

  label = '';

  value = '';

  error = '';

  options: SelectOption[] = [];

  private _onChange(event: Event): void {
    this.value = (event.target as { value?: string }).value ?? '';
    this.dispatchEvent(
      new CustomEvent('finap-change', {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="field">
        ${this.label
          ? html`<label class="finap-label">${this.label}</label>`
          : nothing}
        <sp-picker .value=${this.value} @change=${this._onChange}>
          ${this.options.map(
            (option) =>
              html`<sp-menu-item value=${option.value}
                >${option.label}</sp-menu-item
              >`,
          )}
        </sp-picker>
        ${this.error
          ? html`<sp-help-text class="error" variant="negative"
              >${this.error}</sp-help-text
            >`
          : nothing}
      </div>
    `;
  }
}

customElements.define('finap-select', FinapSelect);

declare global {
  interface HTMLElementTagNameMap {
    'finap-select': FinapSelect;
  }
}
