import { LitElement, html, css } from 'lit';

import '../heading/index.js';
import { formatCurrency } from '../../utils/format.js';
import type { CategoryBreakdown } from '../../services/types.js';

export class FinapDashboardCategories extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: var(--finap-space-3);
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
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--finap-space-3);
      padding: var(--finap-space-2) 0;
      font-family: var(--finap-font-family);
      border-top: 1px solid var(--finap-color-border);
    }

    .dot {
      width: 10px;
      height: 10px;
      flex: none;
      border-radius: var(--finap-radius-full);
      background-color: var(--c, var(--finap-color-accent));
    }

    .name {
      flex: 1;
      color: var(--finap-color-text);
    }

    .amount {
      color: var(--finap-color-text-muted);
    }

    .pct {
      width: 48px;
      text-align: right;
      font-weight: var(--finap-font-weight-semibold);
      color: var(--finap-color-text);
    }
  `;

  static properties = {
    categories: { type: Array },
  };

  categories: CategoryBreakdown[] = [];

  render() {
    return html`
      <section class="categories">
        <div class="head">
          <finap-heading level="3">Gastos por categoría</finap-heading>
          <span class="period">Este mes</span>
        </div>
        <ul class="list">
          ${this.categories.map(
            (category) => html`
              <li class="row">
                <span class="dot" style="--c: ${category.color}"></span>
                <span class="name">${category.name}</span>
                <span class="amount">${formatCurrency(category.amount)}</span>
                <span class="pct">${category.percentage}%</span>
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
