import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import { RevealController } from '../motion/reveal.js';
import { LocalizeController } from '../i18n/localize.js';

import '../components/heading/index.js';
import '../components/text/index.js';
import { finapIcon } from '../components/icons.js';
import '../components/container/index.js';
import '../components/brand-mark/index.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import { resolveTheme, setTheme, type Theme } from '../theme/theme.js';
import { getLocale, setLocale, type Locale } from '../i18n/i18n.js';

/** Funcionalidades del producto, cada una con una imagen cálida. */
const FEATURES = [
  { id: 'dashboard', image: '/image/hassaan-here-Gz_74MbJ4V8-unsplash.webp' },
  { id: 'movements', image: '/image/hassaan-here-W89Z1p-IfvM-unsplash.webp' },
  { id: 'budgets', image: '/image/milad-fakurian-n6aIqCWqADI-unsplash.webp' },
  { id: 'analysis', image: '/image/hassaan-here-B6ahPMOptIw-unsplash.webp' },
  { id: 'debts', image: '/image/brian-lundquist-zpS4qy8SEZA-unsplash.webp' },
  { id: 'assistant', image: '/image/solen-feyissa-y3WtJlUaya8-unsplash.webp' },
];

/** Beneficios de las finanzas personales, con imágenes cálidas, azules y rojas. */
const BENEFITS = [
  { id: 'income', image: '/image/almas-salakhov-ej5sArkD1Ag-unsplash.webp' },
  { id: 'spending', image: '/image/bhautik-patel-Q8tP0qyhsXY-unsplash.webp' },
  { id: 'saving', image: '/image/hassaan-here-cD4mcWt53ko-unsplash.webp' },
  { id: 'investing', image: '/image/waro-photos-zKMmLWSDcPY-unsplash.webp' },
  { id: 'protection', image: '/image/milad-fakurian-iFHGJUgFymw-unsplash.webp' },
  { id: 'budget', image: '/image/solen-feyissa-y3WtJlUaya8-unsplash.webp' },
];

const CONTACT = {
  email: 'marcos.rincon1903@gmail.com',
  github: 'https://github.com/AlexisMarc',
  linkedin: 'https://www.linkedin.com/in/alexis-rincon-buitrago',
  portfolio: 'https://alexismarc.github.io/',
};

