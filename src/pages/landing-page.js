import { LitElement, html, css } from 'lit';
import { RevealController } from '../motion/reveal.js';
import '../components/button/index.js';
import '../components/card/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';
import '../components/icon/index.js';
import '../components/container/index.js';
import '../components/brand-mark/index.js';
const FEATURES = [
    {
        icon: 'home',
        title: 'Dashboard',
        description: 'Resumen de saldo, ingresos y gastos.',
        color: 'var(--finap-color-primary)',
    },
    {
        icon: 'arrow-right',
        title: 'Movimientos',
        description: 'Listado con filtros y ordenación.',
        color: 'var(--finap-color-secondary)',
    },
    {
        icon: 'check',
        title: 'Presupuestos',
        description: 'Presupuestos por categoría con progreso.',
        color: 'var(--finap-color-accent)',
    },
    {
        icon: 'settings',
        title: 'Categorías',
        description: 'Crea, edita y elimina tus categorías.',
        color: 'var(--finap-color-primary)',
    },
];
export class LandingPage extends LitElement {
    static { this.styles = css `
    :host {
      display: block;
      min-height: 100vh;
    }

    .hero {
      background: var(--finap-gradient-brand);
      --finap-color-text: #ffffff;
      text-align: center;
      padding: var(--finap-space-8) var(--finap-space-5);
    }

    .hero__accent {
      display: inline-block;
      width: 64px;
      height: 4px;
      margin: var(--finap-space-3) auto;
      border-radius: var(--finap-radius-full);
      background-color: var(--finap-color-accent);
    }

    .hero__actions {
      display: flex;
      gap: var(--finap-space-4);
      justify-content: center;
      margin-top: var(--finap-space-5);
    }

    .features {
      padding: var(--finap-space-7) 0;
    }

    .features__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-5);
      margin-top: var(--finap-space-5);
    }

    .feature__icon {
      color: inherit;
    }

    .footer {
      background-color: var(--finap-color-bg-subtle);
      border-top: 1px solid var(--finap-color-border);
      padding: var(--finap-space-6) 0;
    }

    @media (min-width: 768px) {
      .features__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .features__grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `; }
    constructor() {
        super();
        new RevealController(this);
    }
    render() {
        return html `
      <section class="hero">
        <finap-container>
          <finap-brand-mark></finap-brand-mark>
          <finap-heading level="1">Finap</finap-heading>
          <span class="hero__accent" aria-hidden="true"></span>
          <finap-text>Gestiona tus finanzas personales de forma sencilla.</finap-text>
          <div class="hero__actions">
            <finap-button>Empezar</finap-button>
            <finap-button variant="secondary">Conocer más</finap-button>
          </div>
        </finap-container>
      </section>

      <section class="features">
        <finap-container>
          <finap-heading level="2">Todo lo que necesitas</finap-heading>
          <div class="features__grid">
            ${FEATURES.map((feature) => html `
                <finap-card>
                  <finap-icon
                    name=${feature.icon}
                    style="color: ${feature.color}"
                  ></finap-icon>
                  <finap-heading level="3">${feature.title}</finap-heading>
                  <finap-text>${feature.description}</finap-text>
                </finap-card>
              `)}
          </div>
        </finap-container>
      </section>

      <footer class="footer">
        <finap-container>
          <finap-text variant="small">Finap — Gestor de finanzas personales.</finap-text>
        </finap-container>
      </footer>
    `;
    }
}
customElements.define('landing-page', LandingPage);
