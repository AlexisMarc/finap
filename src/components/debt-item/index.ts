import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/status-light/sp-status-light.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { progressBarStyles, renderProgressBar } from '../progress-bar.js';
import { progressPercent, progressVariant } from '../../utils/progress.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatPercent, formatDate } from '../../utils/format.js';
import type { Debt } from '../../services/types.js';

export class FinapDebtItem extends LitElement {
  static styles = [
    progressBarStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }

      .debt {
        display: grid;
        gap: var(--finap-space-2);
        padding: var(--finap-space-4) 0;
        border-top: 1px solid var(--finap-color-border);
        min-width: 0;
      }

      .head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--finap-space-3);
        font-family: var(--finap-font-family);
      }

      .name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--finap-color-text);
        font-weight: var(--finap-font-weight-semibold);
      }

      .pending {
        flex: none;
        color: var(--finap-color-text-muted);
        font-size: var(--finap-font-size-sm);
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
    `,
  ];

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

  private _onAction = (event: Event): void => {
    if (!this.debt) return;
    const value = (event.target as { value?: string }).value;
    const name =
      value === 'pay'
        ? 'finap-pay'
        : value === 'edit'
          ? 'finap-edit'
          : value === 'delete'
            ? 'finap-delete'
            : '';
    if (name) this._emit(name, this.debt);
  };

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
        ${renderProgressBar({
          percent: progressPercent(this.debt.paid, this.debt.total),
          variant: progressVariant(
            progressPercent(this.debt.paid, this.debt.total),
          ),
          label: this.debt.name,
        })}
        <div class="meta">
          <span>${formatPercent(this._percent)}</span>
          ${this.debt.dueDate
            ? html`<span class="due">${t('debts.due')} ${formatDate(this.debt.dueDate)}</span>`
            : ''}
          ${done ? html`<sp-status-light variant="positive"
                >${t('debts.paid')}</sp-status-light
              >` : html`<sp-status-light variant="notice"
                >${t('debts.pending')}</sp-status-light
              >`}
        </div>
        <div class="actions">
          <sp-action-menu
            label=${t('common.actions')}
            @change=${this._onAction}
          >
            <sp-menu-item value="pay">${t('debts.pay')}</sp-menu-item>
            <sp-menu-item value="edit">${t('common.edit')}</sp-menu-item>
            <sp-menu-item value="delete">${t('common.delete')}</sp-menu-item>
          </sp-action-menu>
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
