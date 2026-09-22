import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../button/index.js';

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
      this.emailError = 'El email es obligatorio';
    } else if (!EMAIL_RE.test(email)) {
      this.emailError = 'Introduce un email válido';
    }
    if (!this._password) {
      this.passwordError = 'La contraseña es obligatoria';
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
    return html`
      <form class="form" @submit=${(e: Event) => e.preventDefault()} @keydown=${this._onKeydown}>
        <finap-input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          error=${this.emailError}
          @finap-input=${this._onEmail}
        ></finap-input>
        <finap-input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          error=${this.passwordError}
          @finap-input=${this._onPassword}
        ></finap-input>
        <p class="error" ?hidden=${!this.error}>${this.error}</p>
        <finap-button @click=${this._submit}>
          ${this.loading ? 'Entrando…' : 'Entrar'}
        </finap-button>
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
