import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';

/**
 * Página "Ajustes" (placeholder).
 * La implementación completa corresponde al change `settings`.
 */
export class SettingsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <finap-container>
        <finap-heading level="1">Ajustes</finap-heading>
        <finap-text>
          Vista pendiente de implementación (change settings).
        </finap-text>
      </finap-container>
    `;
  }
}

customElements.define('settings-page', SettingsPage);

declare global {
  interface HTMLElementTagNameMap {
    'settings-page': SettingsPage;
  }
}
