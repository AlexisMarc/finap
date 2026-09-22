import { LitElement, html, css, nothing } from 'lit';

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

    label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    select {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-md);
      color: var(--finap-color-text);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-sm);
      padding: var(--finap-space-2) var(--finap-space-3);
    }

    select:focus-visible {
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
    value: { type: String },
    error: { type: String },
    options: { type: Array },
  };

  label = '';

  value = '';

  error = '';

  options: SelectOption[] = [];

  private _onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
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
        ${this.label ? html`<label for="select">${this.label}</label>` : nothing}
        <select id="select" .value=${this.value} @change=${this._onChange}>
          ${this.options.map(
            (option) =>
              html`<option value=${option.value}>${option.label}</option>`,
          )}
        </select>
        ${this.error ? html`<span class="error">${this.error}</span>` : nothing}
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
