import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../button/index.js';
import { logout } from '../../services/auth-service.js';

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

  render() {
    return html`
      <div class="row">
        <span>Sesión</span>
        <finap-button variant="secondary" @click=${this._logout}>
          Cerrar sesión
        </finap-button>
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
