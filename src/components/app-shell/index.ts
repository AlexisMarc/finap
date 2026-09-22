import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../icon/index.js';
import '../avatar/index.js';
import '../user-menu/index.js';
import '../button/index.js';
import '../input/index.js';

import {
  getSession,
  clearSession,
  SESSION_CHANGED_EVENT,
  type SessionUser,
} from '../../state/session.js';

export interface ShellSection {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const SECTIONS: ShellSection[] = [
  { id: 'dashboard', label: 'Inicio', icon: 'home', path: '/dashboard' },
  { id: 'analysis', label: 'Análisis', icon: 'chart', path: '/analysis' },
  { id: 'debts', label: 'Deudas', icon: 'credit-card', path: '/debts' },
  { id: 'movements', label: 'Movimientos', icon: 'list', path: '/movements' },
  { id: 'settings', label: 'Ajustes', icon: 'settings', path: '/settings' },
];

const APP_PAGES = new Set(SECTIONS.map((section) => section.id));

export class FinapAppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: var(--finap-color-text);
      background-color: var(--finap-color-bg);
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr;
      min-height: 100vh;
    }

    .sidebar {
      display: none;
      padding: var(--finap-space-5);
      border-right: 1px solid var(--finap-color-border);
      background-color: var(--finap-color-bg-subtle);
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-2);
      margin-bottom: var(--finap-space-6);
      font-family: var(--finap-font-family-display);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .nav {
      display: grid;
      gap: var(--finap-space-1);
    }

    .nav a {
      display: flex;
      align-items: center;
      gap: var(--finap-space-3);
      padding: var(--finap-space-2) var(--finap-space-3);
      border-radius: var(--finap-radius-sm);
      color: var(--finap-color-text-muted);
      text-decoration: none;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
    }

    .nav a:hover {
      background-color: var(--finap-color-bg);
      color: var(--finap-color-text);
    }

    .nav a[aria-current='page'] {
      background-color: var(--finap-color-surface);
      color: var(--finap-color-text);
      font-weight: var(--finap-font-weight-semibold);
    }

    .main-col {
      display: grid;
      grid-template-rows: auto 1fr;
      min-width: 0;
    }

    .topbar {
      display: flex;
      align-items: center;
      gap: var(--finap-space-4);
      padding: var(--finap-space-4) var(--finap-space-5);
      border-bottom: 1px solid var(--finap-color-border);
    }

    .greeting {
      display: grid;
      gap: 2px;
      margin-right: auto;
    }

    .greeting__hello {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .greeting__name {
      font-family: var(--finap-font-family-display);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .search {
      flex: 1;
      max-width: 320px;
    }

    .content {
      padding: var(--finap-space-5);
      padding-bottom: 88px;
      min-width: 0;
    }

    .bottom-nav {
      position: fixed;
      inset: auto 0 0 0;
      display: flex;
      justify-content: space-around;
      padding: var(--finap-space-2);
      background-color: var(--finap-color-surface);
      border-top: 1px solid var(--finap-color-border);
      z-index: 50;
    }

    .bottom-nav a {
      display: grid;
      justify-items: center;
      gap: 2px;
      padding: var(--finap-space-1);
      color: var(--finap-color-text-muted);
      text-decoration: none;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-xs);
    }

    .bottom-nav a[aria-current='page'] {
      color: var(--finap-color-primary);
    }

    @media (min-width: 1024px) {
      .layout {
        grid-template-columns: 240px 1fr;
      }

      .sidebar {
        display: block;
      }

      .bottom-nav {
        display: none;
      }

      .content {
        padding-bottom: var(--finap-space-5);
      }
    }
  `;

  static properties = {
    currentPage: { type: String },
    user: { type: Object },
  };

  currentPage = '';

  user: SessionUser | null = null;

  private _observer?: MutationObserver;

  private _onSessionChanged = () => {
    this.user = getSession()?.user ?? null;
  };

  private _onLogout = () => {
    clearSession();
    navigate('landing');
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.user = getSession()?.user ?? null;
    document.documentElement.addEventListener(
      SESSION_CHANGED_EVENT,
      this._onSessionChanged,
    );
    this.addEventListener('finap-logout', this._onLogout);

    const app = this.querySelector('#app');
    if (app) {
      this._syncPage(app);
      this._observer = new MutationObserver(() => this._syncPage(app));
      this._observer.observe(app, { childList: true });
    }
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    document.documentElement.removeEventListener(
      SESSION_CHANGED_EVENT,
      this._onSessionChanged,
    );
    this.removeEventListener('finap-logout', this._onLogout);
    super.disconnectedCallback();
  }

  private _syncPage(app: Element): void {
    this.currentPage = app.firstElementChild?.tagName.toLowerCase() ?? '';
  }

  get currentSection(): string {
    return this.currentPage.replace(/-page$/, '');
  }

  private get _isApp(): boolean {
    return APP_PAGES.has(this.currentSection);
  }

  private _go(id: string) {
    return (event: Event) => {
      event.preventDefault();
      navigate(id);
    };
  }

  private _onAdd(): void {
    this.dispatchEvent(
      new CustomEvent('finap-add', { bubbles: true, composed: true }),
    );
  }

  render() {
    if (!this._isApp) {
      return html`<slot></slot>`;
    }

    const section = this.currentSection;
    const hello = this.user ? `Hola, ${this.user.name}` : 'Hola';

    return html`
      <div class="layout">
        <aside class="sidebar">
          <span class="brand">Finap</span>
          <nav class="nav" aria-label="Principal">
            ${SECTIONS.map(
              (item) => html`
                <a
                  href="#${item.path}"
                  aria-current=${section === item.id ? 'page' : 'false'}
                  @click=${this._go(item.id)}
                >
                  <finap-icon name=${item.icon} size="20"></finap-icon>
                  ${item.label}
                </a>
              `,
            )}
          </nav>
        </aside>

        <div class="main-col">
          <header class="topbar">
            <span class="greeting">
              <span class="greeting__hello">Buenos días</span>
              <span class="greeting__name">${hello} 👋</span>
            </span>
            <finap-input
              class="search"
              type="text"
              placeholder="Buscar..."
            ></finap-input>
            <finap-button @click=${this._onAdd}>Agregar</finap-button>
            <finap-user-menu
              name=${this.user?.name ?? ''}
              email=${this.user?.email ?? ''}
              avatarUrl=${this.user?.avatarUrl ?? ''}
            ></finap-user-menu>
          </header>
          <main class="content"><slot></slot></main>
        </div>
      </div>

      <nav class="bottom-nav" aria-label="Principal">
        ${SECTIONS.map(
          (item) => html`
            <a
              href="#${item.path}"
              aria-current=${section === item.id ? 'page' : 'false'}
              @click=${this._go(item.id)}
            >
              <finap-icon name=${item.icon} size="20"></finap-icon>
              ${item.label}
            </a>
          `,
        )}
      </nav>
    `;
  }
}

customElements.define('finap-app-shell', FinapAppShell);

declare global {
  interface HTMLElementTagNameMap {
    'finap-app-shell': FinapAppShell;
  }
}
