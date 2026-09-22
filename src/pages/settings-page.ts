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
import { LocalizeController } from '../i18n/localize.js';

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

  private _localize = new LocalizeController(this);

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
    const t = (key: string) => this._localize.t(key);
    return html`
      <finap-container>
        <div class="content">
          <finap-heading level="1">${t('settings.title')}</finap-heading>

          <finap-card>
            <finap-heading level="3">${t('settings.profile')}</finap-heading>
            <finap-settings-profile
              .user=${this.user}
            ></finap-settings-profile>
          </finap-card>

          <finap-card>
            <finap-heading level="3">${t('settings.preferences')}</finap-heading>
            <finap-settings-preferences
              .locale=${this.locale}
              .currency=${this.currency}
            ></finap-settings-preferences>
          </finap-card>

          <finap-card>
            <finap-heading level="3">${t('settings.data')}</finap-heading>
            <div class="links">
              <finap-button @click=${() => navigate('categories')}>
                ${t('settings.categories')}
              </finap-button>
              <finap-button
                variant="secondary"
                @click=${() => navigate('budgets')}
              >
                ${t('settings.budgets')}
              </finap-button>
            </div>
          </finap-card>

          <finap-card>
            <finap-heading level="3">${t('settings.session')}</finap-heading>
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
