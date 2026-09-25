import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/table/elements.js';
import '@spectrum-web-components/badge/sp-badge.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatDate } from '../../utils/format.js';
import type { Category, Transaction } from '../../services/types.js';

const MOBILE_QUERY = '(max-width: 767px)';

export class FinapMovementsList extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }

    sp-table {
      width: 100%;
    }

    .table-wrap {
      overflow-x: auto;
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
      flex-wrap: wrap;
      gap: var(--finap-space-1);
    }

    .badges sp-badge,
    .card__meta sp-badge {
      --mod-badge-height: 18px;
      --mod-badge-font-size: var(--finap-font-size-xs);
      --mod-badge-label-spacing-vertical-top: 0;
      --mod-badge-label-spacing-vertical-bottom: 0;
      --mod-badge-label-spacing-horizontal: var(--finap-space-2);
      --mod-badge-corner-radius: var(--finap-radius-full);
    }

    .actions {
      display: flex;
      gap: var(--finap-space-1);
    }

    .cards {
      display: grid;
      gap: var(--finap-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .card {
      display: grid;
      gap: var(--finap-space-2);
      padding: var(--finap-space-3);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-md);
    }

    .card__row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--finap-space-3);
    }

    .card__detail {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: var(--finap-font-family);
      font-weight: var(--finap-font-weight-semibold);
      color: var(--finap-color-text);
    }

    .card__amount {
      white-space: nowrap;
      font-family: var(--finap-font-family);
      font-weight: var(--finap-font-weight-semibold);
    }

    .card__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--finap-space-2);
    }

    .card__date {
      margin-left: auto;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .card__actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--finap-space-2);
    }
  `;

  static properties = {
    transactions: { type: Array },
    categories: { type: Array },
  };

  transactions: Transaction[] = [];

  categories: Category[] = [];

  private _localize = new LocalizeController(this);

  private _media: MediaQueryList | null = null;

  private _isMobile = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined' && window.matchMedia) {
      this._media = window.matchMedia(MOBILE_QUERY);
      this._isMobile = this._media.matches;
      this._media.addEventListener('change', this._onMediaChange);
    }
  }

  disconnectedCallback(): void {
    this._media?.removeEventListener('change', this._onMediaChange);
    super.disconnectedCallback();
  }

  private _onMediaChange = (event: MediaQueryListEvent): void => {
    this._isMobile = event.matches;
  };

  private _categoryName(id: string): string {
    return this.categories.find((category) => category.id === id)?.name ?? id;
  }

  private _detail(transaction: Transaction): string {
    return transaction.note ?? this._categoryName(transaction.categoryId);
  }

  private _tone(transaction: Transaction): 'income' | 'expense' {
    return transaction.type === 'income' ? 'income' : 'expense';
  }

  private _amount(transaction: Transaction): string {
    return `${transaction.type === 'income' ? '+' : '-'}${formatCurrency(
      transaction.amount,
    )}`;
  }

  private _typeLabel(transaction: Transaction, t: (key: string) => string): string {
    return transaction.type === 'income'
      ? t('movements.filter.income')
      : t('movements.filter.expense');
  }

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

  private _actions(transaction: Transaction, t: (key: string) => string) {
    return html`
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
    `;
  }

  private _table(transactions: Transaction[], t: (key: string) => string) {
    return html`
      <div class="table-wrap">
        <sp-table>
          <sp-table-head>
            <sp-table-head-cell>${t('movements.col.date')}</sp-table-head-cell>
            <sp-table-head-cell>${t('movements.col.detail')}</sp-table-head-cell>
            <sp-table-head-cell>${t('movements.col.amount')}</sp-table-head-cell>
            <sp-table-head-cell>${t('common.actions')}</sp-table-head-cell>
          </sp-table-head>
          <sp-table-body>
            ${transactions.map(
              (transaction) => html`
                <sp-table-row>
                  <sp-table-cell>${formatDate(transaction.date)}</sp-table-cell>
                  <sp-table-cell>
                    <div class="detail">
                      <span>${this._detail(transaction)}</span>
                      <span class="badges">
                        <sp-badge size="s"
                          >${this._categoryName(
                            transaction.categoryId,
                          )}</sp-badge
                        >
                        <sp-badge
                          size="s"
                          variant=${transaction.type === 'income'
                            ? 'positive'
                            : 'negative'}
                        >
                          ${this._typeLabel(transaction, t)}
                        </sp-badge>
                      </span>
                    </div>
                  </sp-table-cell>
                  <sp-table-cell class="amount--${this._tone(transaction)}">
                    ${this._amount(transaction)}
                  </sp-table-cell>
                  <sp-table-cell>
                    <div class="actions">${this._actions(transaction, t)}</div>
                  </sp-table-cell>
                </sp-table-row>
              `,
            )}
          </sp-table-body>
        </sp-table>
      </div>
    `;
  }

  private _cards(transactions: Transaction[], t: (key: string) => string) {
    return html`
      <ul class="cards">
        ${transactions.map(
          (transaction) => html`
            <li class="card">
              <div class="card__row">
                <span class="card__detail">${this._detail(transaction)}</span>
                <span class="card__amount amount--${this._tone(transaction)}"
                  >${this._amount(transaction)}</span
                >
              </div>
              <div class="card__meta">
                <sp-badge size="s"
                  >${this._categoryName(transaction.categoryId)}</sp-badge
                >
                <sp-badge
                  size="s"
                  variant=${transaction.type === 'income'
                    ? 'positive'
                    : 'negative'}
                >
                  ${this._typeLabel(transaction, t)}
                </sp-badge>
                <span class="card__date">${formatDate(transaction.date)}</span>
              </div>
              <div class="card__actions">${this._actions(transaction, t)}</div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return this._isMobile
      ? this._cards(this.transactions, t)
      : this._table(this.transactions, t);
  }
}

customElements.define('finap-movements-list', FinapMovementsList);

declare global {
  interface HTMLElementTagNameMap {
    'finap-movements-list': FinapMovementsList;
  }
}
