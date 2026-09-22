import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';

/**
 * Página "Movimientos" (placeholder).
 * La implementación completa corresponde al change `movements`.
 */
export class MovementsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <finap-container>
        <finap-heading level="1">Movimientos</finap-heading>
        <finap-text>
          Vista pendiente de implementación (change movements).
        </finap-text>
      </finap-container>
    `;
  }
}

customElements.define('movements-page', MovementsPage);

declare global {
  interface HTMLElementTagNameMap {
    'movements-page': MovementsPage;
  }
}
