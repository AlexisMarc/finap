import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../heading/index.js';
import { dataRowStyles, renderDataRow } from '../data-row.js';
import '@spectrum-web-components/meter/sp-meter.js';
import { progressPercent, progressVariant } from '../../utils/progress.js';
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

      .more {
        display: inline-block;
        margin-top: var(--finap-space-2);
        font-family: var(--finap-font-family);
        font-size: var(--finap-font-size-sm);
        color: var(--finap-color-accent-interactive);
      }
    `,
  ];

  static properties = {
    debts: { type: Array },
  };

  debts: Debt[] = [];

  limit = 3;

  private _localize = new LocalizeController(this);

  private get _pending(): number {
    return this.debts.reduce((sum, debt) => sum + (debt.total - debt.paid), 0);
  }

  private get _visible(): Debt[] {
    return this.debts.slice(0, this.limit);
  }

  private _goAll(event: Event): void {
    event.preventDefault();
    navigate('debts');
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
        ${this._visible.map(
          (debt) => html`
            <div class="debt">
              ${renderDataRow({
                title: debt.name,
                subtitle: `${formatCurrency(debt.total - debt.paid)} ${t('dashboard.pending')}`,
              })}
              <sp-meter
                .value=${progressPercent(debt.paid, debt.total)}
                variant=${progressVariant(
                  progressPercent(debt.paid, debt.total),
                )}
              ></sp-meter>
            </div>
          `,
        )}
        ${this.debts.length > this.limit
          ? html`<a class="more" href="/debts" @click=${this._goAll}>
              ${t('dashboard.seeAll')}
            </a>`
          : ''}
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
