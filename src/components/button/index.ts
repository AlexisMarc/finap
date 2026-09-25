import { LitElement, html } from 'lit';

import '@spectrum-web-components/button/sp-button.js';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export class FinapButton extends LitElement {
  static properties = {
    variant: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  variant: ButtonVariant = 'primary';

  disabled = false;

  private get _spectrumVariant(): 'accent' | 'secondary' {
    return this.variant === 'primary' ? 'accent' : 'secondary';
  }

  render() {
    return html`
      <sp-button
        variant=${this._spectrumVariant}
        treatment=${this.variant === 'text' ? 'outline' : 'fill'}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </sp-button>
    `;
  }
}

customElements.define('finap-button', FinapButton);

declare global {
  interface HTMLElementTagNameMap {
    'finap-button': FinapButton;
  }
}
