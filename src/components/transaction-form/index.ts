import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../select/index.js';
import '../chip/index.js';
import '../button/index.js';
import type {
  Category,
  Transaction,
  TransactionType,
} from '../../services/types.js';

export interface TransactionFormValue {
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
}

interface FormErrors {
  amount?: string;
  categoryId?: string;
  date?: string;
}

const TYPE_OPTIONS: Array<{ id: TransactionType; label: string }> = [
  { id: 'expense', label: 'Gasto' },
  { id: 'income', label: 'Ingreso' },
  { id: 'debt', label: 'Deuda' },
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export class FinapTransactionForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: grid;
      gap: var(--finap-space-4);
    }

    .types {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-2);
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
    categories: { type: Array },
    transaction: { type: Object },
    saving: { type: Boolean },
    error: { type: String },
    errors: { type: Object },
    type: { type: String },
    amount: { type: String },
    categoryId: { type: String },
    date: { type: String },
    note: { type: String },
  };

  categories: Category[] = [];

  transaction: Transaction | null = null;

  saving = false;

  error = '';

  errors: FormErrors = {};

  type: TransactionType = 'expense';

  amount = '';

  categoryId = '';

  date = today();

  note = '';

  willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('transaction') && this.transaction) {
      this.type = this.transaction.type;
      this.amount = String(this.transaction.amount);
      this.categoryId = this.transaction.categoryId;
      this.date = this.transaction.date;
      this.note = this.transaction.note ?? '';
    }
  }

  private _onAmount(event: Event): void {
    this.amount = (event as CustomEvent<string>).detail;
  }

  private _onCategory(event: Event): void {
    this.categoryId = (event as CustomEvent<string>).detail;
  }

  private _onDate(event: Event): void {
    this.date = (event as CustomEvent<string>).detail;
  }

  private _onNote(event: Event): void {
    this.note = (event as CustomEvent<string>).detail;
  }

  private get _categoryOptions() {
    return this.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }

  private _cancel(): void {
    this.dispatchEvent(
      new CustomEvent('finap-cancel', { bubbles: true, composed: true }),
    );
  }

  private _submit(): void {
    const amount = Number(this.amount);
    const errors: FormErrors = {};
    if (!this.amount || Number.isNaN(amount) || amount <= 0) {
      errors.amount = 'Introduce un importe válido';
    }
    if (!this.categoryId) errors.categoryId = 'Selecciona una categoría';
    if (!this.date) errors.date = 'Selecciona una fecha';

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }

    this.errors = {};
    this.dispatchEvent(
      new CustomEvent<TransactionFormValue>('finap-save', {
        detail: {
          type: this.type,
          amount,
          categoryId: this.categoryId,
          date: this.date,
          note: this.note || undefined,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="form">
        <div class="types">
          ${TYPE_OPTIONS.map(
            (option) => html`
              <finap-chip
                clickable
                ?selected=${this.type === option.id}
                @click=${() => (this.type = option.id)}
              >
                ${option.label}
              </finap-chip>
            `,
          )}
        </div>
        <finap-input
          label="Importe"
          type="number"
          placeholder="0.00"
          .value=${this.amount}
          error=${this.errors.amount ?? ''}
          @finap-input=${this._onAmount}
        ></finap-input>
        <finap-select
          label="Categoría"
          .value=${this.categoryId}
          .options=${this._categoryOptions}
          error=${this.errors.categoryId ?? ''}
          @finap-change=${this._onCategory}
        ></finap-select>
        <finap-input
          label="Fecha"
          type="date"
          .value=${this.date}
          error=${this.errors.date ?? ''}
          @finap-input=${this._onDate}
        ></finap-input>
        <finap-input
          label="Nota (opcional)"
          type="textarea"
          .value=${this.note}
          @finap-input=${this._onNote}
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

customElements.define('finap-transaction-form', FinapTransactionForm);

declare global {
  interface HTMLElementTagNameMap {
    'finap-transaction-form': FinapTransactionForm;
  }
}
