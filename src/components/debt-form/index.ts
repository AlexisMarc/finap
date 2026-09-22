import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../button/index.js';
import type { Debt } from '../../services/types.js';

export interface DebtFormValue {
  name: string;
  total: number;
  paid?: number;
  dueDate?: string;
}

interface FormErrors {
  name?: string;
  total?: string;
}

export class FinapDebtForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: grid;
      gap: var(--finap-space-4);
    }

    .error {
      margin: 0;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-expense);
    }

    .error[hidden] {
      display: none;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--finap-space-3);
    }
  `;

  static properties = {
    debt: { type: Object },
    saving: { type: Boolean },
    error: { type: String },
    errors: { type: Object },
    name: { type: String },
    total: { type: String },
    paid: { type: String },
    dueDate: { type: String },
  };

  debt: Debt | null = null;

  saving = false;

  error = '';

  errors: FormErrors = {};

  name = '';

  total = '';

  paid = '';

  dueDate = '';

  willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('debt') && this.debt) {
      this.name = this.debt.name;
      this.total = String(this.debt.total);
      this.paid = String(this.debt.paid);
      this.dueDate = this.debt.dueDate ?? '';
    }
  }

  private _onName(event: Event): void {
    this.name = (event as CustomEvent<string>).detail;
  }

  private _onTotal(event: Event): void {
    this.total = (event as CustomEvent<string>).detail;
  }

  private _onPaid(event: Event): void {
    this.paid = (event as CustomEvent<string>).detail;
  }

  private _onDueDate(event: Event): void {
    this.dueDate = (event as CustomEvent<string>).detail;
  }

  private _cancel(): void {
    this.dispatchEvent(
      new CustomEvent('finap-cancel', { bubbles: true, composed: true }),
    );
  }

  private _submit(): void {
    const total = Number(this.total);
    const errors: FormErrors = {};
    if (!this.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!this.total || Number.isNaN(total) || total <= 0) {
      errors.total = 'Introduce un importe válido';
    }
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }
    this.errors = {};
    this.dispatchEvent(
      new CustomEvent<DebtFormValue>('finap-save', {
        detail: {
          name: this.name.trim(),
          total,
          paid: this.paid ? Number(this.paid) : 0,
          dueDate: this.dueDate || undefined,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="form">
        <finap-input
          label="Nombre"
          type="text"
          .value=${this.name}
          error=${this.errors.name ?? ''}
          @finap-input=${this._onName}
        ></finap-input>
        <finap-input
          label="Importe total"
          type="number"
          placeholder="0.00"
          .value=${this.total}
          error=${this.errors.total ?? ''}
          @finap-input=${this._onTotal}
        ></finap-input>
        <finap-input
          label="Importe pagado"
          type="number"
          placeholder="0.00"
          .value=${this.paid}
          @finap-input=${this._onPaid}
        ></finap-input>
        <finap-input
          label="Fecha límite (opcional)"
          type="date"
          .value=${this.dueDate}
          @finap-input=${this._onDueDate}
        ></finap-input>
        <p class="error" ?hidden=${!this.error}>${this.error}</p>
        <div class="actions">
          <finap-button variant="secondary" @click=${this._cancel}>
            Cancelar
          </finap-button>
          <finap-button ?disabled=${this.saving} @click=${this._submit}>
            ${this.saving ? 'Guardando…' : 'Guardar'}
          </finap-button>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-debt-form', FinapDebtForm);

declare global {
  interface HTMLElementTagNameMap {
    'finap-debt-form': FinapDebtForm;
  }
}
