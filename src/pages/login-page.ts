import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../components/heading/index.js';
import '../components/text/index.js';
import '../components/brand-mark/index.js';
import '../components/login-form/index.js';
import { finapIcon } from '../components/icons.js';

import { login } from '../services/auth-service.js';
import { LocalizeController } from '../i18n/localize.js';
import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/link/sp-link.js';

interface LoginDetail {
  email: string;
  password: string;
}

const CONTACT_EMAIL = 'marcos.rincon1903@gmail.com';

export class LoginPage extends LitElement {
  static styles = css`
    :host,
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--finap-color-bg);
      color: var(--finap-color-text);
    }

    .login {
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      min-height: 100vh;
    }

    /* Botón volver, dentro del recuadro */
    .login__back {
      margin-bottom: var(--finap-space-3);
    }

    /* Lateral cálido: imagen naranja + marca + eslogan */
    .login__aside {
      position: relative;
      display: flex;
      align-items: flex-end;
      min-height: 240px;
      padding: var(--finap-space-6) var(--finap-space-5);
      background-image:
        linear-gradient(
          160deg,
          rgba(24, 5, 0, 0.5) 0%,
          rgba(24, 5, 0, 0.82) 100%
        ),
        url('/image/hassaan-here-Gz_74MbJ4V8-unsplash.webp');
      background-size: cover;
      background-position: center;
      color: #fff;
      --finap-color-text: #fff;
      --finap-color-text-muted: rgba(255, 255, 255, 0.82);
    }

    .login__brand {
      display: grid;
      justify-items: start;
      gap: var(--finap-space-3);
      max-width: 28rem;
    }

    .login__logo {
      display: inline-flex;
      padding: var(--finap-space-2) var(--finap-space-3);
      background-color: #fff;
      border-radius: var(--finap-radius-lg);
      box-shadow: var(--finap-shadow-sm);
    }

    .login__name {
      margin: 0;
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-2xl);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .login__slogan {
      margin: 0;
      font-size: var(--finap-font-size-lg);
      color: rgba(255, 255, 255, 0.9);
    }

    /* Panel derecho con el recuadro de inicio de sesión */
    .login__main {
      display: grid;
      place-items: center;
      padding: var(--finap-space-7) var(--finap-space-5);
    }

    .login__panel {
      display: grid;
      gap: var(--finap-space-5);
      width: min(420px, 100%);
    }

    .login__card {
      padding: var(--finap-space-6);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-xl);
      box-shadow: var(--finap-shadow-md);
      --finap-font-size-3xl: var(--finap-font-size-xl);
    }

    /* Aviso de creación de cuenta como barra de acción de Spectrum */
    .login__signup {
      --mod-actionbar-height: auto;
      --mod-actionbar-spacing-outer-edge: 0;
    }

    .login__signup-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--finap-space-2);
      padding: var(--finap-space-3) var(--finap-space-4);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      line-height: var(--finap-line-height-normal);
      color: #fff;
    }

    @media (min-width: 900px) {
      .login {
        grid-template-columns: 1.05fr minmax(420px, 0.95fr);
      }

      .login__aside {
        align-items: center;
        min-height: 100vh;
        padding: var(--finap-space-8);
      }

      .login__main {
        padding: var(--finap-space-8) var(--finap-space-6);
      }
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
  };

  loading = false;

  error = '';

  private _localize = new LocalizeController(this);

  private _goBack(event: Event): void {
    event.preventDefault();
    navigate('landing');
  }

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
    const t = (key: string) => this._localize.t(key);
    return html`
      <div class="login">
        <aside class="login__aside">
          <div class="login__brand">
            <span class="login__logo">
              <finap-brand-mark></finap-brand-mark>
            </span>
            <p class="login__name">${t('app.name')}</p>
            <p class="login__slogan">${t('login.slogan')}</p>
          </div>
        </aside>

        <main class="login__main">
          <div class="login__panel">
            <div class="login__card">
              <sp-action-button
                class="login__back"
                quiet
                @click=${this._goBack}
              >
                ${finapIcon('arrow-left', 16, 'icon')} ${t('login.back')}
              </sp-action-button>
              <finap-heading level="1">${t('login.title')}</finap-heading>
              <finap-text variant="muted">${t('login.subtitle')}</finap-text>
              <finap-login-form
                ?loading=${this.loading}
                error=${this.error}
                @finap-login=${this._onLogin}
              ></finap-login-form>
            </div>

            <sp-action-bar
              class="login__signup"
              role="region"
              aria-label=${t('login.signup.title')}
              emphasized
              open
            >
              <div slot="override" class="login__signup-content">
                <span>${t('login.signup.text')}</span>
                <sp-link
                  static-color="white"
                  href=${`mailto:${CONTACT_EMAIL}`}
                >
                  ${CONTACT_EMAIL}
                </sp-link>
              </div>
            </sp-action-bar>
          </div>
        </main>
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
