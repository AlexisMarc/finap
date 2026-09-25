import { LitElement, html, css } from 'lit';

import '../input/index.js';
import '../select/index.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/search/sp-search.js';
import '@spectrum-web-components/popover/sp-popover.js';
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

    sp-action-group {
      flex-wrap: wrap;
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
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: var(--finap-space-3);
    }

    .row sp-search {
      flex: 1;
      min-width: 220px;
    }

    .popover-wrap {
      position: relative;
    }

    .popover {
      position: absolute;
      top: calc(100% + var(--finap-space-2));
      right: 0;
      z-index: 20;
      max-width: none;
      max-height: none;
    }

    .popover-body {
      display: grid;
      gap: var(--finap-space-3);
      min-width: 260px;
      padding: var(--finap-space-4);
    }
  `;

  static properties = {
    categories: { type: Array },
    filters: { type: Object },
    popoverOpen: { type: Boolean },
    categorySearch: { type: String },
  };

  categories: Category[] = [];

  filters: MovementFilters = { ...EMPTY_FILTERS };

  popoverOpen = false;

  categorySearch = '';

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

  private _onType(event: Event): void {
    const target = event.target as { value?: string; selected?: string[] };
    const value = target.value ?? target.selected?.[0] ?? '';
    this._emit({ type: value as TransactionType | '' });
  }

  private _onFrom(event: Event): void {
    this._emit({ from: (event as CustomEvent<string>).detail });
  }

  private _onTo(event: Event): void {
    this._emit({ to: (event as CustomEvent<string>).detail });
  }

  private _onSearch(event: Event): void {
    this._emit({
      search: (event.target as { value?: string }).value ?? '',
    });
  }

  private _togglePopover(): void {
    this.popoverOpen = !this.popoverOpen;
  }

  private _onCategorySearch(event: Event): void {
    this.categorySearch = (event.target as { value?: string }).value ?? '';
  }

  private get _filteredCategoryOptions() {
    const term = this.categorySearch.trim().toLowerCase();
    const options = this._categoryOptions;
    if (!term) return options;
    return options.filter((option) => option.label.toLowerCase().includes(term));
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
          <sp-action-group selects="single" @change=${this._onType}>
            ${TYPE_OPTIONS.map(
              (option) => html`
                <sp-action-button
                  value=${option.id}
                  ?selected=${this.filters.type === option.id}
                >
                  ${t(option.labelKey)}
                </sp-action-button>
              `,
            )}
          </sp-action-group>
        </div>
        <div class="row">
          <sp-search
            placeholder=${t('movements.filter.search')}
            @input=${this._onSearch}
          ></sp-search>
          <div class="popover-wrap">
            <sp-button
              variant="secondary"
              treatment="outline"
              @click=${this._togglePopover}
            >
              ${t('movements.filter.more')}
            </sp-button>
            ${this.popoverOpen
              ? html`
                  <sp-popover open class="popover">
                    <div class="popover-body">
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
                      <sp-search
                        placeholder=${t('movements.filter.categorySearch')}
                        @input=${this._onCategorySearch}
                      ></sp-search>
                      <finap-select
                        label=${t('movements.filter.category')}
                        .value=${this.filters.categoryId}
                        .options=${this._filteredCategoryOptions}
                        @finap-change=${this._onCategory}
                      ></finap-select>
                    </div>
                  </sp-popover>
                `
              : ''}
          </div>
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
