import { LitElement, html, css } from 'lit';

import '../avatar/index.js';
import { LocalizeController } from '../../i18n/localize.js';

export class FinapUserMenu extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-2);
      padding: var(--finap-space-1) var(--finap-space-2);
      background-color: transparent;
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-full);
      color: var(--finap-color-text);
      font-family: var(--finap-font-family);
      cursor: pointer;
    }

    .info {
      display: grid;
      text-align: left;
      line-height: 1.2;
    }

    .name {
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
    }

    .email {
      font-size: var(--finap-font-size-xs);
      color: var(--finap-color-text-muted);
    }

    .menu {
      position: absolute;
      right: 0;
      margin-top: var(--finap-space-2);
      min-width: 180px;
      padding: var(--finap-space-1);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-md);
      box-shadow: var(--finap-shadow-md);
      z-index: 100;
    }

    .menu[hidden] {
      display: none;
    }

    .menu button {
      width: 100%;
      text-align: left;
      padding: var(--finap-space-2) var(--finap-space-3);
      background-color: transparent;
      border: none;
      border-radius: var(--finap-radius-sm);
      color: var(--finap-color-text);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      cursor: pointer;
    }

    .menu button:hover {
      background-color: var(--finap-color-bg-subtle);
    }

    @media (max-width: 640px) {
      .info {
        display: none;
      }
    }
  `;

  static properties = {
    name: { type: String },
    email: { type: String },
    avatarUrl: { type: String },
    open: { type: Boolean },
  };

  name = '';

  email = '';

  avatarUrl = '';

  open = false;

  private _localize = new LocalizeController(this);

  private _toggle(): void {
    this.open = !this.open;
  }

  private _logout(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('finap-logout', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <button
        class="trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open}
        @click=${this._toggle}
      >
        <finap-avatar name=${this.name} src=${this.avatarUrl}></finap-avatar>
        <span class="info">
          <span class="name">${this.name}</span>
          <span class="email">${this.email}</span>
        </span>
      </button>
      <div class="menu" role="menu" ?hidden=${!this.open}>
        <button type="button" role="menuitem" @click=${this._logout}>
          ${this._localize.t('userMenu.logout')}
        </button>
      </div>
    `;
  }
}

customElements.define('finap-user-menu', FinapUserMenu);

declare global {
  interface HTMLElementTagNameMap {
    'finap-user-menu': FinapUserMenu;
  }
}
