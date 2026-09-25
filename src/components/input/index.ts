import { LitElement, html, nothing, css } from 'lit';

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/number-field/sp-number-field.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

export type InputType =
  | 'text'
  | 'number'
  | 'date'
  | 'email'
  | 'password'
  | 'textarea';

export class FinapInput extends LitElement {
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

    sp-textfield,
    sp-number-field {
      width: 100%;
    }

    .native-input {
      box-sizing: border-box;
      width: 100%;
      min-height: var(--spectrum-component-height-100, 32px);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-md);
      color: var(--finap-color-text);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--spectrum-gray-400);
      border-radius: var(--finap-radius-sm);
      padding: var(--finap-space-2) var(--finap-space-3);
    }

    .native-input:hover {
      border-color: var(--spectrum-gray-500);
    }

    .native-input:focus-visible {
      border-color: var(--finap-color-accent-interactive);
      outline: 2px solid var(--finap-color-accent-interactive);
      outline-offset: 1px;
    }
  `;

  static properties = {
    label: { type: String },
    type: { type: String },
    value: { type: String },
    placeholder: { type: String },
    error: { type: String },
  };

  label = '';

  type: InputType = 'text';

  value = '';

  placeholder = '';

  error = '';

  private _onInput(event: Event): void {
    const value = (event.target as { value?: string }).value ?? '';
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('finap-input', {
        detail: value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _control() {
    switch (this.type) {
      case 'number':
        return html`<sp-number-field
          .value=${this.value}
          ?invalid=${!!this.error}
          @input=${this._onInput}
        ></sp-number-field>`;
      case 'textarea':
        return html`<textarea
          class="native-input"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._onInput}
        ></textarea>`;
      case 'date':
        return html`<input
          class="native-input"
          type="date"
          .value=${this.value}
          @input=${this._onInput}
        />`;
      default:
        return html`<sp-textfield
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?invalid=${!!this.error}
          @input=${this._onInput}
        ></sp-textfield>`;
    }
  }

  render() {
    return html`
      <div class="field">
        ${this.label
          ? html`<label class="finap-label">${this.label}</label>`
          : nothing}
        ${this._control()}
        ${this.error
          ? html`<sp-help-text class="error" variant="negative"
              >${this.error}</sp-help-text
            >`
          : nothing}
      </div>
    `;
  }
}

customElements.define('finap-input', FinapInput);

declare global {
  interface HTMLElementTagNameMap {
    'finap-input': FinapInput;
  }
}
