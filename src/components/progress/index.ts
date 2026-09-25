import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/progress-bar/sp-progress-bar.js';

export class FinapProgress extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    sp-progress-bar {
      width: 100%;
    }
  `;

  static properties = {
    value: { type: Number },
    max: { type: Number },
  };

  value = 0;

  max = 100;

  render() {
    const percent = this.max > 0 ? (this.value / this.max) * 100 : 0;
    const clamped = Math.min(Math.max(percent, 0), 100);
    return html`<sp-progress-bar
      size="s"
      .progress=${clamped}
      ?over=${percent > 100}
    ></sp-progress-bar>`;
  }
}

customElements.define('finap-progress', FinapProgress);

declare global {
  interface HTMLElementTagNameMap {
    'finap-progress': FinapProgress;
  }
}
