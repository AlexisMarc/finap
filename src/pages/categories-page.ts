import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/skeleton/index.js';
import '../components/heading/index.js';
import { finapIcon } from '../components/icons.js';
import '@spectrum-web-components/table/elements.js';
import '../components/category-form/index.js';
import type { CategoryInput } from '../services/categories-service.js';
import {
  list,
  create,
  update,
  remove,
} from '../services/categories-service.js';
import { LocalizeController } from '../i18n/localize.js';
import type { Category } from '../services/types.js';

export class CategoriesPage extends LitElement {
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

    .list {
      display: grid;
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--finap-space-3);
      padding: var(--finap-space-3) 0;
      border-top: 1px solid var(--finap-color-border);
      font-family: var(--finap-font-family);
    }

    .dot {
      width: 12px;
      height: 12px;
      flex: none;
      border-radius: var(--finap-radius-full);
      background-color: var(--c, var(--finap-color-accent));
    }

    .name {
      flex: 1;
      color: var(--finap-color-text);
    }

    .actions {
      display: flex;
      gap: var(--finap-space-1);
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
    categories: { type: Array },
    formOpen: { type: Boolean },
    editTarget: { type: Object },
    confirmOpen: { type: Boolean },
    deleteTarget: { type: Object },
    saving: { type: Boolean },
    saveError: { type: String },
  };

  loading = false;

  error = '';

  categories: Category[] = [];

  formOpen = false;

  editTarget: Category | null = null;

  confirmOpen = false;

  deleteTarget: Category | null = null;

  saving = false;

  saveError = '';

  private _localize = new LocalizeController(this);

  connectedCallback(): void {
    super.connectedCallback();
    void this._load();
  }

  private async _load(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      this.categories = await list();
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : this._localize.t('categories.loadError');
    } finally {
      this.loading = false;
    }
  }

  private _new(): void {
    this.editTarget = null;
    this.saveError = '';
    this.formOpen = true;
  }

  private _edit(category: Category): void {
    this.editTarget = category;
    this.saveError = '';
    this.formOpen = true;
  }

  private _delete(category: Category): void {
    this.deleteTarget = category;
    this.confirmOpen = true;
  }

  private _closeForm = (): void => {
    this.formOpen = false;
  };

  private _closeConfirm = (): void => {
    this.confirmOpen = false;
  };

  private async _save(event: Event): Promise<void> {
    const value = (event as CustomEvent<CategoryInput>).detail;
    this.saving = true;
    this.saveError = '';
    try {
      if (this.editTarget) {
        await update(this.editTarget.id, value);
      } else {
        await create(value);
      }
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

  private async _confirmDelete(): Promise<void> {
    if (!this.deleteTarget) return;
    try {
      await remove(this.deleteTarget.id);
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
            <finap-heading level="1">${t('categories.title')}</finap-heading>
            <sp-button variant="accent" @click=${this._new}>${t('categories.new')}</sp-button>
          </div>

          <div class="finap-surface">
            <sp-table>
              <sp-table-head>
                <sp-table-head-cell>${t('categories.name')}</sp-table-head-cell>
                <sp-table-head-cell>${t('categories.icon')}</sp-table-head-cell>
                <sp-table-head-cell>${t('common.actions')}</sp-table-head-cell>
              </sp-table-head>
              <sp-table-body>
                ${this.categories.map(
                  (category) => html`
                    <sp-table-row>
                      <sp-table-cell>
                        <span
                          class="dot"
                          style="--c: ${category.color}"
                        ></span>
                        ${category.name}
                      </sp-table-cell>
                      <sp-table-cell
                        >${finapIcon(category.icon, 18)}</sp-table-cell
                      >
                      <sp-table-cell>
                        <sp-button
                          variant="secondary"
                          treatment="outline"
                          @click=${() => this._edit(category)}
                        >
                          ${t('common.edit')}
                        </sp-button>
                        <sp-button
                          variant="secondary"
                          treatment="outline"
                          @click=${() => this._delete(category)}
                        >
                          ${t('common.delete')}
                        </sp-button>
                      </sp-table-cell>
                    </sp-table-row>
                  `,
                )}
              </sp-table-body>
            </sp-table>
          </div>

          <sp-dialog-wrapper
            ?open=${this.formOpen}
            headline=${this.editTarget
              ? t('categories.editTitle')
              : t('categories.new')}
            dismissable
            @close=${this._closeForm}
          >
            <div class="form-body">
              ${this.formOpen
                ? html`
                    <finap-category-form
                      .category=${this.editTarget}
                      .saving=${this.saving}
                      error=${this.saveError}
                      @finap-save=${this._save}
                      @finap-cancel=${this._closeForm}
                    ></finap-category-form>
                  `
                : ''}
            </div>
          </sp-dialog-wrapper>

          <sp-dialog-wrapper
            ?open=${this.confirmOpen}
            headline=${t('categories.deleteTitle')}
            .confirmLabel=${t('common.delete')}
            .cancelLabel=${t('common.cancel')}
            @confirm=${this._confirmDelete}
            @cancel=${this._closeConfirm}
            @close=${this._closeConfirm}
          >
            ${t('categories.deleteMessage')}
          </sp-dialog-wrapper>
        </div>
      </finap-container>
    `;
  }
}

customElements.define('categories-page', CategoriesPage);

declare global {
  interface HTMLElementTagNameMap {
    'categories-page': CategoriesPage;
  }
}
