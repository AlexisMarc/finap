import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import { logout } from '../../services/auth-service.js';
import { LocalizeController } from '../../i18n/localize.js';

export class FinapSettingsSession extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--finap-space-4);
      font-family: var(--finap-font-family);
      color: var(--finap-color-text);
    }
  `;

  private _logout(): void {
    void logout();
    navigate('landing');
  }

  private _localize = new LocalizeController(this);

  render() {
    return html`
      <div class="row">
        <span>${this._localize.t('settings.session')}</span>
        <sp-button variant="secondary" @click=${this._logout}>
          ${this._localize.t('userMenu.logout')}
        </sp-button>
      </div>
    `;
  }
}

customElements.define('finap-settings-session', FinapSettingsSession);

declare global {
  interface HTMLElementTagNameMap {
    'finap-settings-session': FinapSettingsSession;
  }
}
