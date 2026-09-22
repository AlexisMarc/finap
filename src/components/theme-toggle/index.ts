import { LitElement, html, css } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { LocalizeController } from '../../i18n/localize.js';
import {
  resolveTheme,
  setTheme,
  THEME_CHANGED_EVENT,
  type Theme,
} from '../../theme/theme.js';

const SUN_ICON =
  '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';

const MOON_ICON = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';

export class FinapThemeToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-full);
      background-color: transparent;
      color: var(--finap-color-text);
      cursor: pointer;
      transition:
        background-color var(--finap-motion-duration-fast)
          var(--finap-motion-easing-standard),
        color var(--finap-motion-duration-fast)
          var(--finap-motion-easing-standard);
    }

    button:hover {
      background-color: var(--finap-color-bg-subtle);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `;

  static properties = {
    theme: { type: String },
  };

  theme: Theme = 'light';

  private _localize = new LocalizeController(this);

  private _onThemeChanged = (event: Event) => {
    this.theme = (event as CustomEvent<Theme>).detail;
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.theme = resolveTheme();
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
    super.disconnectedCallback();
  }

  private _toggle(): void {
    setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  render() {
    const isDark = this.theme === 'dark';
    const icon = isDark ? SUN_ICON : MOON_ICON;
    const label = this._localize.t(
      isDark ? 'theme.toggle.toLight' : 'theme.toggle.toDark',
    );
    return html`
      <button
        type="button"
        class="toggle"
        aria-label=${label}
        @click=${this._toggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          ${unsafeSVG(icon)}
        </svg>
      </button>
    `;
  }
}

customElements.define('finap-theme-toggle', FinapThemeToggle);

declare global {
  interface HTMLElementTagNameMap {
    'finap-theme-toggle': FinapThemeToggle;
  }
}
