import { LitElement, html, css } from 'lit';

export class FinapBrandMark extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .mark {
      position: relative;
      width: 48px;
      height: 32px;
      display: block;
    }

    .rhombus {
      position: absolute;
      top: 4px;
      width: 24px;
      height: 24px;
      transform: rotate(45deg);
      border-radius: 2px;
    }

    .rhombus--primary {
      left: 6px;
      background-color: var(--finap-color-primary);
    }

    .rhombus--secondary {
      right: 6px;
      background-color: var(--finap-color-secondary);
      mix-blend-mode: var(--finap-brand-blend, multiply);
    }
  `;

  render() {
    return html`
      <span class="mark" aria-hidden="true">
        <span class="rhombus rhombus--primary"></span>
        <span class="rhombus rhombus--secondary"></span>
      </span>
    `;
  }
}

customElements.define('finap-brand-mark', FinapBrandMark);

declare global {
  interface HTMLElementTagNameMap {
    'finap-brand-mark': FinapBrandMark;
  }
}
