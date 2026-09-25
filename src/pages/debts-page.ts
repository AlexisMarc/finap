import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/skeleton/index.js';
import '../components/heading/index.js';
import '../components/input/index.js';
import '../components/debt-item/index.js';
import '../components/debt-form/index.js';
import type { DebtFormValue } from '../components/debt-form/index.js';

import {
  list,
  create,
  update,
  remove,
  registerPayment,
  type DebtInput,
} from '../services/debts-service.js';
import { notifyDebtsChanged } from '../state/debts.js';
import { LocalizeController } from '../i18n/localize.js';
import { formatCurrency } from '../utils/format.js';
import type { Debt } from '../services/types.js';

export class DebtsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .content {
      display: grid;
      gap: var(--finap-space-5);
    }

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--finap-space-4);
    }

    .total {
      font-family: var(--finap-font-family);
      color: var(--finap-color-text-muted);
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

    .state {
      padding: var(--finap-space-6);
      text-align: center;
      font-family: var(--finap-font-family);
      color: var(--finap-color-text-muted);
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    debts: { type: Array },
    formOpen: { type: Boolean },
    editTarget: { type: Object },
    saving: { type: Boolean },
    saveError: { type: String },
    confirmOpen: { type: Boolean },
    deleteTarget: { type: Object },
    payOpen: { type: Boolean },
    payTarget: { type: Object },
    payAmount: { type: String },
    payError: { type: String },
    paySaving: { type: Boolean },
  };

  loading = false;

  error = '';

  debts: Debt[] = [];

  formOpen = false;

  editTarget: Debt | null = null;

  saving = false;

  saveError = '';

  confirmOpen = false;

  deleteTarget: Debt | null = null;

  payOpen = false;

  payTarget: Debt | null = null;

  payAmount = '';

  payError = '';

  paySaving = false;

  private _localize = new LocalizeController(this);

  connectedCallback(): void {
    super.connectedCallback();
    void this._load();
  }

  private get _totalPending(): number {
    return this.debts.reduce(
      (sum, debt) => sum + Math.max(debt.total - debt.paid, 0),
      0,
    );
  }

  private async _load(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      this.debts = await list();
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : this._localize.t('debts.loadError');
    } finally {
      this.loading = false;
    }
  }

  private _new(): void {
    this.editTarget = null;
    this.saveError = '';
    this.formOpen = true;
  }

  private _edit(event: Event): void {
    this.editTarget = (event as CustomEvent<Debt>).detail;
    this.saveError = '';
    this.formOpen = true;
  }

  private _pay(event: Event): void {
    this.payTarget = (event as CustomEvent<Debt>).detail;
    this.payAmount = '';
    this.payError = '';
    this.payOpen = true;
  }

  private _delete(event: Event): void {
    this.deleteTarget = (event as CustomEvent<Debt>).detail;
    this.confirmOpen = true;
  }

  private _closeForm = (): void => {
    this.formOpen = false;
  };

  private _closePay = (): void => {
    this.payOpen = false;
  };

  private _closeConfirm = (): void => {
    this.confirmOpen = false;
  };

  private async _save(event: Event): Promise<void> {
    const value = (event as CustomEvent<DebtFormValue>).detail;
    this.saving = true;
    this.saveError = '';
    try {
      if (this.editTarget) {
        await update(this.editTarget.id, value as DebtInput);
      } else {
        await create(value as DebtInput);
      }
      notifyDebtsChanged();
      this.formOpen = false;
      await this._load();
    } catch (error) {
      this.saveError =
        error instanceof Error
          ? error.message
          : this._localize.t('common.saveError');
    } finally {
      this.saving = false;
    }
  }

  private _onPayAmount(event: Event): void {
    this.payAmount = (event as CustomEvent<string>).detail;
  }

  private async _registerPayment(): Promise<void> {
    const amount = Number(this.payAmount);
    if (!this.payTarget || !this.payAmount || Number.isNaN(amount) || amount <= 0) {
      this.payError = this._localize.t('debts.error.pay');
      return;
    }
    this.payError = '';
    this.paySaving = true;
    try {
      await registerPayment(this.payTarget.id, amount);
      notifyDebtsChanged();
      this.payOpen = false;
      await this._load();
    } catch (error) {
      this.payError =
        error instanceof Error
          ? error.message
          : this._localize.t('common.saveError');
    } finally {
      this.paySaving = false;
    }
  }

  private async _confirmDelete(): Promise<void> {
    if (!this.deleteTarget) return;
    try {
      await remove(this.deleteTarget.id);
      notifyDebtsChanged();
      this.confirmOpen = false;
      await this._load();
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : this._localize.t('common.deleteError');
      this.confirmOpen = false;
    }
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    if (this.loading) {
      return html`
        <finap-container><finap-skeleton variant="rect" height="240px"></finap-skeleton></finap-container>
      `;
    }

    return html`
      <finap-container>
        <div class="content">
          <div class="head">
            <finap-heading level="1">${t('debts.title')}</finap-heading>
            <sp-button variant="accent" @click=${this._new}>${t('debts.new')}</sp-button>
          </div>
          <span class="total">
            ${t('dashboard.totalPending')}: ${formatCurrency(this._totalPending)}
          </span>

          <div class="finap-surface">
            ${this.debts.map(
              (debt) => html`
                <finap-debt-item
                  .debt=${debt}
                  @finap-pay=${this._pay}
                  @finap-edit=${this._edit}
                  @finap-delete=${this._delete}
                ></finap-debt-item>
              `,
            )}
          </div>

          <sp-dialog-wrapper
            ?open=${this.formOpen}
            headline=${this.editTarget ? t('debts.editTitle') : t('debts.new')}
            dismissable
            @close=${this._closeForm}
          >
            <div class="form-body">
              ${this.formOpen
                ? html`
                    <finap-debt-form
                      .debt=${this.editTarget}
                      .saving=${this.saving}
                      error=${this.saveError}
                      @finap-save=${this._save}
                      @finap-cancel=${this._closeForm}
                    ></finap-debt-form>
                  `
                : ''}
            </div>
          </sp-dialog-wrapper>

          <sp-dialog-wrapper
            ?open=${this.payOpen}
            headline=${`${t('debts.payTitle')}${this.payTarget ? ` · ${this.payTarget.name}` : ''}`}
            dismissable
            @close=${this._closePay}
          >
            <div class="form">
              <finap-input
                label=${t('debts.payAmount')}
                type="number"
                placeholder="0.00"
                .value=${this.payAmount}
                @finap-input=${this._onPayAmount}
              ></finap-input>
              <p class="error" ?hidden=${!this.payError}>${this.payError}</p>
              <div class="actions">
                <sp-button variant="secondary" @click=${this._closePay}>
                  ${t('common.cancel')}
                </sp-button>
                <sp-button variant="accent"
                  ?disabled=${this.paySaving}
                  @click=${this._registerPayment}
                >
                  ${this.paySaving ? t('common.saving') : t('debts.pay')}
                </sp-button>
              </div>
            </div>
          </sp-dialog-wrapper>

          <sp-dialog-wrapper
            ?open=${this.confirmOpen}
            headline=${t('debts.deleteTitle')}
            .confirmLabel=${t('common.delete')}
            .cancelLabel=${t('common.cancel')}
            @confirm=${this._confirmDelete}
            @cancel=${this._closeConfirm}
            @close=${this._closeConfirm}
          >
            ${t('debts.deleteMessage')}
          </sp-dialog-wrapper>
        </div>
      </finap-container>
    `;
  }
}

customElements.define('debts-page', DebtsPage);

declare global {
  interface HTMLElementTagNameMap {
    'debts-page': DebtsPage;
  }
}