export class LandingPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: var(--finap-color-text);
      background-color: var(--finap-color-bg);
    }

    /* Header ---------------------------------------------------------------- */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 20;
      border-bottom: 1px solid var(--finap-color-border);
      background-color: var(--finap-color-bg);
    }

    .header-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--finap-space-3) var(--finap-space-5);
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
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-lg);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .nav {
      margin-left: auto;
    }

    .nav__item--link {
      display: none;
    }

    .locale-picker {
      display: none;
    }

    .footer-locale {
      display: inline-flex;
    }

    /* Hero ------------------------------------------------------------------ */
    .hero {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 76vh;
      padding: var(--finap-space-8) 0;
      background-image:
        linear-gradient(
          100deg,
          rgba(24, 5, 0, 0.9) 0%,
          rgba(24, 5, 0, 0.66) 42%,
          rgba(24, 5, 0, 0.22) 100%
        ),
        url('/image/almas-salakhov-ej5sArkD1Ag-unsplash.webp');
      background-size: cover;
      background-position: center;
      color: #fff;
      --finap-color-text: #fff;
      --finap-font-size-3xl: var(--finap-font-size-2xl);
    }

    .hero finap-container {
      flex: 1 1 100%;
      min-width: 0;
    }

    .hero__content {
      max-width: 34rem;
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-4);
      margin-top: var(--finap-space-5);
    }

    /* Secciones ------------------------------------------------------------- */
    .section {
      padding: var(--finap-space-8) 0;
      scroll-margin-top: 72px;
    }

    .section--alt {
      background-color: var(--finap-color-bg-subtle);
    }

    .features {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-5);
      margin-top: var(--finap-space-6);
    }

    .feature {
      --mod-card-background-color: var(--finap-color-surface);
      --mod-card-border-color: var(--finap-color-border);
      --mod-card-border-width: 1px;
      --mod-card-corner-radius: var(--finap-radius-xl);
      --mod-card-body-padding-inline: var(--finap-space-4);
      overflow: hidden;
      transition:
        transform var(--finap-motion-duration-normal)
          var(--finap-motion-easing-emphasized),
        box-shadow var(--finap-motion-duration-normal)
          var(--finap-motion-easing-standard);
    }

    .feature img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      transition: transform var(--finap-motion-duration-slow)
        var(--finap-motion-easing-standard);
    }

    .feature:hover,
    .feature:focus-within {
      --mod-card-border-width: 0;
      transform: scale(1.035);
      box-shadow: var(--finap-shadow-lg);
    }

    .feature:hover img,
    .feature:focus-within img {
      transform: scale(1.08);
    }

    .feature [slot='subheading'] {
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-regular);
      color: var(--finap-color-text-muted);
    }

    /* Beneficios ------------------------------------------------------------ */
    .benefits__intro {
      display: grid;
      justify-items: center;
      gap: var(--finap-space-2);
      max-width: 46rem;
      margin: 0 auto;
      text-align: center;
    }

    .benefits__cta {
      margin-top: var(--finap-space-5);
    }

    .benefits {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-5);
      margin-top: var(--finap-space-7);
      text-align: left;
    }

    .benefit {
      position: static !important;
      inset: auto !important;
      width: 100%;
      --mod-coachmark-width: 100%;
      --mod-coachmark-min-width: 0;
      --mod-coachmark-max-width: 100%;
      --mod-coachmark-padding: var(--finap-space-4);
      overflow: hidden;
      box-shadow: var(--finap-shadow-md);
      border-radius: var(--finap-radius-lg);
    }

    .benefit img {
      display: block;
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: var(--finap-radius-md);
    }

    .benefit__title {
      font-family: var(--finap-font-family-display);
      font-weight: var(--finap-font-weight-semibold);
    }

    /* Llamada a la acción --------------------------------------------------- */
    .cta {
      padding: var(--finap-space-8) 0;
      background-image:
        linear-gradient(rgba(3, 8, 28, 0.74), rgba(3, 8, 28, 0.74)),
        url('/image/isaac-quesada-YjeLQeWxcGk-unsplash.webp');
      background-size: cover;
      background-position: center;
      color: #fff;
      --finap-color-text: #fff;
      text-align: center;
    }

    .cta__content {
      display: grid;
      justify-items: center;
      gap: var(--finap-space-5);
      max-width: 46rem;
      margin: 0 auto;
    }

    /* Footer ---------------------------------------------------------------- */
    .site-footer {
      border-top: 1px solid var(--finap-color-border);
      background-color: var(--finap-color-bg-subtle);
      padding: var(--finap-space-8) 0 var(--finap-space-5);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-6);
    }

    .footer-brand {
      display: grid;
      gap: var(--finap-space-3);
      align-content: start;
      max-width: 22rem;
    }

    .footer-brand__identity {
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-2);
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-lg);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .footer-col {
      display: grid;
      gap: var(--finap-space-3);
      align-content: start;
    }

    .footer-col__title {
      margin: 0;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--finap-color-text-muted);
    }

    .footer-col ul {
      display: grid;
      gap: var(--finap-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .footer-bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--finap-space-3);
      margin-top: var(--finap-space-7);
      padding-top: var(--finap-space-4);
      border-top: 1px solid var(--finap-color-border);
    }

    @media (min-width: 640px) {
      .features {
        grid-template-columns: repeat(2, 1fr);
      }

      .benefits {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .nav__item--link {
        display: inline-flex;
      }

      .locale-picker {
        display: inline-flex;
      }

      .footer-locale {
        display: none;
      }

      .features {
        grid-template-columns: repeat(3, 1fr);
      }

      .benefits {
        grid-template-columns: repeat(3, 1fr);
      }

      .footer-grid {
        grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
      }

      .hero {
        --finap-font-size-3xl: var(--finap-font-size-4xl);
      }
    }
  `;

  private _localize = new LocalizeController(this);

  theme: Theme = resolveTheme();

  locale: Locale = getLocale();

  private _toggleTheme(): void {
    const theme: Theme = this.theme === 'dark' ? 'light' : 'dark';
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
              <sp-action-group id="nav-list">
                <sp-action-button
                  class="nav__item--link"
                  quiet
                  @click=${this._scrollTo('funciones')}
                  >${t('nav.functions')}</sp-action-button
                >
                <sp-action-button
                  class="nav__item--link"
                  quiet
                  @click=${this._scrollTo('beneficios')}
                  >${t('nav.benefits')}</sp-action-button
                >
                <sp-action-button emphasized selected @click=${this._goLogin}
                  >${t('nav.login')}</sp-action-button
                >
              </sp-action-group>
            </nav>
            <sp-picker
              class="locale-picker"
              quiet
              label=${t('language.toggle')}
              .value=${this.locale}
              @change=${this._onLocale}
            >
              <sp-menu-item value="es">Español</sp-menu-item>
              <sp-menu-item value="en">English</sp-menu-item>
            </sp-picker>
            <sp-action-button
              label=${this.theme === 'dark'
                ? t('theme.toggle.toLight')
                : t('theme.toggle.toDark')}
              @click=${this._toggleTheme}
            >
              ${finapIcon('theme', 16, 'icon')}
            </sp-action-button>
          </div>
        </finap-container>
      </header>

      <section class="hero">
        <finap-container>
          <div class="hero__content">
            <finap-heading level="1">${t('landing.hero.headline')}</finap-heading>
            <finap-text variant="large">${t('landing.hero.subtitle')}</finap-text>
            <div class="hero__actions">
              <sp-button variant="accent" @click=${this._goLogin}>
                ${t('landing.hero.cta')}
              </sp-button>
              <sp-button
                static-color="white"
                treatment="outline"
                @click=${this._scrollTo('funciones')}
              >
                ${t('landing.hero.secondary')}
              </sp-button>
            </div>
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
                  <img
                    slot="cover-photo"
                    src=${feature.image}
                    alt=""
                    loading="lazy"
                  />
                  <span slot="heading"
                    >${t(`landing.feature.${feature.id}.title`)}</span
                  >
                  <span slot="subheading">
                    ${t(`landing.feature.${feature.id}.description`)}
                  </span>
                </sp-card>
              `,
            )}
          </div>
        </finap-container>
      </section>

      <section class="section section--alt" id="beneficios">
        <finap-container>
          <div class="benefits__intro">
            <finap-heading level="2">${t('landing.benefits.title')}</finap-heading>
            <finap-text variant="small" class="benefits__subtitle">
              ${t('landing.benefits.subtitle')}
            </finap-text>
            <sp-button
              class="benefits__cta"
              variant="accent"
              @click=${this._goLogin}
            >
              ${t('landing.benefits.cta')}
            </sp-button>
          </div>
          <div class="benefits">
            ${BENEFITS.map(
              (benefit) => html`
                <sp-coachmark class="benefit" open>
                  <img
                    slot="asset"
                    src=${benefit.image}
                    alt=""
                    loading="lazy"
                  />
                  <span slot="title" class="benefit__title"
                    >${t(`landing.benefit.${benefit.id}.title`)}</span
                  >
                  <div slot="content">
                    ${t(`landing.benefit.${benefit.id}.content`)}
                  </div>
                </sp-coachmark>
              `,
            )}
          </div>
        </finap-container>
      </section>

      <section class="cta">
        <finap-container>
          <div class="cta__content">
            <finap-heading level="2">${t('landing.cta.headline')}</finap-heading>
            <sp-button size="xl" variant="accent" @click=${this._goLogin}>
              ${t('landing.cta.button')}
            </sp-button>
          </div>
        </finap-container>
      </section>

      <footer class="site-footer">
        <finap-container>
          <div class="footer-grid">
            <div class="footer-brand">
              <span class="footer-brand__identity">
                <finap-brand-mark></finap-brand-mark>
                ${t('app.name')}
              </span>
              <finap-text variant="small">
                ${t('landing.footer.tagline')}
              </finap-text>
            </div>

            <nav class="footer-col" aria-label=${t('landing.footer.product')}>
              <h3 class="footer-col__title">${t('landing.footer.product')}</h3>
              <ul>
                <li>
                  <sp-link href="#funciones" @click=${this._scrollTo('funciones')}>
                    ${t('nav.functions')}
                  </sp-link>
                </li>
                <li>
                  <sp-link
                    href="#beneficios"
                    @click=${this._scrollTo('beneficios')}
                  >
                    ${t('nav.benefits')}
                  </sp-link>
                </li>
                <li>
                  <sp-link href="/login" @click=${this._goLogin}>
                    ${t('nav.budgets')}
                  </sp-link>
                </li>
              </ul>
            </nav>

            <nav class="footer-col" aria-label=${t('landing.footer.access')}>
              <h3 class="footer-col__title">${t('landing.footer.access')}</h3>
              <ul>
                <li>
                  <sp-link href="/login" @click=${this._goLogin}>
                    ${t('nav.login')}
                  </sp-link>
                </li>
                <li>
                  <sp-link href="/login" @click=${this._goLogin}>
                    ${t('nav.start')}
                  </sp-link>
                </li>
              </ul>
            </nav>

            <div class="footer-col">
              <h3 class="footer-col__title">${t('landing.footer.contact')}</h3>
              <ul>
                <li>
                  <sp-link href=${`mailto:${CONTACT.email}`}>
                    ${CONTACT.email}
                  </sp-link>
                </li>
                <li>
                  <sp-link href=${CONTACT.github} target="_blank" rel="noreferrer">
                    GitHub
                  </sp-link>
                </li>
                <li>
                  <sp-link href=${CONTACT.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </sp-link>
                </li>
                <li>
                  <sp-link href=${CONTACT.portfolio} target="_blank" rel="noreferrer">
                    alexismarc.github.io
                  </sp-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <finap-text variant="small">${t('landing.footer.rights')}</finap-text>
            <sp-picker
              class="footer-locale"
              quiet
              size="s"
              label=${t('language.toggle')}
              .value=${this.locale}
              @change=${this._onLocale}
            >
              <sp-menu-item value="es">Español</sp-menu-item>
              <sp-menu-item value="en">English</sp-menu-item>
            </sp-picker>
            <finap-text variant="small">${t('landing.footer.madeBy')}</finap-text>
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
