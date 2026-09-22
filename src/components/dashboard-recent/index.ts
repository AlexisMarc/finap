import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../heading/index.js';
import '../list-item/index.js';
import { formatCurrency, formatRelativeDate } from '../../utils/format.js';
import type { Transaction } from '../../services/types.js';

export class FinapDashboardRecent extends LitElement {
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

    .more {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-primary);
      text-decoration: none;
    }
  `;

  static properties = {
    transactions: { type: Array },
  };

  transactions: Transaction[] = [];

  private _goAll(event: Event): void {
    event.preventDefault();
    navigate('movements');
  }

  render() {
    return html`
      <section class="recent">
        <div class="head">
          <finap-heading level="3">Últimos movimientos</finap-heading>
          <a class="more" href="#/movements" @click=${this._goAll}>Ver todos →</a>
        </div>
        ${this.transactions.map(
          (transaction) => html`
            <finap-list-item
              title=${transaction.note ?? transaction.categoryId}
              subtitle=${formatRelativeDate(transaction.date)}
              value=${`${transaction.type === 'income' ? '+' : '-'}${formatCurrency(
                transaction.amount,
              )}`}
              tone=${transaction.type === 'income' ? 'income' : 'expense'}
            ></finap-list-item>
          `,
        )}
      </section>
    `;
  }
}

customElements.define('finap-dashboard-recent', FinapDashboardRecent);

declare global {
  interface HTMLElementTagNameMap {
    'finap-dashboard-recent': FinapDashboardRecent;
  }
}
