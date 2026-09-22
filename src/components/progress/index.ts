import { LitElement, html, css } from 'lit';

export class FinapProgress extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .track {
      position: relative;
      width: 100%;
      height: 8px;
      overflow: hidden;
      background-color: var(--finap-color-bg-subtle);
      border-radius: var(--finap-radius-full);
    }

    .fill {
      height: 100%;
      background-color: var(--finap-color-primary);
      border-radius: var(--finap-radius-full);
      transition: width var(--finap-motion-duration-normal)
        var(--finap-motion-easing-standard);
    }

    .fill--over {
      background-color: var(--finap-color-expense);
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }
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
    const width = Math.min(Math.max(percent, 0), 100);
    const over = percent > 100;
    return html`
      <div
        class="track"
        role="progressbar"
        aria-valuenow=${this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
      >
        <div
          class="fill ${over ? 'fill--over' : ''}"
          style="width: ${width}%"
        ></div>
      </div>
    `;
  }
}

customElements.define('finap-progress', FinapProgress);

declare global {
  interface HTMLElementTagNameMap {
    'finap-progress': FinapProgress;
  }
}
