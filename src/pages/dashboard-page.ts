import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/skeleton/index.js';
import '../components/dashboard-summary/index.js';
import '../components/dashboard-categories/index.js';
import '../components/dashboard-debts/index.js';
import '../components/dashboard-recent/index.js';
import '../components/assistant-chat/index.js';
import '@spectrum-web-components/card/sp-card.js';
import { LocalizeController } from '../i18n/localize.js';

import { getDashboard } from '../services/dashboard-service.js';
import { getUser } from '../state/session.js';
import { TRANSACTIONS_CHANGED_EVENT } from '../state/transactions.js';
import { DEBTS_CHANGED_EVENT } from '../state/debts.js';
import type { DashboardSummary } from '../services/types.js';

/** Sugerencias del dashboard, cada una con una imagen cálida. */
const SUGGESTIONS = [
  { id: 'budgets', image: '/image/milad-fakurian-n6aIqCWqADI-unsplash.webp' },
  { id: 'savings', image: '/image/hassaan-here-cD4mcWt53ko-unsplash.webp' },
  { id: 'debts', image: '/image/brian-lundquist-zpS4qy8SEZA-unsplash.webp' },
];

export class DashboardPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .sections {
      display: grid;
      gap: var(--finap-space-5);
    }

    .two-col {
      display: grid;
      gap: var(--finap-space-5);
    }

    .state {
      display: grid;
      gap: var(--finap-space-4);
      justify-items: center;
      padding: var(--finap-space-7);
      text-align: center;
      font-family: var(--finap-font-family);
      color: var(--finap-color-text-muted);
    }

    .suggestions {
      display: grid;
      gap: var(--finap-space-3);
    }

    .carousel {
      display: flex;
      gap: var(--finap-space-4);
      overflow-x: auto;
      padding-bottom: var(--finap-space-2);
      scroll-snap-type: x mandatory;
    }

    .suggestion {
      flex: none;
      width: 280px;
      scroll-snap-align: start;
      --mod-card-background-color: var(--finap-color-surface);
      --mod-card-border-color: var(--finap-color-border);
      --mod-card-border-width: 1px;
      --mod-card-corner-radius: var(--finap-radius-xl);
      --mod-card-body-padding-inline: var(--finap-space-4);
      overflow: hidden;
      transition: box-shadow var(--finap-motion-duration-normal)
        var(--finap-motion-easing-standard);
    }

    .suggestion img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
    }

    .suggestion:hover,
    .suggestion:focus-within {
      --mod-card-border-width: 0;
      box-shadow: var(--finap-shadow-lg);
    }

    .suggestion [slot='subheading'] {
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-regular);
      color: var(--finap-color-text-muted);
    }

    @media (min-width: 1024px) {
      .two-col {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    summary: { type: Object },
  };

  loading = false;

  error = '';

  summary: DashboardSummary | null = null;

  private _userName = '';

  private _localize = new LocalizeController(this);

  connectedCallback(): void {
    super.connectedCallback();
    this._userName = getUser()?.name ?? '';
    window.addEventListener(TRANSACTIONS_CHANGED_EVENT, this._onTransactionsChanged);
    window.addEventListener(DEBTS_CHANGED_EVENT, this._onTransactionsChanged);
    void this._load();
  }

  disconnectedCallback(): void {
    window.removeEventListener(
      TRANSACTIONS_CHANGED_EVENT,
      this._onTransactionsChanged,
    );
    window.removeEventListener(DEBTS_CHANGED_EVENT, this._onTransactionsChanged);
    super.disconnectedCallback();
  }

  private _onTransactionsChanged = (): void => {
    void this._load();
  };

  private async _load(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      this.summary = await getDashboard();
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : 'No se pudo cargar el dashboard';
    } finally {
      this.loading = false;
    }
  }

  private _retry(): void {
    void this._load();
  }

  private get _debtTotal(): number {
    return (this.summary?.debts ?? []).reduce(
      (sum, debt) => sum + (debt.total - debt.paid),
      0,
    );
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    if (this.loading) {
      return html`
        <finap-container>
          <finap-skeleton variant="rect" height="240px"></finap-skeleton>
        </finap-container>
      `;
    }

    if (this.error) {
      return html`
        <finap-container>
          <div class="state">
            <p>${this.error}</p>
            <sp-button variant="accent" @click=${this._retry}>Reintentar</sp-button>
          </div>
        </finap-container>
      `;
    }

    if (!this.summary) {
      return html`
        <finap-container>
          <div class="state">No hay datos disponibles.</div>
        </finap-container>
      `;
    }

    const summary = this.summary;
    return html`
      <finap-container>
        <div class="sections">
          ${this._userName
            ? html`<finap-heading level="2" class="greeting"
                >${t('dashboard.greeting')}, ${this._userName} 👋</finap-heading
              >`
            : ''}
          <finap-dashboard-summary
            name=${this._userName}
            balance=${summary.balance}
            income=${summary.income}
            expense=${summary.expense}
            debt=${this._debtTotal}
            trend=${summary.trend}
          ></finap-dashboard-summary>

          <div class="finap-surface">
            <finap-dashboard-categories
              .categories=${summary.categories}
            ></finap-dashboard-categories>
          </div>

          <div class="two-col">
            <div class="finap-surface">
              <finap-dashboard-debts
                .debts=${summary.debts}
              ></finap-dashboard-debts>
            </div>
            <div class="finap-surface">
              <finap-dashboard-recent
                .transactions=${summary.recentTransactions}
              ></finap-dashboard-recent>
            </div>
          </div>

          <finap-assistant-chat></finap-assistant-chat>

          <section class="suggestions">
            <finap-heading level="3">${t('dashboard.suggestions')}</finap-heading>
            <div class="carousel">
              ${SUGGESTIONS.map(
                (suggestion) => html`
                  <sp-card class="suggestion" size="s">
                    <img
                      slot="cover-photo"
                      src=${suggestion.image}
                      alt=""
                      loading="lazy"
                    />
                    <span slot="heading"
                      >${t(
                        `dashboard.suggestion.${suggestion.id}.title`,
                      )}</span
                    >
                    <span slot="subheading">
                      ${t(`dashboard.suggestion.${suggestion.id}`)}
                    </span>
                  </sp-card>
                `,
              )}
            </div>
          </section>
        </div>
      </finap-container>
    `;
  }
}

customElements.define('dashboard-page', DashboardPage);

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-page': DashboardPage;
  }
}
