import { LitElement, html, css } from 'lit';

import '../input/index.js';
import { LocalizeController } from '../../i18n/localize.js';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export class FinapLoginForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: grid;
      gap: var(--finap-space-4);
    }

    .error {
      margin: 0;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-expense);
    }

    .error[hidden] {
      display: none;
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    emailError: { type: String },
    passwordError: { type: String },
  };

  loading = false;

  error = '';

  emailError = '';

  passwordError = '';

  private _localize = new LocalizeController(this);

  private _email = '';

  private _password = '';

  private _onEmail(event: CustomEvent<string>): void {
    this._email = event.detail;
  }

  private _onPassword(event: CustomEvent<string>): void {
    this._password = event.detail;
  }

  private _onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this._submit();
    }
  }

  private _submit(): void {
    if (this.loading) return;
    this.emailError = '';
    this.passwordError = '';

    const email = this._email.trim();
    if (!email) {
      this.emailError = this._localize.t('login.error.emailRequired');
    } else if (!EMAIL_RE.test(email)) {
      this.emailError = this._localize.t('login.error.emailInvalid');
    }
    if (!this._password) {
      this.passwordError = this._localize.t('login.error.passwordRequired');
    }

    if (this.emailError || this.passwordError) return;

    this.dispatchEvent(
      new CustomEvent('finap-login', {
        detail: { email, password: this._password },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return html`
      <form class="form" @submit=${(e: Event) => e.preventDefault()} @keydown=${this._onKeydown}>
        <finap-input
          label=${t('login.email')}
          type="email"
          placeholder="tu@email.com"
          error=${this.emailError}
          @finap-input=${this._onEmail}
        ></finap-input>
        <finap-input
          label=${t('login.password')}
          type="password"
          placeholder="••••••••"
          error=${this.passwordError}
          @finap-input=${this._onPassword}
        ></finap-input>
        <p class="error" ?hidden=${!this.error}>${this.error}</p>
        <sp-button variant="accent" @click=${this._submit}>
          ${this.loading ? t('login.submitting') : t('login.submit')}
        </sp-button>
      </form>
    `;
  }
}

customElements.define('finap-login-form', FinapLoginForm);

declare global {
  interface HTMLElementTagNameMap {
    'finap-login-form': FinapLoginForm;
  }
}
