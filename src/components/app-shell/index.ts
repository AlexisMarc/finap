import { LitElement, html, css, nothing } from 'lit';
import { navigate } from '@open-cells/core';

import { finapIcon } from '../icons.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/avatar/sp-avatar.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '../brand-mark/index.js';
import '../transaction-form/index.js';

import {
  getSession,
  SESSION_CHANGED_EVENT,
  type SessionUser,
} from '../../state/session.js';
import { logout } from '../../services/auth-service.js';
import { list as listCategories } from '../../services/categories-service.js';
import { resolveTheme, setTheme, type Theme } from '../../theme/theme.js';
import { getLocale, setLocale, type Locale } from '../../i18n/i18n.js';
import { getCurrency, setCurrency } from '../../state/session.js';
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

const HELP_STEPS = [
  {
    key: 'shell.help.step1',
    image: '/image/hassaan-here-B6ahPMOptIw-unsplash.webp',
    titleKey: 'shell.help.step1.title',
    textKey: 'shell.help.step1',
  },
  {
    key: 'shell.help.step2',
    image: '/image/brian-lundquist-zpS4qy8SEZA-unsplash.webp',
    titleKey: 'shell.help.step2.title',
    textKey: 'shell.help.step2',
  },
  {
    key: 'shell.help.step3',
    image: '/image/philip-oroni-ZxwyDGICj4c-unsplash.webp',
    titleKey: 'shell.help.step3.title',
    textKey: 'shell.help.step3',
  },
];

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
      align-items: start;
      min-height: 100vh;
    }

    .sidebar {
      display: none;
      box-sizing: border-box;
      min-width: 0;
      padding: var(--finap-space-5);
      border-right: 1px solid var(--finap-color-border);
      background-color: var(--finap-color-bg-subtle);
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-2);
      margin-bottom: var(--finap-space-6);
      color: var(--finap-color-text);
      text-decoration: none;
      font-family: var(--finap-font-family-display);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    sp-sidenav {
      width: 100%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--finap-space-3);
      margin-left: auto;
    }

    .avatar {
      display: inline-grid;
      place-items: center;
      inline-size: 24px;
      block-size: 24px;
      border-radius: 50%;
      background-color: var(--finap-color-accent);
      color: #fff;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-xs);
      font-weight: var(--finap-font-weight-semibold);
      line-height: 1;
      text-transform: uppercase;
    }

    .breadcrumbs {
      display: none;
    }

    @media (min-width: 768px) {
      .breadcrumbs {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
    }

    .help-steps {
      display: grid;
      gap: var(--finap-space-4);
    }

    .help-actions {
      display: flex;
      align-items: center;
      gap: var(--finap-space-3);
    }

    .help-count {
      margin-left: auto;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .help-tour {
      display: grid;
      gap: var(--finap-space-4);
      padding: var(--finap-space-2) 0;
    }

    .help-tour sp-coachmark {
      position: static !important;
      inset: auto !important;
      width: 100%;
      --mod-coachmark-width: 100%;
      --mod-coachmark-min-width: 0;
      --mod-coachmark-max-width: 100%;
      --mod-coachmark-padding: var(--finap-space-4);
      overflow: hidden;
    }

    .help-tour sp-coachmark img {
      display: block;
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: var(--finap-radius-md);
    }

    .main-col {
      display: grid;
      grid-template-rows: auto 1fr;
      min-width: 0;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 40;
      display: flex;
      align-items: center;
      gap: var(--finap-space-4);
      padding: var(--finap-space-3) var(--finap-space-5);
      border-bottom: 1px solid var(--finap-color-border);
      background-color: var(--finap-color-bg);
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
      color: var(--finap-color-accent-interactive);
    }

    @media (min-width: 1024px) {
      .layout {
        grid-template-columns: 240px 1fr;
      }

      .sidebar {
        display: block;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
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
    theme: { type: String },
    locale: { type: String },
    currency: { type: String },
    helpOpen: { type: Boolean },
    helpStep: { type: Number },
    addOpen: { type: Boolean },
    addSaving: { type: Boolean },
    addError: { type: String },
    addCategories: { type: Array },
  };

  currentPage = '';

  user: SessionUser | null = null;

  theme: Theme = resolveTheme();

  locale: Locale = getLocale();

  currency = getCurrency();

  helpOpen = false;

  helpStep = 0;

  addOpen = false;

  addSaving = false;

  addError = '';

  addCategories: Category[] = [];

  private _localize = new LocalizeController(this);

  updated(changes: Map<string, unknown>): void {
    super.updated(changes);
    this._enableUnderlay(changes, 'helpOpen', '.help-dialog');
    this._enableUnderlay(changes, 'addOpen', '.add-dialog');
  }

  private _enableUnderlay(
    changes: Map<string, unknown>,
    prop: 'helpOpen' | 'addOpen',
    selector: string,
  ): void {
    if (!changes.has(prop) || !this[prop]) return;
    const dialog = this.shadowRoot?.querySelector(selector);
    if (dialog) {
      (dialog as any).underlay = true;
      (dialog as any).requestUpdate();
    }
  }

  private _observer?: MutationObserver;

  private _onSessionChanged = () => {
    this.user = getSession()?.user ?? null;
  };

  private _onLogout = () => {
    void logout();
    navigate('landing');
  };

  private _onUserMenuChange = (event: Event): void => {
    const value = (event.target as { value?: string }).value ?? '';
    if (value === 'logout') {
      this._onLogout();
      return;
    }
    if (value === 'theme') {
      const next: Theme = this.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      this.theme = next;
      return;
    }
    if (value.startsWith('locale:')) {
      const locale = value.split(':')[1] as Locale;
      setLocale(locale);
      this.locale = locale;
      return;
    }
    if (value.startsWith('currency:')) {
      setCurrency(value.split(':')[1]);
      this.currency = getCurrency();
    }
  };

  private _openHelp = (): void => {
    this.helpStep = 0;
    this.helpOpen = true;
  };

  private _closeHelp = (): void => {
    this.helpOpen = false;
  };

  private _helpPrev = (): void => {
    if (this.helpStep > 0) this.helpStep -= 1;
  };

  private _helpNext = (): void => {
    if (this.helpStep < HELP_STEPS.length - 1) {
      this.helpStep += 1;
    } else {
      this._closeHelp();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.user = getSession()?.user ?? null;
    document.documentElement.addEventListener(
      SESSION_CHANGED_EVENT,
      this._onSessionChanged,
    );

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

  private get _initials(): string {
    const name = this.user?.name?.trim() ?? '';
    if (!name) return '?';
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
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

    return html`
      <div class="layout">
        <aside class="sidebar">
          <a class="brand" href="/dashboard" @click=${this._go('dashboard')}>
            <finap-brand-mark></finap-brand-mark>
            <span>Finap</span>
          </a>
          <sp-sidenav aria-label=${t('shell.primaryNav')}>
            ${SECTIONS.map(
              (item) => html`
                <sp-sidenav-item
                  value=${item.id}
                  ?selected=${section === item.id}
                  @click=${this._go(item.id)}
                >
                  ${finapIcon(item.icon, 20, 'icon')}
                  ${t(item.labelKey)}
                </sp-sidenav-item>
              `,
            )}
          </sp-sidenav>
        </aside>

        <div class="main-col">
          <header class="topbar">
            <div class="breadcrumbs">
              <sp-breadcrumbs>
                <sp-breadcrumb-item
                  href="/dashboard"
                  @click=${this._go('dashboard')}
                >
                  ${t('shell.nav.home')}
                </sp-breadcrumb-item>
                ${section === 'dashboard'
                  ? ''
                  : html`<sp-breadcrumb-item
                      >${t(
                        SECTIONS.find((s) => s.id === section)?.labelKey ??
                          'shell.nav.home',
                      )}</sp-breadcrumb-item
                    >`}
              </sp-breadcrumbs>
            </div>
            <div class="header-actions">
              <sp-action-group>
                <sp-button variant="accent" @click=${this._onAdd}>
                  ${t('shell.add')}
                </sp-button>
                <sp-action-button @click=${this._openHelp}>
                  ${finapIcon('help', 18, 'icon')}
                  ${t('shell.help')}
                </sp-action-button>
              </sp-action-group>
              <sp-action-menu
                label=${t('shell.account')}
                @change=${this._onUserMenuChange}
              >
                ${this.user?.avatarUrl
                  ? html`<sp-avatar
                      slot="icon"
                      label=${this.user?.name ?? ''}
                      src=${this.user.avatarUrl}
                    ></sp-avatar>`
                  : html`<span
                      slot="icon"
                      class="avatar"
                      aria-hidden="true"
                      >${this._initials}</span
                    >`}
                <sp-menu-item value="theme">
                  ${this.theme === 'dark'
                    ? t('theme.toggle.toLight')
                    : t('theme.toggle.toDark')}
                </sp-menu-item>
                <sp-menu-item
                  value="locale:es"
                  ?disabled=${this.locale === 'es'}
                >
                  Español
                </sp-menu-item>
                <sp-menu-item
                  value="locale:en"
                  ?disabled=${this.locale === 'en'}
                >
                  English
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item value="currency:USD">USD</sp-menu-item>
                <sp-menu-item value="currency:COP">COP</sp-menu-item>
                <sp-menu-item value="currency:EUR">EUR</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item value="logout">
                  ${t('userMenu.logout')}
                </sp-menu-item>
              </sp-action-menu>
            </div>
          </header>
          <main class="content"><slot></slot></main>
        </div>
      </div>

      <nav class="bottom-nav" aria-label=${t('shell.primaryNav')}>
        ${SECTIONS.map(
          (item) => html`
            <a
              href=${item.path}
              aria-current=${section === item.id ? 'page' : nothing}
              @click=${this._go(item.id)}
            >
              ${finapIcon(item.icon, 20, 'icon')}
              ${t(item.labelKey)}
            </a>
          `,
        )}
      </nav>

      <sp-dialog-wrapper
        class="add-dialog"
        ?open=${this.addOpen}
        headline=${t('shell.addTitle')}
        dismissable
        size="l"
        @close=${this._closeAdd}
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
      </sp-dialog-wrapper>

      <sp-dialog-wrapper
        class="help-dialog"
        ?open=${this.helpOpen}
        headline=${t('shell.help')}
        dismissable
        size="s"
        @close=${this._closeHelp}
      >
        <div class="help-tour">
          ${this.helpOpen
            ? html`
                <sp-coachmark
                  class="help-step"
                  open
                  .primaryCTA=${this.helpStep === HELP_STEPS.length - 1
                    ? t('common.close')
                    : t('common.next')}
                  .secondaryCTA=${this.helpStep === 0 ? '' : t('common.prev')}
                  .totalSteps=${HELP_STEPS.length}
                  .currentStep=${this.helpStep + 1}
                  @primary=${this._helpNext}
                  @secondary=${this._helpPrev}
                >
                  <img
                    slot="asset"
                    src=${HELP_STEPS[this.helpStep].image}
                    alt=""
                  />
                  <span slot="title"
                    >${t(HELP_STEPS[this.helpStep].titleKey)}</span
                  >
                  <div slot="content">
                    ${t(HELP_STEPS[this.helpStep].textKey)}
                  </div>
                </sp-coachmark>
              `
            : nothing}
        </div>
      </sp-dialog-wrapper>
    `;
  }
}

customElements.define('finap-app-shell', FinapAppShell);

declare global {
  interface HTMLElementTagNameMap {
    'finap-app-shell': FinapAppShell;
  }
}
