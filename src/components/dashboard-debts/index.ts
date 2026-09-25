import { LitElement, html, css } from 'lit';
import { navigate } from '@open-cells/core';

import '../heading/index.js';
import { finapIcon } from '../icons.js';
import '@spectrum-web-components/link/sp-link.js';
import { progressBarStyles, renderProgressBar } from '../progress-bar.js';
import { progressPercent, progressVariant } from '../../utils/progress.js';
import { LocalizeController } from '../../i18n/localize.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';
import type { Debt } from '../../services/types.js';

export class FinapDashboardDebts extends LitElement {
  static styles = [
    progressBarStyles,
    css`
      :host {
        display: block;
      }

      .head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--finap-space-3);
        margin-bottom: var(--finap-space-5);
      }

      .pending {
        font-family: var(--finap-font-family);
        font-size: var(--finap-font-size-sm);
        color: var(--finap-color-text-muted);
      }

      .list {
        display: grid;
        gap: var(--finap-space-5);
      }

      .debt {
        display: grid;
        gap: var(--finap-space-2);
        font-family: var(--finap-font-family);
      }

      .debt__head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--finap-space-3);
      }

      .debt__name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--finap-font-size-lg);
        font-weight: var(--finap-font-weight-semibold);
        color: var(--finap-color-text);
      }

      .debt__pct {
        font-weight: var(--finap-font-weight-semibold);
        color: var(--finap-color-text);
        font-variant-numeric: tabular-nums;
      }

      .debt__pending {
        font-size: var(--finap-font-size-sm);
        color: var(--finap-color-text-muted);
      }

      .more {
        display: inline-flex;
        align-items: center;
        gap: var(--finap-space-1);
        margin-top: var(--finap-space-5);
        font-size: var(--finap-font-size-sm);
        font-weight: var(--finap-font-weight-semibold);
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
        <div class="list">
          ${this._visible.map((debt) => {
            const percent = progressPercent(debt.paid, debt.total);
            return html`
              <div class="debt">
                <div class="debt__head">
                  <span class="debt__name">${debt.name}</span>
                  <span class="debt__pct">${formatPercent(percent)}</span>
                </div>
                ${renderProgressBar({
                  percent,
                  variant: progressVariant(percent),
                  label: debt.name,
                })}
                <span class="debt__pending">
                  ${formatCurrency(debt.total - debt.paid)} ${t('dashboard.pending')}
                </span>
              </div>
            `;
          })}
        </div>
        ${this.debts.length > this.limit
          ? html`<sp-link class="more" href="/debts" @click=${this._goAll}>
              ${t('dashboard.seeAll')} ${finapIcon('chevron-right', 14)}
            </sp-link>`
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
