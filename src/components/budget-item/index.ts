import { LitElement, html, css } from 'lit';

import '../progress/index.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';
import type { Budget, Category } from '../../services/types.js';

export class FinapBudgetItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .budget {
      display: grid;
      gap: var(--finap-space-2);
      padding: var(--finap-space-3) 0;
    }

    .head {
      display: flex;
      align-items: center;
      gap: var(--finap-space-2);
      font-family: var(--finap-font-family);
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
      font-weight: var(--finap-font-weight-semibold);
    }

    .amounts {
      color: var(--finap-color-text-muted);
      font-size: var(--finap-font-size-sm);
    }

    .meta {
      display: flex;
      justify-content: space-between;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .over {
      color: var(--finap-color-expense);
      font-weight: var(--finap-font-weight-semibold);
    }
  `;

  static properties = {
    budget: { type: Object },
    category: { type: Object },
  };

  budget: Budget | null = null;

  category: Category | null = null;

  private _localize = new LocalizeController(this);

  private get _percent(): number {
    if (!this.budget || this.budget.limit <= 0) return 0;
    return (this.budget.spent / this.budget.limit) * 100;
  }

  render() {
    if (!this.budget) return html`<div class="budget"></div>`;

    const over = this._percent > 100;
    return html`
      <div class="budget">
        <div class="head">
          <span
            class="dot"
            style="--c: ${this.category?.color ?? 'var(--finap-color-accent)'}"
          ></span>
          <span class="name">${this.category?.name ?? this.budget.categoryId}</span>
          <span class="amounts">
            ${formatCurrency(this.budget.spent)} /
            ${formatCurrency(this.budget.limit)}
          </span>
        </div>
        <finap-progress
          value=${this.budget.spent}
          max=${this.budget.limit}
        ></finap-progress>
        <div class="meta">
          <span>${formatPercent(this._percent)}</span>
          ${over
            ? html`<span class="over">${this._localize.t('budgets.over')}</span>`
            : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('finap-budget-item', FinapBudgetItem);

declare global {
  interface HTMLElementTagNameMap {
    'finap-budget-item': FinapBudgetItem;
  }
}
