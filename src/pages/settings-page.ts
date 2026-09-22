import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';
import '../components/button/index.js';

/**
 * Página "Ajustes" (placeholder).
 * La implementación completa corresponde al change `settings`.
 */
export class SettingsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-3);
      margin-top: var(--finap-space-4);
    }
  `;

  render() {
    return html`
      <finap-container>
        <finap-heading level="1">Ajustes</finap-heading>
        <finap-text>
          Vista pendiente de implementación (change settings).
        </finap-text>
        <div class="links">
          <finap-button @click=${() => navigate('categories')}>
            Categorías
          </finap-button>
          <finap-button variant="secondary" @click=${() => navigate('budgets')}>
            Presupuestos
          </finap-button>
        </div>
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
