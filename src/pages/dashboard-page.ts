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

    .carousel sp-card {
      flex: none;
      width: 260px;
      scroll-snap-align: start;
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
              <sp-card size="s">
                <span slot="heading"
                  >${t('dashboard.suggestion.budgets')}</span
                >
              </sp-card>
              <sp-card size="s">
                <span slot="heading"
                  >${t('dashboard.suggestion.savings')}</span
                >
              </sp-card>
              <sp-card size="s">
                <span slot="heading">${t('dashboard.suggestion.debts')}</span>
              </sp-card>
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
