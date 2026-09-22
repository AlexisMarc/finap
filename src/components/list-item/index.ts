import { LitElement, html, css } from 'lit';

export type ListItemTone = 'neutral' | 'income' | 'expense';

export class FinapListItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--finap-space-3);
      padding: var(--finap-space-3) 0;
    }

    .leading {
      flex: none;
      display: inline-flex;
      align-items: center;
    }

    .body {
      flex: 1;
      min-width: 0;
      display: grid;
      gap: 2px;
    }

    .title {
      font-family: var(--finap-font-family);
      font-weight: var(--finap-font-weight-semibold);
      color: var(--finap-color-text);
    }

    .subtitle {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .value {
      flex: none;
      font-family: var(--finap-font-family);
      font-weight: var(--finap-font-weight-semibold);
      color: var(--finap-color-text);
      white-space: nowrap;
    }

    .value--income {
      color: var(--finap-color-income);
    }

    .value--expense {
      color: var(--finap-color-expense);
    }
  `;

  static properties = {
    title: { type: String },
    subtitle: { type: String },
    value: { type: String },
    tone: { type: String },
  };

  title = '';

  subtitle = '';

  value = '';

  tone: ListItemTone = 'neutral';

  render() {
    return html`
      <div class="item">
        <span class="leading"><slot name="leading"></slot></span>
        <span class="body">
          <span class="title">${this.title}</span>
          ${this.subtitle
            ? html`<span class="subtitle">${this.subtitle}</span>`
            : ''}
        </span>
        <span class="value value--${this.tone}">${this.value}</span>
      </div>
    `;
  }
}

customElements.define('finap-list-item', FinapListItem);

declare global {
  interface HTMLElementTagNameMap {
    'finap-list-item': FinapListItem;
  }
}
