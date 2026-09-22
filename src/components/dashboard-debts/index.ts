import { LitElement, html, css } from 'lit';

import '../heading/index.js';
import '../list-item/index.js';
import '../progress/index.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency } from '../../utils/format.js';
import type { Debt } from '../../services/types.js';

export class FinapDashboardDebts extends LitElement {
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

    .pending {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .debt {
      padding: var(--finap-space-2) 0;
    }
  `;

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
              <finap-list-item
                title=${debt.name}
                subtitle=${`${formatCurrency(debt.total - debt.paid)} ${t('dashboard.pending')}`}
              ></finap-list-item>
              <finap-progress
                value=${debt.paid}
                max=${debt.total}
              ></finap-progress>
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
