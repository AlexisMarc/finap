import { LitElement, html, css } from 'lit';
import { Chart } from 'chart.js/auto';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';

import { THEME_CHANGED_EVENT } from '../../theme/theme.js';

export class FinapChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      height: 260px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `;

  static properties = {
    type: { type: String },
    data: { type: Object },
    options: { type: Object },
  };

  type: ChartType = 'line';

  data: ChartData | null = null;

  options: ChartOptions = {};

  private _chart: Chart | null = null;

  private _onThemeChanged = (): void => {
    this._render();
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.documentElement.addEventListener(
      THEME_CHANGED_EVENT,
      this._onThemeChanged,
    );
  }

  disconnectedCallback(): void {
    document.documentElement.removeEventListener(
      THEME_CHANGED_EVENT,
      this._onThemeChanged,
    );
    this._destroy();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this._render();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (
      changed.has('data') ||
      changed.has('type') ||
      changed.has('options')
    ) {
      this._render();
    }
  }

  private _destroy(): void {
    this._chart?.destroy();
    this._chart = null;
  }

  private _themeVar(name: string, fallback: string): string {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return value || fallback;
  }

  private _render(): void {
    const canvas = this.shadowRoot?.querySelector('canvas');
    if (!canvas || !this.data) return;

    const text = this._themeVar('--finap-color-text-muted', '#9b9ba8');
    const grid = this._themeVar('--finap-color-border', '#3a3a44');

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: text } },
      },
      ...this.options,
    };

    if (this.type !== 'doughnut' && this.type !== 'pie') {
      options.scales = {
        x: { ticks: { color: text }, grid: { color: grid } },
        y: { ticks: { color: text }, grid: { color: grid } },
      };
    }

    this._destroy();
    this._chart = new Chart(canvas, {
      type: this.type,
      data: this.data,
      options,
    });
  }

  render() {
    return html`<canvas role="img"></canvas>`;
  }
}

customElements.define('finap-chart', FinapChart);

declare global {
  interface HTMLElementTagNameMap {
    'finap-chart': FinapChart;
  }
}
