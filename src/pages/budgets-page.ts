import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/card/index.js';
import '../components/button/index.js';
import '../components/modal/index.js';
import '../components/input/index.js';
import '../components/select/index.js';
import '../components/budget-item/index.js';

import {
  list as listBudgets,
  create as createBudget,
} from '../services/budgets-service.js';
import { list as listCategories } from '../services/categories-service.js';
import type { Budget, Category } from '../services/types.js';

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export class BudgetsPage extends LitElement {
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

    .month {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .list {
      display: grid;
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
    budgets: { type: Array },
    categories: { type: Array },
    month: { type: String },
    formOpen: { type: Boolean },
    saving: { type: Boolean },
    formCategoryId: { type: String },
    formLimit: { type: String },
    formError: { type: String },
  };

  loading = false;

  error = '';

  budgets: Budget[] = [];

  categories: Category[] = [];

  month = currentMonth();

  formOpen = false;

  saving = false;

  formCategoryId = '';

  formLimit = '';

  formError = '';

  connectedCallback(): void {
    super.connectedCallback();
    void this._init();
  }

  private async _init(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      const [categories, budgets] = await Promise.all([
        listCategories(),
        listBudgets(this.month),
      ]);
      this.categories = categories;
      this.budgets = budgets;
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar los presupuestos';
    } finally {
      this.loading = false;
    }
  }

  private _category(id: string): Category | null {
    return this.categories.find((category) => category.id === id) ?? null;
  }

  private get _categoryOptions() {
    return this.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }

  private _openForm(): void {
    this.formCategoryId = '';
    this.formLimit = '';
    this.formError = '';
    this.formOpen = true;
  }

  private _closeForm = (): void => {
    this.formOpen = false;
  };

  private _onCategory(event: Event): void {
    this.formCategoryId = (event as CustomEvent<string>).detail;
  }

  private _onLimit(event: Event): void {
    this.formLimit = (event as CustomEvent<string>).detail;
  }

  private async _save(): Promise<void> {
    const limit = Number(this.formLimit);
    if (!this.formCategoryId) {
      this.formError = 'Selecciona una categoría';
      return;
    }
    if (!this.formLimit || Number.isNaN(limit) || limit <= 0) {
      this.formError = 'Introduce un límite válido';
      return;
    }

    this.formError = '';
    this.saving = true;
    try {
      await createBudget({
        categoryId: this.formCategoryId,
        month: this.month,
        limit,
      });
      this.formOpen = false;
      await this._init();
    } catch (error) {
      this.formError =
        error instanceof Error ? error.message : 'No se pudo guardar';
    } finally {
      this.saving = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <finap-container><div class="state">Cargando…</div></finap-container>
      `;
    }

    return html`
      <finap-container>
        <div class="content">
          <div class="head">
            <finap-heading level="1">Presupuestos</finap-heading>
            <finap-button @click=${this._openForm}>
              Definir presupuesto
            </finap-button>
          </div>
          <span class="month">${this.month}</span>

          <finap-card>
            <div class="list">
              ${this.budgets.map(
                (budget) => html`
                  <finap-budget-item
                    .budget=${budget}
                    .category=${this._category(budget.categoryId)}
                  ></finap-budget-item>
                `,
              )}
            </div>
          </finap-card>

          <finap-modal
            ?open=${this.formOpen}
            heading="Definir presupuesto"
            @finap-close=${this._closeForm}
          >
            <div class="form">
              <finap-select
                label="Categoría"
                .value=${this.formCategoryId}
                .options=${this._categoryOptions}
                @finap-change=${this._onCategory}
              ></finap-select>
              <finap-input
                label="Límite mensual"
                type="number"
                placeholder="0.00"
                .value=${this.formLimit}
                @finap-input=${this._onLimit}
              ></finap-input>
              <p class="error" ?hidden=${!this.formError}>${this.formError}</p>
              <div class="actions">
                <finap-button variant="secondary" @click=${this._closeForm}>
                  Cancelar
                </finap-button>
                <finap-button ?disabled=${this.saving} @click=${this._save}>
                  ${this.saving ? 'Guardando…' : 'Guardar'}
                </finap-button>
              </div>
            </div>
          </finap-modal>
        </div>
      </finap-container>
    `;
  }
}

customElements.define('budgets-page', BudgetsPage);

declare global {
  interface HTMLElementTagNameMap {
    'budgets-page': BudgetsPage;
  }
}
