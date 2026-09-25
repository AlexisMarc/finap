import { LitElement, html, css } from 'lit';

import '../heading/index.js';
import { dataRowStyles, renderDataRow } from '../data-row.js';
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { progressPercent, isOver } from '../../utils/progress.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency } from '../../utils/format.js';
import type { Debt } from '../../services/types.js';

export class FinapDashboardDebts extends LitElement {
  static styles = [
    dataRowStyles,
    css`
      :host {
        display: block;
      }

      .head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: var(--finap-space-3);
      }

      .pending {
        font-family: var(--finap-font-family);
        font-size: var(--finap-font-size-sm);
        color: var(--finap-color-text-muted);
      }

      .debt {
        padding: var(--finap-space-2) 0;
      }
    `,
  ];

  static properties = {
    debts: { type: Array },
  };

  debts: Debt[] = [];

  private _localize = new LocalizeController(this);

  private get _pending(): number {
    return this.debts.reduce((sum, debt) => sum + (debt.total - debt.paid), 0);
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return html`
      <section class="debts">
        <div class="head">
          <finap-heading level="3">${t('dashboard.debt')}</finap-heading>
          <span class="pending">
            ${formatCurrency(this._pending)} ${t('dashboard.pending')}
          </span>
        </div>
        ${this.debts.map(
          (debt) => html`
            <div class="debt">
              ${renderDataRow({
                title: debt.name,
                subtitle: `${formatCurrency(debt.total - debt.paid)} ${t('dashboard.pending')}`,
              })}
              <sp-progress-bar
                .progress=${progressPercent(debt.paid, debt.total)}
                ?over=${isOver(debt.paid, debt.total)}
              ></sp-progress-bar>
            </div>
          `,
        )}
      </section>
    `;
  }
}

customElements.define('finap-dashboard-debts', FinapDashboardDebts);

declare global {
  interface HTMLElementTagNameMap {
    'finap-dashboard-debts': FinapDashboardDebts;
  }
}
