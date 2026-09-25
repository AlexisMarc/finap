import { LitElement, html, css } from 'lit';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export class FinapSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--finap-color-bg-subtle) 25%,
        var(--spectrum-gray-200) 37%,
        var(--finap-color-bg-subtle) 63%
      );
      background-size: 400% 100%;
      border-radius: var(--finap-radius-sm);
      animation: finap-shimmer 1.4s ease infinite;
    }

    .skeleton--text {
      height: 1em;
    }

    .skeleton--rect {
      height: 120px;
    }

    .skeleton--circle {
      width: 40px;
      height: 40px;
      border-radius: var(--finap-radius-full);
    }

    @keyframes finap-shimmer {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }
  `;

  static properties = {
    variant: { type: String },
    width: { type: String },
    height: { type: String },
  };

  variant: SkeletonVariant = 'text';

  width = '';

  height = '';

  render() {
    const style = [
      this.width ? `width: ${this.width};` : '',
      this.height ? `height: ${this.height};` : '',
    ].join('');
    return html`<div
      class="skeleton skeleton--${this.variant}"
      style=${style}
      aria-hidden="true"
    ></div>`;
  }
}

customElements.define('finap-skeleton', FinapSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    'finap-skeleton': FinapSkeleton;
  }
}
