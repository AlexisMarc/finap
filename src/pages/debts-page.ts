import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';

/**
 * Página "Deudas" (placeholder).
 * La implementación completa corresponde al change `debts`.
 */
export class DebtsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <finap-container>
        <finap-heading level="1">Deudas</finap-heading>
        <finap-text>
          Vista pendiente de implementación (change debts).
        </finap-text>
      </finap-container>
    `;
  }
}

customElements.define('debts-page', DebtsPage);

declare global {
  interface HTMLElementTagNameMap {
    'debts-page': DebtsPage;
  }
}
