import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/card/index.js';
import '../components/button/index.js';
import '../components/settings-profile/index.js';
import '../components/settings-preferences/index.js';
import '../components/settings-session/index.js';

import {
  getUser,
  getCurrency,
  SESSION_CHANGED_EVENT,
  type SessionUser,
} from '../state/session.js';
import { getLocale, type Locale } from '../i18n/i18n.js';

export class SettingsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .content {
      display: grid;
      gap: var(--finap-space-5);
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-3);
      margin-top: var(--finap-space-2);
    }
  `;

  static properties = {
    user: { type: Object },
    locale: { type: String },
    currency: { type: String },
  };

  user: SessionUser | null = null;

  locale: Locale = 'es';

  currency = 'USD';

  connectedCallback(): void {
    super.connectedCallback();
    this._sync();
    window.addEventListener(SESSION_CHANGED_EVENT, this._onSessionChanged);
  }

  disconnectedCallback(): void {
    window.removeEventListener(SESSION_CHANGED_EVENT, this._onSessionChanged);
    super.disconnectedCallback();
  }

  private _onSessionChanged = (): void => {
    this._sync();
  };

  private _sync(): void {
    this.user = getUser();
    this.locale = getLocale();
    this.currency = getCurrency();
  }

  render() {
    return html`
      <finap-container>
        <div class="content">
          <finap-heading level="1">Ajustes</finap-heading>

          <finap-card>
            <finap-heading level="3">Perfil</finap-heading>
            <finap-settings-profile
              .user=${this.user}
            ></finap-settings-profile>
          </finap-card>

          <finap-card>
            <finap-heading level="3">Preferencias</finap-heading>
            <finap-settings-preferences
              .locale=${this.locale}
              .currency=${this.currency}
            ></finap-settings-preferences>
          </finap-card>

          <finap-card>
            <finap-heading level="3">Datos</finap-heading>
            <div class="links">
              <finap-button @click=${() => navigate('categories')}>
                Categorías
              </finap-button>
              <finap-button
                variant="secondary"
                @click=${() => navigate('budgets')}
              >
                Presupuestos
              </finap-button>
            </div>
          </finap-card>

          <finap-card>
            <finap-heading level="3">Sesión</finap-heading>
            <finap-settings-session></finap-settings-session>
          </finap-card>
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
