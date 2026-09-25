import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../heading/index.js';
import { finapIcon } from '../icons.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/table/elements.js';
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
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-1);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
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
    const t = (key: string) => this._localize.t(key);
    return html`
      <section class="recent">
        <div class="head">
          <finap-heading level="3">${t('dashboard.recent')}</finap-heading>
          <sp-link class="more" href="/movements" @click=${this._goAll}>
            ${t('dashboard.seeAll')} ${finapIcon('chevron-right', 14)}
          </sp-link>
        </div>
        <sp-table>
          <sp-table-head>
            <sp-table-head-cell>${t('movements.col.detail')}</sp-table-head-cell>
            <sp-table-head-cell>${t('movements.col.date')}</sp-table-head-cell>
            <sp-table-head-cell>${t('movements.col.amount')}</sp-table-head-cell>
          </sp-table-head>
          <sp-table-body>
            ${this.transactions.map(
              (transaction) => html`
                <sp-table-row>
                  <sp-table-cell
                    >${transaction.note ?? transaction.categoryId}</sp-table-cell
                  >
                  <sp-table-cell
                    >${formatRelativeDate(transaction.date)}</sp-table-cell
                  >
                  <sp-table-cell
                    class="amount--${transaction.type === 'income'
                      ? 'income'
                      : 'expense'}"
                  >
                    ${`${transaction.type === 'income' ? '+' : '-'}${formatCurrency(
                      transaction.amount,
                    )}`}
                  </sp-table-cell>
                </sp-table-row>
              `,
            )}
          </sp-table-body>
        </sp-table>
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
