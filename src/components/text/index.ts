import { LitElement, html } from 'lit';

import { styles } from './styles.js';

export type TextVariant = 'body' | 'muted' | 'small' | 'large';

export class FinapText extends LitElement {
  static styles = styles;

  static properties = {
    variant: { type: String },
  };

  variant: TextVariant = 'body';

  render() {
    return html`<p class=${this.variant}><slot></slot></p>`;
  }
}

customElements.define('finap-text', FinapText);

declare global {
  interface HTMLElementTagNameMap {
    'finap-text': FinapText;
  }
}
