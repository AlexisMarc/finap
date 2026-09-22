import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../components/card/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';
import '../components/login-form/index.js';

import { login } from '../services/auth-service.js';
import { LocalizeController } from '../i18n/localize.js';

interface LoginDetail {
  email: string;
  password: string;
}

export class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .wrapper {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: var(--finap-space-5);
    }

    .panel {
      width: min(420px, 100%);
      display: grid;
      gap: var(--finap-space-4);
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
  };

  loading = false;

  error = '';

  private _localize = new LocalizeController(this);

  private async _onLogin(event: Event): Promise<void> {
    const { email, password } = (event as CustomEvent<LoginDetail>).detail;
    this.loading = true;
    this.error = '';
    try {
      await login(email, password);
      navigate('dashboard');
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : this._localize.t('login.error.generic');
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="panel">
          <finap-heading level="1">${this._localize.t('app.name')}</finap-heading>
          <finap-text>${this._localize.t('login.subtitle')}</finap-text>
          <finap-card>
            <finap-login-form
              ?loading=${this.loading}
              error=${this.error}
              @finap-login=${this._onLogin}
            ></finap-login-form>
          </finap-card>
        </div>
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
