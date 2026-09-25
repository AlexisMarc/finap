import { LitElement, html, css } from 'lit';
import type { ChartData } from 'chart.js';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/chart/index.js';
import '../components/analysis-metrics/index.js';

import {
  getSummary,
  getByCategory,
  getEvolution,
  type AnalysisInterval,
} from '../services/analysis-service.js';
import { LocalizeController } from '../i18n/localize.js';
import type {
  AnalysisPoint,
  AnalysisSummary,
  CategoryBreakdown,
} from '../services/types.js';

type Period = 'month' | 'quarter' | 'year';

const PERIODS: Array<{ id: Period; labelKey: string }> = [
  { id: 'month', labelKey: 'analysis.period.month' },
  { id: 'quarter', labelKey: 'analysis.period.quarter' },
  { id: 'year', labelKey: 'analysis.period.year' },
];

function iso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function periodRange(period: Period): {
  from: string;
  to: string;
  interval: AnalysisInterval;
} {
  const now = new Date();
  const to = iso(now);
  if (period === 'month') {
    return {
      from: iso(new Date(now.getFullYear(), now.getMonth(), 1)),
      to,
      interval: 'day',
    };
  }
  if (period === 'quarter') {
    return {
      from: iso(new Date(now.getFullYear(), now.getMonth() - 2, 1)),
      to,
      interval: 'month',
    };
  }
  return {
    from: iso(new Date(now.getFullYear(), 0, 1)),
    to,
    interval: 'month',
  };
}

export class AnalysisPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    sp-tag[selected] {
      --spectrum-tag-background-color: var(--finap-color-accent-interactive);
      --spectrum-tag-border-color: transparent;
      --spectrum-tag-content-color: var(--finap-color-on-primary);
    }

    .content {
      display: grid;
      gap: var(--finap-space-5);
    }

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--finap-space-4);
    }

    .periods {
      display: flex;
      gap: var(--finap-space-2);
    }

    .charts {
      display: grid;
      gap: var(--finap-space-5);
    }

    .state {
      padding: var(--finap-space-7);
      text-align: center;
      font-family: var(--finap-font-family);
      color: var(--finap-color-text-muted);
    }

    @media (min-width: 1024px) {
      .charts {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    period: { type: String },
    summary: { type: Object },
    evolution: { type: Array },
    categories: { type: Array },
  };

  loading = false;

  error = '';

  period: Period = 'month';

  summary: AnalysisSummary | null = null;

  evolution: AnalysisPoint[] = [];

  categories: CategoryBreakdown[] = [];

  private _localize = new LocalizeController(this);

  connectedCallback(): void {
    super.connectedCallback();
    void this._load();
  }

  private async _load(): Promise<void> {
    const { from, to, interval } = periodRange(this.period);
    this.loading = true;
    this.error = '';
    try {
      const [summary, evolution, categories] = await Promise.all([
        getSummary(from, to),
        getEvolution(from, to, interval),
        getByCategory(from, to, 'expense'),
      ]);
      this.summary = summary;
      this.evolution = evolution.points;
      this.categories = categories;
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : this._localize.t('analysis.error');
    } finally {
      this.loading = false;
    }
  }

  private _setPeriod(period: Period): void {
    if (this.period === period) return;
    this.period = period;
    void this._load();
  }

  private get _evolutionData(): ChartData {
    return {
      labels: this.evolution.map((point) => point.label),
      datasets: [
        {
          label: 'Ingresos',
          data: this.evolution.map((point) => point.income),
          borderColor: '#2FC78A',
          backgroundColor: 'rgba(47, 199, 138, 0.15)',
          tension: 0.35,
          fill: true,
        },
        {
          label: 'Gastos',
          data: this.evolution.map((point) => point.expense),
          borderColor: '#EB001B',
          backgroundColor: 'rgba(235, 0, 27, 0.15)',
          tension: 0.35,
          fill: true,
        },
      ],
    };
  }

  private get _categoryData(): ChartData {
    return {
      labels: this.categories.map((category) => category.name),
      datasets: [
        {
          data: this.categories.map((category) => category.amount),
          backgroundColor: this.categories.map((category) => category.color),
        },
      ],
    };
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    if (this.loading) {
      return html`
        <finap-container><div class="state">${t('common.loading')}</div></finap-container>
      `;
    }

    if (this.error) {
      return html`
        <finap-container><div class="state">${this.error}</div></finap-container>
      `;
    }

    const summary = this.summary;
    return html`
      <finap-container>
        <div class="content">
          <div class="head">
            <finap-heading level="1">${t('analysis.title')}</finap-heading>
            <div class="periods">
              ${PERIODS.map(
                (period) => html`
                  <sp-tag
                    role="button"
                    tabindex="0"
                    ?selected=${this.period === period.id}
                    @click=${() => this._setPeriod(period.id)}
                  >
                    ${t(period.labelKey)}
                  </sp-tag>
                `,
              )}
            </div>
          </div>

          <div class="metrics-wrap">
            ${summary
              ? html`
                  <finap-analysis-metrics
                    income=${summary.income}
                    expense=${summary.expense}
                    debt=${summary.debt}
                    balance=${summary.balance}
                    trend=${summary.trend}
                  ></finap-analysis-metrics>
                `
              : ''}
          </div>

          <div class="charts">
            <div class="finap-surface">
              <finap-heading level="3">${t('analysis.evolution')}</finap-heading>
              <finap-chart
                type="line"
                .data=${this._evolutionData}
              ></finap-chart>
            </div>
            <div class="finap-surface">
              <finap-heading level="3">${t('analysis.byCategory')}</finap-heading>
              <finap-chart
                type="doughnut"
                .data=${this._categoryData}
              ></finap-chart>
            </div>
          </div>
        </div>
      </finap-container>
    `;
  }
}

customElements.define('analysis-page', AnalysisPage);

declare global {
  interface HTMLElementTagNameMap {
    'analysis-page': AnalysisPage;
  }
}
