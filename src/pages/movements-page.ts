import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/button/index.js';
import '../components/card/index.js';
import '../components/heading/index.js';
import '../components/movements-filters/index.js';
import '../components/movements-list/index.js';
import '../components/modal/index.js';
import '../components/transaction-form/index.js';
import '../components/confirm-dialog/index.js';
import type { MovementFilters } from '../components/movements-filters/index.js';
import type { TransactionFormValue } from '../components/transaction-form/index.js';

import {
  list as listTransactions,
  update as updateTransaction,
  remove as removeTransaction,
  type TransactionFilters,
  type TransactionInput,
} from '../services/transactions-service.js';
import { list as listCategories } from '../services/categories-service.js';
import { notifyTransactionsChanged } from '../state/transactions.js';
import { LocalizeController } from '../i18n/localize.js';
import type { Category, Transaction } from '../services/types.js';

const PAGE_SIZE = 20;

const EMPTY_FILTERS: MovementFilters = {
  type: '',
  categoryId: '',
  from: '',
  to: '',
  search: '',
};

export class MovementsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .content {
      display: grid;
      gap: var(--finap-space-5);
    }

    .results,
    .list-wrap {
      display: grid;
      gap: var(--finap-space-4);
    }

    .more {
      display: grid;
      justify-items: center;
    }

    .state {
      display: grid;
      gap: var(--finap-space-4);
      justify-items: center;
      padding: var(--finap-space-7);
      text-align: center;
      font-family: var(--finap-font-family);
      color: var(--finap-color-text-muted);
    }
  `;

  static properties = {
    loading: { type: Boolean },
    loadingMore: { type: Boolean },
    error: { type: String },
    transactions: { type: Array },
    categories: { type: Array },
    hasMore: { type: Boolean },
    filters: { type: Object },
    formOpen: { type: Boolean },
    editTarget: { type: Object },
    confirmOpen: { type: Boolean },
    deleteTarget: { type: Object },
    saving: { type: Boolean },
    saveError: { type: String },
  };

  loading = false;

  loadingMore = false;

  error = '';

  transactions: Transaction[] = [];

  categories: Category[] = [];

  hasMore = false;

  filters: MovementFilters = { ...EMPTY_FILTERS };

  formOpen = false;

  editTarget: Transaction | null = null;

  confirmOpen = false;

  deleteTarget: Transaction | null = null;

  saving = false;

  saveError = '';

  private _page = 1;

  private _localize = new LocalizeController(this);

  connectedCallback(): void {
    super.connectedCallback();
    void this._init();
  }

  private async _init(): Promise<void> {
    await this._loadCategories();
    await this._fetch(true);
  }

  private async _loadCategories(): Promise<void> {
    try {
      this.categories = await listCategories();
    } catch {
      this.categories = [];
    }
  }

  private async _fetch(reset: boolean): Promise<void> {
    this.error = '';
    if (reset) {
      this._page = 1;
      this.loading = true;
    } else {
      this._page += 1;
      this.loadingMore = true;
    }

    const params: TransactionFilters = {
      ...this.filters,
      page: this._page,
      pageSize: PAGE_SIZE,
      sort: 'date',
      order: 'desc',
    };

    try {
      const result = await listTransactions(params);
      this.transactions = reset
        ? result.items
        : [...this.transactions, ...result.items];
      this.hasMore = this.transactions.length < result.total;
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : this._localize.t('movements.error');
    } finally {
      this.loading = false;
      this.loadingMore = false;
    }
  }

  private _onFilterChange(event: Event): void {
    this.filters = (event as CustomEvent<MovementFilters>).detail;
    void this._fetch(true);
  }

  private _loadMore(): void {
    if (!this.loadingMore) void this._fetch(false);
  }

  private _retry(): void {
    void this._fetch(true);
  }

  private _clearFilters(): void {
    this.filters = { ...EMPTY_FILTERS };
    void this._fetch(true);
  }

  private _onEdit(event: Event): void {
    this.editTarget = (event as CustomEvent<Transaction>).detail;
    this.saveError = '';
    this.formOpen = true;
  }

  private _onDelete(event: Event): void {
    this.deleteTarget = (event as CustomEvent<Transaction>).detail;
    this.confirmOpen = true;
  }

  private _closeForm = (): void => {
    this.formOpen = false;
  };

  private _closeConfirm = (): void => {
    this.confirmOpen = false;
  };

  private async _onSave(event: Event): Promise<void> {
    if (!this.editTarget) return;
    const value = (event as CustomEvent<TransactionFormValue>).detail;
    this.saving = true;
    this.saveError = '';
    try {
      await updateTransaction(this.editTarget.id, value as TransactionInput);
      notifyTransactionsChanged();
      this.formOpen = false;
      await this._fetch(true);
    } catch (error) {
      this.saveError =
        error instanceof Error ? error.message : 'No se pudo guardar';
    } finally {
      this.saving = false;
    }
  }

  private async _onConfirmDelete(): Promise<void> {
    if (!this.deleteTarget) return;
    try {
      await removeTransaction(this.deleteTarget.id);
      notifyTransactionsChanged();
      this.confirmOpen = false;
      await this._fetch(true);
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : 'No se pudo eliminar';
      this.confirmOpen = false;
    }
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    if (this.loading) {
      return html`
        <finap-container>
          <div class="state">${t('common.loading')}</div>
        </finap-container>
      `;
    }

    if (this.error && this.transactions.length === 0) {
      return html`
        <finap-container>
          <div class="state">
            <p>${this.error}</p>
            <finap-button @click=${this._retry}>${t('common.retry')}</finap-button>
          </div>
        </finap-container>
      `;
    }

    return html`
      <finap-container>
        <div class="content">
          <finap-heading level="1">${t('movements.title')}</finap-heading>
          <finap-card>
            <finap-movements-filters
              .categories=${this.categories}
              .filters=${this.filters}
              @finap-filter-change=${this._onFilterChange}
            ></finap-movements-filters>
          </finap-card>

          <div class="results">
            ${this.transactions.length === 0
              ? html`
                  <div class="state">
                    <p>${t('movements.empty')}</p>
                    <finap-button
                      variant="secondary"
                      @click=${this._clearFilters}
                    >
                      ${t('movements.clear')}
                    </finap-button>
                  </div>
                `
              : html`
                  <div class="list-wrap">
                    <finap-card>
                      <finap-movements-list
                        .transactions=${this.transactions}
                        @finap-edit=${this._onEdit}
                        @finap-delete=${this._onDelete}
                      ></finap-movements-list>
                    </finap-card>
                    <div class="more">
                      ${this.hasMore
                        ? html`
                            <finap-button
                              variant="secondary"
                              ?disabled=${this.loadingMore}
                              @click=${this._loadMore}
                            >
                              ${this.loadingMore
                                ? t('common.loading')
                                : t('movements.loadMore')}
                            </finap-button>
                          `
                        : ''}
                    </div>
                  </div>
                `}
          </div>

          <finap-modal
            ?open=${this.formOpen}
            heading=${t('transactions.editTitle')}
            @finap-close=${this._closeForm}
          >
            <div class="form-body">
              ${this.formOpen
                ? html`
                    <finap-transaction-form
                      .categories=${this.categories}
                      .transaction=${this.editTarget}
                      .saving=${this.saving}
                      error=${this.saveError}
                      @finap-save=${this._onSave}
                      @finap-cancel=${this._closeForm}
                    ></finap-transaction-form>
                  `
                : ''}
            </div>
          </finap-modal>

          <finap-confirm-dialog
            ?open=${this.confirmOpen}
            heading=${t('transactions.deleteTitle')}
            message=${t('transactions.deleteMessage')}
            confirmLabel=${t('common.delete')}
            @finap-confirm=${this._onConfirmDelete}
            @finap-cancel=${this._closeConfirm}
          ></finap-confirm-dialog>
        </div>
      </finap-container>
    `;
  }
}

customElements.define('movements-page', MovementsPage);

declare global {
  interface HTMLElementTagNameMap {
    'movements-page': MovementsPage;
  }
}
