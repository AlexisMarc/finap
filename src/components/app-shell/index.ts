import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../icon/index.js';
import '../avatar/index.js';
import '../user-menu/index.js';
import '../button/index.js';
import '../input/index.js';
import '../modal/index.js';
import '../transaction-form/index.js';

import {
  getSession,
  SESSION_CHANGED_EVENT,
  type SessionUser,
} from '../../state/session.js';
import { logout } from '../../services/auth-service.js';
import { list as listCategories } from '../../services/categories-service.js';
import {
  create,
  type TransactionInput,
} from '../../services/transactions-service.js';
import { notifyTransactionsChanged } from '../../state/transactions.js';
import { LocalizeController } from '../../i18n/localize.js';
import type { Category } from '../../services/types.js';
import type { TransactionFormValue } from '../transaction-form/index.js';

export interface ShellSection {
  id: string;
  labelKey: string;
  icon: string;
  path: string;
}

const SECTIONS: ShellSection[] = [
  { id: 'dashboard', labelKey: 'shell.nav.home', icon: 'home', path: '/dashboard' },
  {
    id: 'analysis',
    labelKey: 'shell.nav.analysis',
    icon: 'chart',
    path: '/analysis',
  },
  { id: 'debts', labelKey: 'shell.nav.debts', icon: 'credit-card', path: '/debts' },
  {
    id: 'movements',
    labelKey: 'shell.nav.movements',
    icon: 'list',
    path: '/movements',
  },
  {
    id: 'settings',
    labelKey: 'shell.nav.settings',
    icon: 'settings',
    path: '/settings',
  },
];

const APP_PAGES = new Set([
  ...SECTIONS.map((section) => section.id),
  'categories',
  'budgets',
]);

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
    addOpen: { type: Boolean },
    addSaving: { type: Boolean },
    addError: { type: String },
    addCategories: { type: Array },
  };

  currentPage = '';

  user: SessionUser | null = null;

  addOpen = false;

  addSaving = false;

  addError = '';

  addCategories: Category[] = [];

  private _localize = new LocalizeController(this);

  private _observer?: MutationObserver;

  private _onSessionChanged = () => {
    this.user = getSession()?.user ?? null;
  };

  private _onLogout = () => {
    void logout();
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
      this._observer.observe(app, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['state'],
      });
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
    // Open Cells deja varias páginas montadas en #app y marca la visible con
    // state="active". Hay que detectar esa, no la primera.
    const active =
      app.querySelector(':scope > [state="active"]') ?? app.lastElementChild;
    this.currentPage = active?.tagName.toLowerCase() ?? '';
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
    this.addOpen = true;
    this.addError = '';
    void this._loadAddCategories();
  }

  private async _loadAddCategories(): Promise<void> {
    try {
      this.addCategories = await listCategories();
    } catch {
      this.addCategories = [];
    }
  }

  private _closeAdd = (): void => {
    this.addOpen = false;
  };

  private async _onAddSave(event: Event): Promise<void> {
    const value = (event as CustomEvent<TransactionFormValue>).detail;
    this.addSaving = true;
    this.addError = '';
    try {
      await create(value as TransactionInput);
      notifyTransactionsChanged();
      this.addOpen = false;
    } catch (error) {
      this.addError =
        error instanceof Error ? error.message : 'No se pudo guardar';
    } finally {
      this.addSaving = false;
    }
  }

  render() {
    if (!this._isApp) {
      return html`<slot></slot>`;
    }

    const section = this.currentSection;
    const t = (key: string) => this._localize.t(key);
    const hello = this.user
      ? `${t('shell.greeting')}, ${this.user.name}`
      : t('shell.greeting');

    return html`
      <div class="layout">
        <aside class="sidebar">
          <span class="brand">Finap</span>
          <nav class="nav" aria-label=${t('shell.primaryNav')}>
            ${SECTIONS.map(
              (item) => html`
                <a
                  href=${item.path}
                  aria-current=${section === item.id ? 'page' : 'false'}
                  @click=${this._go(item.id)}
                >
                  <finap-icon name=${item.icon} size="20"></finap-icon>
                  ${t(item.labelKey)}
                </a>
              `,
            )}
          </nav>
        </aside>

        <div class="main-col">
          <header class="topbar">
            <span class="greeting">
              <span class="greeting__hello">${t('shell.greeting')}</span>
              <span class="greeting__name">${hello} 👋</span>
            </span>
            <finap-input
              class="search"
              type="text"
              placeholder=${t('shell.search')}
            ></finap-input>
            <finap-button @click=${this._onAdd}>
              ${t('shell.add')}
            </finap-button>
            <finap-user-menu
              name=${this.user?.name ?? ''}
              email=${this.user?.email ?? ''}
              avatarUrl=${this.user?.avatarUrl ?? ''}
            ></finap-user-menu>
          </header>
          <main class="content"><slot></slot></main>
        </div>
      </div>

      <nav class="bottom-nav" aria-label=${t('shell.primaryNav')}>
        ${SECTIONS.map(
          (item) => html`
            <a
              href=${item.path}
              aria-current=${section === item.id ? 'page' : 'false'}
              @click=${this._go(item.id)}
            >
              <finap-icon name=${item.icon} size="20"></finap-icon>
              ${t(item.labelKey)}
            </a>
          `,
        )}
      </nav>

      <finap-modal
        ?open=${this.addOpen}
        heading=${t('shell.addTitle')}
        @finap-close=${this._closeAdd}
      >
        <div class="add-body">
          ${this.addOpen
            ? html`
                <finap-transaction-form
                  .categories=${this.addCategories}
                  .saving=${this.addSaving}
                  error=${this.addError}
                  @finap-save=${this._onAddSave}
                  @finap-cancel=${this._closeAdd}
                ></finap-transaction-form>
              `
            : ''}
        </div>
      </finap-modal>
    `;
  }
}

customElements.define('finap-app-shell', FinapAppShell);

declare global {
  interface HTMLElementTagNameMap {
    'finap-app-shell': FinapAppShell;
  }
}
