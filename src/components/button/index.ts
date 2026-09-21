import { LitElement, html } from 'lit';

import { styles } from './styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export class FinapButton extends LitElement {
  static styles = styles;

  static properties = {
    variant: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  variant: ButtonVariant = 'primary';

  disabled = false;

  render() {
    return html`
      <button class=${this.variant} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('finap-button', FinapButton);

declare global {
  interface HTMLElementTagNameMap {
    'finap-button': FinapButton;
  }
}
