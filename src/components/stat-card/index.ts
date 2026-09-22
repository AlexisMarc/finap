import { LitElement, html, css } from 'lit';

export type StatTrend = 'up' | 'down' | 'neutral';

export class FinapStatCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      display: grid;
      gap: var(--finap-space-1);
      padding: var(--finap-space-4);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-md);
    }

    .label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .value {
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-xl);
      font-weight: var(--finap-font-weight-bold);
      color: var(--finap-color-text);
      letter-spacing: var(--finap-letter-spacing-tight);
    }

    .trend {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
    }

    .trend--up {
      color: var(--finap-color-income);
    }

    .trend--down {
      color: var(--finap-color-expense);
    }

    .trend--neutral {
      color: var(--finap-color-text-muted);
    }
  `;

  static properties = {
    label: { type: String },
    value: { type: String },
    trend: { type: String },
    delta: { type: String },
  };

  label = '';

  value = '';

  trend: StatTrend = 'neutral';

  delta = '';

  render() {
    return html`
      <div class="card">
        <span class="label">${this.label}</span>
        <span class="value">${this.value}</span>
        ${this.delta
          ? html`<span class="trend trend--${this.trend}">${this.delta}</span>`
          : ''}
      </div>
    `;
  }
}

customElements.define('finap-stat-card', FinapStatCard);

declare global {
  interface HTMLElementTagNameMap {
    'finap-stat-card': FinapStatCard;
  }
}
