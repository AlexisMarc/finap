import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/table/elements.js';
import '@spectrum-web-components/badge/sp-badge.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatDate } from '../../utils/format.js';
import type { Transaction } from '../../services/types.js';

export class FinapMovementsList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    sp-table {
      width: 100%;
    }

    .amount--income {
      color: var(--finap-color-income);
    }

    .amount--expense {
      color: var(--finap-color-expense);
    }

    .detail {
      display: grid;
      gap: var(--finap-space-1);
    }

    .badges {
      display: flex;
      gap: var(--finap-space-1);
    }

    .actions {
      display: flex;
      gap: var(--finap-space-1);
    }
  `;

  static properties = {
    transactions: { type: Array },
  };

  transactions: Transaction[] = [];

  private _localize = new LocalizeController(this);

  private _edit(transaction: Transaction): void {
    this.dispatchEvent(
      new CustomEvent('finap-edit', {
        detail: transaction,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _delete(transaction: Transaction): void {
    this.dispatchEvent(
      new CustomEvent('finap-delete', {
        detail: transaction,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return html`
      <sp-table>
        <sp-table-head>
          <sp-table-head-cell>${t('movements.col.date')}</sp-table-head-cell>
          <sp-table-head-cell>${t('movements.col.detail')}</sp-table-head-cell>
          <sp-table-head-cell>${t('movements.col.amount')}</sp-table-head-cell>
          <sp-table-head-cell>${t('common.actions')}</sp-table-head-cell>
        </sp-table-head>
        <sp-table-body>
          ${this.transactions.map(
            (transaction) => html`
              <sp-table-row>
                <sp-table-cell>${formatDate(transaction.date)}</sp-table-cell>
                <sp-table-cell>
                  <div class="detail">
                    <span
                      >${transaction.note ?? transaction.categoryId}</span
                    >
                    <span class="badges">
                      <sp-badge>${transaction.categoryId}</sp-badge>
                      <sp-badge
                        variant=${transaction.type === 'income'
                          ? 'positive'
                          : 'negative'}
                      >
                        ${transaction.type === 'income'
                          ? t('movements.filter.income')
                          : t('movements.filter.expense')}
                      </sp-badge>
                    </span>
                  </div>
                </sp-table-cell>
                <sp-table-cell
                  class="amount--${transaction.type === 'income'
                    ? 'income'
                    : 'expense'}"
                >
                  ${`${transaction.type === 'income' ? '+' : '-'}${formatCurrency(
                    transaction.amount,
                  )}`}
                </sp-table-cell>
                <sp-table-cell>
                  <div class="actions">
                    <sp-button
                      variant="secondary"
                      treatment="outline"
                      @click=${() => this._edit(transaction)}
                    >
                      ${t('common.edit')}
                    </sp-button>
                    <sp-button
                      variant="negative"
                      treatment="outline"
                      @click=${() => this._delete(transaction)}
                    >
                      ${t('common.delete')}
                    </sp-button>
                  </div>
                </sp-table-cell>
              </sp-table-row>
            `,
          )}
        </sp-table-body>
      </sp-table>
    `;
  }
}

customElements.define('finap-movements-list', FinapMovementsList);

declare global {
  interface HTMLElementTagNameMap {
    'finap-movements-list': FinapMovementsList;
  }
}
