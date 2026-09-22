import { LitElement, html, css } from 'lit';

import '../stat-card/index.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';

export class FinapAnalysisMetrics extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--finap-space-3);
    }

    @media (min-width: 768px) {
      .metrics {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;

  static properties = {
    income: { type: Number },
    expense: { type: Number },
    debt: { type: Number },
    balance: { type: Number },
    trend: { type: Number },
  };

  income = 0;

  expense = 0;

  debt = 0;

  balance = 0;

  trend = 0;

  private _localize = new LocalizeController(this);

  render() {
    const t = (key: string) => this._localize.t(key);
    const tone = this.trend >= 0 ? 'up' : 'down';
    return html`
      <div class="metrics">
        <finap-stat-card
          label=${t('analysis.balance')}
          value=${formatCurrency(this.balance)}
          trend=${tone}
          delta=${formatPercent(this.trend)}
        ></finap-stat-card>
        <finap-stat-card
          label=${t('analysis.income')}
          value=${formatCurrency(this.income)}
        ></finap-stat-card>
        <finap-stat-card
          label=${t('analysis.expense')}
          value=${formatCurrency(this.expense)}
        ></finap-stat-card>
        <finap-stat-card
          label=${t('analysis.debt')}
          value=${formatCurrency(this.debt)}
        ></finap-stat-card>
      </div>
    `;
  }
}

customElements.define('finap-analysis-metrics', FinapAnalysisMetrics);

declare global {
  interface HTMLElementTagNameMap {
    'finap-analysis-metrics': FinapAnalysisMetrics;
  }
}
