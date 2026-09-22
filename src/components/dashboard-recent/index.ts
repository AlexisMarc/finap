import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../heading/index.js';
import '../list-item/index.js';
import { LocalizeController } from '../../i18n/localize.js';
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

  private _localize = new LocalizeController(this);

  private _goAll(event: Event): void {
    event.preventDefault();
    navigate('movements');
  }

  render() {
    return html`
      <section class="recent">
        <div class="head">
          <finap-heading level="3">${this._localize.t('dashboard.recent')}</finap-heading>
          <a class="more" href="/movements" @click=${this._goAll}>
            ${this._localize.t('dashboard.seeAll')}
          </a>
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
