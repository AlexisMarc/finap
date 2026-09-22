import { LitElement, html, css } from 'lit';

import { RevealController } from '../motion/reveal.js';

import '../components/button/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';
import '../components/icon/index.js';
import '../components/container/index.js';
import '../components/brand-mark/index.js';
import '../components/theme-toggle/index.js';

const FEATURES = [
  {
    icon: 'home',
    title: 'Dashboard',
    description: 'Tu saldo, ingresos y gastos en una sola vista.',
    color: 'var(--finap-color-primary)',
  },
  {
    icon: 'arrow-right',
    title: 'Movimientos',
    description: 'Cada transacción, ordenada y filtrable.',
    color: 'var(--finap-color-secondary)',
  },
  {
    icon: 'check',
    title: 'Presupuestos',
    description: 'Límites por categoría con progreso visible.',
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
    return html`
      <header class="site-header">
        <finap-container>
          <div class="header-inner">
            <a class="brand" href="#">
              <finap-brand-mark></finap-brand-mark>
              <span class="brand__name">Finap</span>
            </a>
            <nav class="nav" aria-label="Principal">
              <a href="#funciones" @click=${this._scrollTo('funciones')}>Funciones</a>
              <a href="#presupuestos" @click=${this._scrollTo('presupuestos')}>Presupuestos</a>
            </nav>
            <finap-theme-toggle></finap-theme-toggle>
          </div>
        </finap-container>
      </header>

      <section class="hero">
        <finap-container>
          <div class="hero__grid">
            <div class="hero__content">
              <finap-heading level="1">Tu dinero, en orden.</finap-heading>
              <finap-text variant="large">
                Finap reúne saldo, gastos e ingresos en un solo lugar, para que
                siempre sepas dónde estás.
              </finap-text>
              <div class="hero__actions">
                <finap-button>Empezar</finap-button>
                <finap-button variant="secondary">Ver cómo funciona</finap-button>
              </div>
            </div>
            <div class="hero__mark" aria-hidden="true"></div>
          </div>
        </finap-container>
      </section>

      <section class="section" id="funciones">
        <finap-container>
          <finap-heading level="2">Funciones</finap-heading>
          <div class="features">
            ${FEATURES.map(
              (feature) => html`
                <div class="feature">
                  <finap-icon
                    name=${feature.icon}
                    style="color: ${feature.color}"
                  ></finap-icon>
                  <finap-heading level="3">${feature.title}</finap-heading>
                  <finap-text>${feature.description}</finap-text>
                </div>
              `,
            )}
          </div>
        </finap-container>
      </section>

      <section class="section section--alt" id="presupuestos">
        <finap-container>
          <div class="highlight">
            <finap-heading level="2">Presupuestos que se mantienen solos</finap-heading>
            <finap-text>
              Define límites por categoría y Finap te muestra el progreso, para
              que nunca te pases.
            </finap-text>
            <finap-button>Empezar</finap-button>
          </div>
        </finap-container>
      </section>

      <footer class="site-footer">
        <finap-container>
          <div class="footer-inner">
            <finap-brand-mark></finap-brand-mark>
            <finap-text variant="small">© 2026 Finap — Gestor de finanzas personales.</finap-text>
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
