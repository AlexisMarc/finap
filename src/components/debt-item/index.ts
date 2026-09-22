import { LitElement, html, css } from 'lit';

import '../progress/index.js';
import '../button/index.js';
import { formatCurrency, formatPercent, formatDate } from '../../utils/format.js';
import type { Debt } from '../../services/types.js';

export class FinapDebtItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .debt {
      display: grid;
      gap: var(--finap-space-2);
      padding: var(--finap-space-4) 0;
      border-top: 1px solid var(--finap-color-border);
    }

    .head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--finap-space-3);
      font-family: var(--finap-font-family);
    }

    .name {
      color: var(--finap-color-text);
      font-weight: var(--finap-font-weight-semibold);
    }

    .pending {
      color: var(--finap-color-text-muted);
      font-size: var(--finap-font-size-sm);
    }

    .meta {
      display: flex;
      gap: var(--finap-space-3);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .done {
      color: var(--finap-color-income);
      font-weight: var(--finap-font-weight-semibold);
    }

    .actions {
      display: flex;
      gap: var(--finap-space-1);
    }
  `;

  static properties = {
    debt: { type: Object },
  };

  debt: Debt | null = null;

  private get _pending(): number {
    return this.debt ? Math.max(this.debt.total - this.debt.paid, 0) : 0;
  }

  private get _percent(): number {
    if (!this.debt || this.debt.total <= 0) return 0;
    return (this.debt.paid / this.debt.total) * 100;
  }

  private _emit(name: string, debt: Debt): void {
    this.dispatchEvent(
      new CustomEvent(name, { detail: debt, bubbles: true, composed: true }),
    );
  }

  render() {
    if (!this.debt) return html`<div class="debt"></div>`;
    const done = this.debt.paid >= this.debt.total;

    return html`
      <div class="debt">
        <div class="head">
          <span class="name">${this.debt.name}</span>
          <span class="pending">${formatCurrency(this._pending)} pendiente</span>
        </div>
        <finap-progress
          value=${this.debt.paid}
          max=${this.debt.total}
        ></finap-progress>
        <div class="meta">
          <span>${formatPercent(this._percent)}</span>
          ${this.debt.dueDate
            ? html`<span class="due">Vence ${formatDate(this.debt.dueDate)}</span>`
            : ''}
          ${done ? html`<span class="done">Pagada</span>` : ''}
        </div>
        <div class="actions">
          <finap-button
            variant="text"
            @click=${() => this._emit('finap-pay', this.debt as Debt)}
          >
            Registrar pago
          </finap-button>
          <finap-button
            variant="text"
            @click=${() => this._emit('finap-edit', this.debt as Debt)}
          >
            Editar
          </finap-button>
          <finap-button
            variant="text"
            @click=${() => this._emit('finap-delete', this.debt as Debt)}
          >
            Eliminar
          </finap-button>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-debt-item', FinapDebtItem);

declare global {
  interface HTMLElementTagNameMap {
    'finap-debt-item': FinapDebtItem;
  }
}
