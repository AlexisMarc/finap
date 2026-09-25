import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../select/index.js';
import { LocalizeController } from '../../i18n/localize.js';
import type { Category, TransactionType } from '../../services/types.js';

export interface MovementFilters {
  type: TransactionType | '';
  categoryId: string;
  from: string;
  to: string;
  search: string;
}

const EMPTY_FILTERS: MovementFilters = {
  type: '',
  categoryId: '',
  from: '',
  to: '',
  search: '',
};

const TYPE_OPTIONS: Array<{ id: TransactionType | ''; labelKey: string }> = [
  { id: '', labelKey: 'movements.filter.all' },
  { id: 'expense', labelKey: 'movements.filter.expense' },
  { id: 'income', labelKey: 'movements.filter.income' },
  { id: 'debt', labelKey: 'movements.filter.debt' },
];

export class FinapMovementsFilters extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    sp-tag[selected] {
      --spectrum-tag-background-color: var(--finap-color-accent-interactive);
      --spectrum-tag-border-color: transparent;
      --spectrum-tag-content-color: var(--finap-color-on-primary);
    }

    .filters {
      display: grid;
      gap: var(--finap-space-4);
    }

    .types {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-2);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--finap-space-3);
    }

    @media (min-width: 768px) {
      .row {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;

  static properties = {
    categories: { type: Array },
    filters: { type: Object },
  };

  categories: Category[] = [];

  filters: MovementFilters = { ...EMPTY_FILTERS };

  private _localize = new LocalizeController(this);

  private _emit(patch: Partial<MovementFilters>): void {
    this.dispatchEvent(
      new CustomEvent('finap-filter-change', {
        detail: { ...this.filters, ...patch },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onCategory(event: Event): void {
    this._emit({ categoryId: (event as CustomEvent<string>).detail });
  }

  private _onFrom(event: Event): void {
    this._emit({ from: (event as CustomEvent<string>).detail });
  }

  private _onTo(event: Event): void {
    this._emit({ to: (event as CustomEvent<string>).detail });
  }

  private _onSearch(event: Event): void {
    this._emit({ search: (event as CustomEvent<string>).detail });
  }

  private get _categoryOptions() {
    return [
      { value: '', label: this._localize.t('movements.filter.all') },
      ...this.categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ];
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return html`
      <div class="filters">
        <div class="types">
          ${TYPE_OPTIONS.map(
            (option) => html`
              <sp-tag
                role="button"
                tabindex="0"
                ?selected=${this.filters.type === option.id}
                @click=${() => this._emit({ type: option.id })}
              >
                ${t(option.labelKey)}
              </sp-tag>
            `,
          )}
        </div>
        <div class="row">
          <finap-select
            label=${t('movements.filter.category')}
            .options=${this._categoryOptions}
            @finap-change=${this._onCategory}
          ></finap-select>
          <finap-input
            label=${t('movements.filter.from')}
            type="date"
            @finap-input=${this._onFrom}
          ></finap-input>
          <finap-input
            label=${t('movements.filter.to')}
            type="date"
            @finap-input=${this._onTo}
          ></finap-input>
          <finap-input
            label=${t('movements.filter.search')}
            type="text"
            placeholder=${t('movements.filter.search')}
            @finap-input=${this._onSearch}
          ></finap-input>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-movements-filters', FinapMovementsFilters);

declare global {
  interface HTMLElementTagNameMap {
    'finap-movements-filters': FinapMovementsFilters;
  }
}
