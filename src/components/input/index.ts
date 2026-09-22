import { LitElement, html, css, nothing } from 'lit';

export type InputType = 'text' | 'number' | 'date' | 'email' | 'password' | 'textarea';

export class FinapInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .field {
      display: grid;
      gap: var(--finap-space-1);
    }

    label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    input,
    textarea {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-md);
      color: var(--finap-color-text);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-sm);
      padding: var(--finap-space-2) var(--finap-space-3);
    }

    input:focus-visible,
    textarea:focus-visible {
      outline: 2px solid var(--finap-color-secondary);
      outline-offset: 1px;
    }

    .error {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-expense);
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

  private _onInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('finap-input', {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const field =
      this.type === 'textarea'
        ? html`<textarea
            .value=${this.value}
            placeholder=${this.placeholder}
            @input=${this._onInput}
          ></textarea>`
        : html`<input
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            @input=${this._onInput}
          />`;

    return html`
      <div class="field">
        ${this.label
          ? html`<label for="input">${this.label}</label>`
          : nothing}
        ${field}
        ${this.error ? html`<span class="error">${this.error}</span>` : nothing}
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
