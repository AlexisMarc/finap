import { LitElement, html, css } from 'lit';

import '../heading/index.js';
import { progressBarStyles, renderProgressBar } from '../progress-bar.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency } from '../../utils/format.js';
import type { CategoryBreakdown } from '../../services/types.js';

export class FinapDashboardCategories extends LitElement {
  static styles = [
    progressBarStyles,
    css`
      :host {
        display: block;
      }

      .head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--finap-space-3);
        margin-bottom: var(--finap-space-5);
      }

      .period {
        font-family: var(--finap-font-family);
        font-size: var(--finap-font-size-sm);
        color: var(--finap-color-text-muted);
      }

      .list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: var(--finap-space-5);
      }

      .row {
        display: grid;
        gap: var(--finap-space-2);
        font-family: var(--finap-font-family);
      }

      .row__head {
        display: flex;
        align-items: center;
        gap: var(--finap-space-2);
      }

      .dot {
        inline-size: 10px;
        block-size: 10px;
        flex: none;
        border-radius: var(--finap-radius-full);
        background-color: var(--c, var(--finap-color-accent));
      }

      .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--finap-font-size-lg);
        font-weight: var(--finap-font-weight-semibold);
        color: var(--finap-color-text);
      }

      .amount {
        font-weight: var(--finap-font-weight-semibold);
        color: var(--finap-color-text);
        font-variant-numeric: tabular-nums;
      }

      .row__bar {
        display: flex;
        align-items: center;
        gap: var(--finap-space-3);
      }

      .row__bar .finap-progress {
        flex: 1;
      }

      .pct {
        inline-size: 44px;
        text-align: right;
        font-size: var(--finap-font-size-sm);
        color: var(--finap-color-text-muted);
        font-variant-numeric: tabular-nums;
      }
    `,
  ];

  static properties = {
    categories: { type: Array },
  };

  categories: CategoryBreakdown[] = [];

  private _localize = new LocalizeController(this);

  render() {
    return html`
      <section class="categories">
        <div class="head">
          <finap-heading level="3">${this._localize.t('dashboard.byCategory')}</finap-heading>
          <span class="period">${this._localize.t('dashboard.thisMonth')}</span>
        </div>
        <ul class="list">
          ${this.categories.map(
            (category) => html`
              <li class="row">
                <div class="row__head">
                  <span class="dot" style="--c: ${category.color}"></span>
                  <span class="name">${category.name}</span>
                  <span class="amount">${formatCurrency(category.amount)}</span>
                </div>
                <div class="row__bar">
                  ${renderProgressBar({
                    percent: category.percentage,
                    color: category.color,
                    label: category.name,
                  })}
                  <span class="pct">${category.percentage}%</span>
                </div>
              </li>
            `,
          )}
        </ul>
      </section>
    `;
  }
}

customElements.define('finap-dashboard-categories', FinapDashboardCategories);

declare global {
  interface HTMLElementTagNameMap {
    'finap-dashboard-categories': FinapDashboardCategories;
  }
}
