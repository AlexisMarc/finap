import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../select/index.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { LocalizeController } from '../../i18n/localize.js';
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

const TYPE_OPTIONS: Array<{ id: TransactionType; labelKey: string }> = [
  { id: 'expense', labelKey: 'transactions.type.expense' },
  { id: 'income', labelKey: 'transactions.type.income' },
  { id: 'debt', labelKey: 'transactions.type.debt' },
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export class FinapTransactionForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    sp-action-group {
      flex-wrap: wrap;
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

  private _localize = new LocalizeController(this);

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

  private _onType(event: Event): void {
    const target = event.target as { value?: string; selected?: string[] };
    const value = target.value ?? target.selected?.[0] ?? 'expense';
    this.type = value as TransactionType;
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
      errors.amount = this._localize.t('transactions.error.amount');
    }
    if (!this.categoryId) {
      errors.categoryId = this._localize.t('transactions.error.category');
    }
    if (!this.date) errors.date = this._localize.t('transactions.error.date');

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
    const t = (key: string) => this._localize.t(key);
    return html`
      <div class="form">
        <div class="types">
          <sp-action-group selects="single" @change=${this._onType}>
            ${TYPE_OPTIONS.map(
              (option) => html`
                <sp-action-button
                  value=${option.id}
                  ?selected=${this.type === option.id}
                >
                  ${t(option.labelKey)}
                </sp-action-button>
              `,
            )}
          </sp-action-group>
        </div>
        <finap-input
          label=${t('transactions.amount')}
          type="number"
          placeholder="0.00"
          .value=${this.amount}
          error=${this.errors.amount ?? ''}
          @finap-input=${this._onAmount}
        ></finap-input>
        <finap-select
          label=${t('transactions.category')}
          .value=${this.categoryId}
          .options=${this._categoryOptions}
          error=${this.errors.categoryId ?? ''}
          @finap-change=${this._onCategory}
        ></finap-select>
        <finap-input
          label=${t('transactions.date')}
          type="date"
          .value=${this.date}
          error=${this.errors.date ?? ''}
          @finap-input=${this._onDate}
        ></finap-input>
        <finap-input
          label=${t('transactions.note')}
          type="textarea"
          placeholder=${t('transactions.notePlaceholder')}
          .value=${this.note}
          @finap-input=${this._onNote}
        ></finap-input>
        <p class="error" ?hidden=${!this.error}>${this.error}</p>
        <div class="actions">
          <sp-button variant="secondary" @click=${this._cancel}>
            ${t('common.cancel')}
          </sp-button>
          <sp-button variant="accent" ?disabled=${this.saving} @click=${this._submit}>
            ${this.saving ? t('common.saving') : t('common.save')}
          </sp-button>
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
