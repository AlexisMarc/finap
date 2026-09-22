import { LitElement, html, css } from 'lit';

import '../chip/index.js';
import '../input/index.js';
import '../select/index.js';
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

const TYPE_OPTIONS: Array<{ id: TransactionType | ''; label: string }> = [
  { id: '', label: 'Todos' },
  { id: 'expense', label: 'Gasto' },
  { id: 'income', label: 'Ingreso' },
  { id: 'debt', label: 'Deuda' },
];

export class FinapMovementsFilters extends LitElement {
  static styles = css`
    :host {
      display: block;
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
      { value: '', label: 'Todas' },
      ...this.categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ];
  }

  render() {
    return html`
      <div class="filters">
        <div class="types">
          ${TYPE_OPTIONS.map(
            (option) => html`
              <finap-chip
                clickable
                ?selected=${this.filters.type === option.id}
                @click=${() => this._emit({ type: option.id })}
              >
                ${option.label}
              </finap-chip>
            `,
          )}
        </div>
        <div class="row">
          <finap-select
            label="Categoría"
            .options=${this._categoryOptions}
            @finap-change=${this._onCategory}
          ></finap-select>
          <finap-input
            label="Desde"
            type="date"
            @finap-input=${this._onFrom}
          ></finap-input>
          <finap-input
            label="Hasta"
            type="date"
            @finap-input=${this._onTo}
          ></finap-input>
          <finap-input
            label="Buscar"
            type="text"
            placeholder="Buscar..."
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
