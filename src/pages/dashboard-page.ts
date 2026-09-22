import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';

/**
 * Página "Inicio" (placeholder).
 * La implementación completa corresponde al change `dashboard`.
 */
export class DashboardPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <finap-container>
        <finap-heading level="1">Inicio</finap-heading>
        <finap-text>
          Vista pendiente de implementación (change dashboard).
        </finap-text>
      </finap-container>
    `;
  }
}

customElements.define('dashboard-page', DashboardPage);

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-page': DashboardPage;
  }
}
