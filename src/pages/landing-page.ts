import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import { RevealController } from '../motion/reveal.js';
import { LocalizeController } from '../i18n/localize.js';

import '../components/heading/index.js';
import '../components/text/index.js';
import { finapIcon } from '../components/icons.js';
import '../components/container/index.js';
import '../components/brand-mark/index.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/badge/sp-badge.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import { resolveTheme, setTheme, type Theme } from '../theme/theme.js';
import { getLocale, setLocale, type Locale } from '../i18n/i18n.js';

const FEATURES = [
  {
    icon: 'home',
    titleKey: 'landing.feature.dashboard.title',
    descriptionKey: 'landing.feature.dashboard.description',
    color: 'var(--finap-color-primary)',
  },
  {
    icon: 'arrow-right',
    titleKey: 'landing.feature.movements.title',
    descriptionKey: 'landing.feature.movements.description',
    color: 'var(--finap-color-secondary)',
  },
  {
    icon: 'check',
    titleKey: 'landing.feature.budgets.title',
    descriptionKey: 'landing.feature.budgets.description',
    color: 'var(--finap-color-accent)',
  },
];

export class LandingPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: var(--finap-color-text);
    }

    .site-header {
      border-bottom: 1px solid var(--finap-color-border);
      background-color: var(--finap-color-bg);
    }

    .header-inner {
      display: flex;
      align-items: center;
      gap: var(--finap-space-5);
      padding: var(--finap-space-3) 0;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-2);
      text-decoration: none;
      color: var(--finap-color-text);
    }

    .brand__name {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-lg);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .nav {
      display: flex;
      gap: var(--finap-space-4);
      margin-left: auto;
    }

    .nav a {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-md);
      color: var(--finap-color-text-muted);
      text-decoration: none;
    }

    .nav a:hover {
      color: var(--finap-color-text);
    }

    .hero {
      padding: var(--finap-space-8) 0;
      --finap-font-size-3xl: var(--finap-font-size-4xl);
    }

    .hero__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-6);
      align-items: center;
    }

    .hero__actions {
      display: flex;
      gap: var(--finap-space-4);
      margin-top: var(--finap-space-5);
    }

    .hero__mark {
      width: 160px;
      height: 160px;
      margin: 0 auto;
      transform: rotate(45deg);
      border-radius: 8px;
      background: var(--finap-gradient-brand);
    }

    .section {
      padding: var(--finap-space-7) 0;
    }

    .section--alt {
      background-color: var(--finap-color-bg-subtle);
    }

    .features {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-5);
      margin-top: var(--finap-space-5);
    }

    .feature {
      border-top: 1px solid var(--finap-color-border);
      padding-top: var(--finap-space-4);
    }

    .highlight {
      display: grid;
      gap: var(--finap-space-4);
      justify-items: start;
    }

    .site-footer {
      border-top: 1px solid var(--finap-color-border);
      padding: var(--finap-space-6) 0;
    }

    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--finap-space-4);
    }

    @media (min-width: 768px) {
      .hero__grid {
        grid-template-columns: 1fr 1fr;
      }

      .features {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `;

  private _localize = new LocalizeController(this);

  theme: Theme = resolveTheme();

  locale: Locale = getLocale();

  private _onTheme(event: Event): void {
    const checked = (event.target as { checked?: boolean }).checked ?? false;
    const theme: Theme = checked ? 'dark' : 'light';
    setTheme(theme);
    this.theme = theme;
  }

  private _onLocale(event: Event): void {
    this.locale = (event.target as { value?: string }).value as Locale;
    setLocale(this.locale);
  }

  private _goLogin(event?: Event): void {
    event?.preventDefault();
    navigate('login');
  }

  private _scrollTo(id: string) {
    return (event: Event) => {
      event.preventDefault();
      this.shadowRoot?.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth' });
    };
  }

  constructor() {
    super();
    new RevealController(this);
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return html`
      <header class="site-header">
        <finap-container>
          <div class="header-inner">
            <a class="brand" href="#">
              <finap-brand-mark></finap-brand-mark>
              <span class="brand__name">${t('app.name')}</span>
            </a>
            <nav class="nav" aria-label="Principal">
              <sp-link href="#funciones" @click=${this._scrollTo('funciones')}>
                ${t('nav.functions')}
              </sp-link>
              <sp-link
                href="#presupuestos"
                @click=${this._scrollTo('presupuestos')}
              >
                ${t('nav.budgets')}
              </sp-link>
              <sp-link href="/login" @click=${this._goLogin}>
                ${t('nav.login')}
              </sp-link>
            </nav>
            <sp-picker
              size="s"
              quiet
              .value=${this.locale}
              @change=${this._onLocale}
            >
              <sp-menu-item value="es">Español</sp-menu-item>
              <sp-menu-item value="en">English</sp-menu-item>
            </sp-picker>
            <sp-switch
              size="s"
              .checked=${this.theme === 'dark'}
              @change=${this._onTheme}
            ></sp-switch>
          </div>
        </finap-container>
      </header>

      <section class="hero">
        <finap-container>
          <div class="hero__grid">
            <div class="hero__content">
              <finap-heading level="1">${t('landing.hero.headline')}</finap-heading>
              <finap-text variant="large">${t('landing.hero.subtitle')}</finap-text>
              <sp-action-group>
                <sp-button variant="accent" @click=${this._goLogin}>
                  ${t('landing.hero.cta')}
                </sp-button>
                <sp-button
                  variant="secondary"
                  @click=${this._scrollTo('funciones')}
                >
                  ${t('landing.hero.secondary')}
                </sp-button>
              </sp-action-group>
            </div>
            <div class="hero__mark" aria-hidden="true"></div>
          </div>
        </finap-container>
      </section>

      <section class="section" id="funciones">
        <finap-container>
          <finap-heading level="2">${t('landing.features.title')}</finap-heading>
          <div class="features">
            ${FEATURES.map(
              (feature) => html`
                <sp-card class="feature" size="s">
                  <span slot="heading">${t(feature.titleKey)}</span>
                  <div slot="description">
                    <span
                      class="feature__icon"
                      style=${`color: ${feature.color}`}
                      >${finapIcon(feature.icon, 24)}</span
                    >
                    <p class="feature__text">${t(feature.descriptionKey)}</p>
                  </div>
                </sp-card>
              `,
            )}
          </div>
        </finap-container>
      </section>

      <section class="section section--alt" id="presupuestos">
        <finap-container>
          <sp-card class="highlight" size="m">
            <span slot="heading">${t('landing.highlight.title')}</span>
            <div slot="description" class="highlight__body">
              <sp-badge variant="accent">${t('nav.budgets')}</sp-badge>
              <p>${t('landing.highlight.body')}</p>
            </div>
            <sp-button
              slot="footer"
              variant="accent"
              @click=${this._goLogin}
            >
              ${t('landing.highlight.cta')}
            </sp-button>
          </sp-card>
        </finap-container>
      </section>

      <footer class="site-footer">
        <finap-container>
          <div class="footer-inner">
            <finap-brand-mark></finap-brand-mark>
            <finap-text variant="small">${t('landing.footer')}</finap-text>
            <sp-link href="/login" @click=${this._goLogin}>
              ${t('nav.login')}
            </sp-link>
          </div>
        </finap-container>
      </footer>
    `;
  }
}

customElements.define('landing-page', LandingPage);

declare global {
  interface HTMLElementTagNameMap {
    'landing-page': LandingPage;
  }
}
