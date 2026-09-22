import { LitElement, html, css } from 'lit';

import '../list-item/index.js';
import '../button/index.js';
import { formatCurrency, formatDate } from '../../utils/format.js';
import type { Transaction } from '../../services/types.js';

export class FinapMovementsList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .list {
      display: grid;
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--finap-space-2);
    }

    .row finap-list-item {
      flex: 1;
      min-width: 0;
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
    return html`
      <div class="list">
        ${this.transactions.map(
          (transaction) => html`
            <div class="row">
              <finap-list-item
                title=${transaction.note ?? transaction.categoryId}
                subtitle=${formatDate(transaction.date)}
                value=${`${transaction.type === 'income' ? '+' : '-'}${formatCurrency(
                  transaction.amount,
                )}`}
                tone=${transaction.type === 'income' ? 'income' : 'expense'}
              ></finap-list-item>
              <div class="actions">
                <finap-button
                  variant="text"
                  @click=${() => this._edit(transaction)}
                >
                  Editar
                </finap-button>
                <finap-button
                  variant="text"
                  @click=${() => this._delete(transaction)}
                >
                  Eliminar
                </finap-button>
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define('finap-movements-list', FinapMovementsList);

declare global {
  interface HTMLElementTagNameMap {
    'finap-movements-list': FinapMovementsList;
  }
}
