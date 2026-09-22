import { LitElement, html, css } from 'lit';

import '../stat-card/index.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';

export class FinapDashboardSummary extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .summary {
      display: grid;
      gap: var(--finap-space-2);
    }

    .hello {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
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

  render() {
    const trendTone = this.trend >= 0 ? 'up' : 'down';
    return html`
      <section class="summary">
        <span class="hello">Hola, ${this.name} 👋</span>
        <span class="balance-label">Balance total</span>
        <span class="balance">${formatCurrency(this.balance)}</span>
        <span class="trend trend--${trendTone}">
          ${formatPercent(this.trend)} vs. mes pasado
        </span>
        <div class="stats">
          <finap-stat-card
            label="Ingresos"
            value=${formatCurrency(this.income)}
            trend="up"
            delta=${`+${formatCurrency(this.income)}`}
          ></finap-stat-card>
          <finap-stat-card
            label="Gastos"
            value=${formatCurrency(this.expense)}
            trend="down"
            delta=${`-${formatCurrency(this.expense)}`}
          ></finap-stat-card>
          <finap-stat-card
            label="Deudas"
            value=${formatCurrency(this.debt)}
            trend="neutral"
          ></finap-stat-card>
        </div>
      </section>
    `;
  }
}

customElements.define('finap-dashboard-summary', FinapDashboardSummary);

declare global {
  interface HTMLElementTagNameMap {
    'finap-dashboard-summary': FinapDashboardSummary;
  }
}
