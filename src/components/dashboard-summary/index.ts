import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/badge/sp-badge.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';

export class FinapDashboardSummary extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .stat {
      display: grid;
      gap: var(--finap-space-1);
      padding: var(--finap-space-4);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-lg);
    }

    .stat__label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .stat__value {
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-xl);
      font-weight: var(--finap-font-weight-bold);
      color: var(--finap-color-text);
    }

    .summary {
      display: grid;
      gap: var(--finap-space-2);
    }

    .balance-label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .balance {
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-2xl);
      font-weight: var(--finap-font-weight-bold);
      letter-spacing: var(--finap-letter-spacing-tight);
      color: var(--finap-color-text);
    }

    .trend {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
    }

    .trend--up {
      color: var(--finap-color-income);
    }

    .trend--down {
      color: var(--finap-color-expense);
    }

    .stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-3);
      margin-top: var(--finap-space-3);
    }

    @media (min-width: 768px) {
      .stats {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `;

  static properties = {
    name: { type: String },
    balance: { type: Number },
    income: { type: Number },
    expense: { type: Number },
    debt: { type: Number },
    trend: { type: Number },
  };

  name = '';

  balance = 0;

  income = 0;

  expense = 0;

  debt = 0;

  trend = 0;

  private _localize = new LocalizeController(this);

  render() {
    const t = (key: string) => this._localize.t(key);
    const trendTone = this.trend >= 0 ? 'up' : 'down';
    return html`
      <section class="summary">
        <span class="balance-label">${t('dashboard.balance')}</span>
        <span class="balance">${formatCurrency(this.balance)}</span>
        <span class="trend trend--${trendTone}">
          ${formatPercent(this.trend)} ${t('dashboard.vsLastMonth')}
        </span>
        <div class="stats">
          ${this._stat(
            t('dashboard.income'),
            formatCurrency(this.income),
            'up',
            `+${formatCurrency(this.income)}`,
          )}
          ${this._stat(
            t('dashboard.expense'),
            formatCurrency(this.expense),
            'down',
            `-${formatCurrency(this.expense)}`,
          )}
          ${this._stat(t('dashboard.debt'), formatCurrency(this.debt))}
        </div>
      </section>
    `;
  }

  private _stat(label: string, value: string, trend = '', delta = '') {
    const variant =
      trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral';
    return html`
      <div class="stat">
        <span class="stat__label">${label}</span>
        <span class="stat__value">${value}</span>
        ${delta ? html`<sp-badge variant=${variant}>${delta}</sp-badge>` : ''}
      </div>
    `;
  }
}

customElements.define('finap-dashboard-summary', FinapDashboardSummary);

declare global {
  interface HTMLElementTagNameMap {
    'finap-dashboard-summary': FinapDashboardSummary;
  }
}
