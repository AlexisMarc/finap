import { LitElement, html, css } from 'lit';
export class FinapBrandMark extends LitElement {
    static { this.styles = css `
    :host {
      display: inline-block;
    }

    .mark {
      position: relative;
      width: 48px;
      height: 48px;
      display: block;
    }

    .circle {
      position: absolute;
      top: 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .circle--primary {
      left: 4px;
      background-color: var(--finap-color-primary);
    }

    .circle--secondary {
      right: 4px;
      background-color: var(--finap-color-secondary);
      mix-blend-mode: multiply;
    }
  `; }
    render() {
        return html `
      <span class="mark" aria-hidden="true">
        <span class="circle circle--primary"></span>
        <span class="circle circle--secondary"></span>
      </span>
    `;
    }
}
customElements.define('finap-brand-mark', FinapBrandMark);
