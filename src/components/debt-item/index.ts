import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import '@spectrum-web-components/badge/sp-badge.js';
import { progressPercent, isOver } from '../../utils/progress.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatPercent, formatDate } from '../../utils/format.js';
import type { Debt } from '../../services/types.js';

export class FinapDebtItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .debt {
      display: grid;
      gap: var(--finap-space-2);
      padding: var(--finap-space-4) 0;
      border-top: 1px solid var(--finap-color-border);
    }

    .head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--finap-space-3);
      font-family: var(--finap-font-family);
    }

    .name {
      color: var(--finap-color-text);
      font-weight: var(--finap-font-weight-semibold);
    }

    .pending {
      color: var(--finap-color-text-muted);
      font-size: var(--finap-font-size-sm);
    }

    .meta {
      display: flex;
      gap: var(--finap-space-3);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .done {
      color: var(--finap-color-income);
      font-weight: var(--finap-font-weight-semibold);
    }

    .actions {
      display: flex;
      gap: var(--finap-space-1);
    }
  `;

  static properties = {
    debt: { type: Object },
  };

  debt: Debt | null = null;

  private _localize = new LocalizeController(this);

  private get _pending(): number {
    return this.debt ? Math.max(this.debt.total - this.debt.paid, 0) : 0;
  }

  private get _percent(): number {
    if (!this.debt || this.debt.total <= 0) return 0;
    return (this.debt.paid / this.debt.total) * 100;
  }

  private _emit(name: string, debt: Debt): void {
    this.dispatchEvent(
      new CustomEvent(name, { detail: debt, bubbles: true, composed: true }),
    );
  }

  render() {
    if (!this.debt) return html`<div class="debt"></div>`;
    const done = this.debt.paid >= this.debt.total;
    const t = (key: string) => this._localize.t(key);

    return html`
      <div class="debt">
        <div class="head">
          <span class="name">${this.debt.name}</span>
          <span class="pending">
            ${formatCurrency(this._pending)} ${t('debts.pending')}
          </span>
        </div>
        <sp-progress-bar
          .progress=${progressPercent(this.debt.paid, this.debt.total)}
          ?over=${isOver(this.debt.paid, this.debt.total)}
        ></sp-progress-bar>
        <div class="meta">
          <span>${formatPercent(this._percent)}</span>
          ${this.debt.dueDate
            ? html`<span class="due">${t('debts.due')} ${formatDate(this.debt.dueDate)}</span>`
            : ''}
          ${done
            ? html`<sp-badge variant="positive">${t('debts.paid')}</sp-badge>`
            : ''}
        </div>
        <div class="actions">
          <sp-button
            variant="secondary" treatment="outline"
            @click=${() => this._emit('finap-pay', this.debt as Debt)}
          >
            ${t('debts.pay')}
          </sp-button>
          <sp-button
            variant="secondary" treatment="outline"
            @click=${() => this._emit('finap-edit', this.debt as Debt)}
          >
            ${t('common.edit')}
          </sp-button>
          <sp-button
            variant="secondary" treatment="outline"
            @click=${() => this._emit('finap-delete', this.debt as Debt)}
          >
            ${t('common.delete')}
          </sp-button>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-debt-item', FinapDebtItem);

declare global {
  interface HTMLElementTagNameMap {
    'finap-debt-item': FinapDebtItem;
  }
}
