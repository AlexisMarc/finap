import { LitElement, html, type TemplateResult } from 'lit';
import { html as staticHtml, literal } from 'lit/static-html.js';

import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-home.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-vertical.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-money.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-credit-card.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-view-list.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-right.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-menu.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-shopping-cart.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-car.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-game.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-page-tag.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js';

import { styles } from './styles.js';

/** Mapa de nombres propios de Finap → iconos de workflow de Spectrum. */
const ICONS: Record<string, TemplateResult> = {
  home: staticHtml`<${literal`sp-icon-home`}></${literal`sp-icon-home`}>`,
  settings: staticHtml`<${literal`sp-icon-settings`}></${literal`sp-icon-settings`}>`,
  chart: staticHtml`<${literal`sp-icon-graph-bar-vertical`}></${literal`sp-icon-graph-bar-vertical`}>`,
  wallet: staticHtml`<${literal`sp-icon-money`}></${literal`sp-icon-money`}>`,
  'credit-card': staticHtml`<${literal`sp-icon-credit-card`}></${literal`sp-icon-credit-card`}>`,
  list: staticHtml`<${literal`sp-icon-view-list`}></${literal`sp-icon-view-list`}>`,
  'arrow-right': staticHtml`<${literal`sp-icon-arrow-right`}></${literal`sp-icon-arrow-right`}>`,
  menu: staticHtml`<${literal`sp-icon-menu`}></${literal`sp-icon-menu`}>`,
  close: staticHtml`<${literal`sp-icon-close`}></${literal`sp-icon-close`}>`,
  check: staticHtml`<${literal`sp-icon-checkmark`}></${literal`sp-icon-checkmark`}>`,
  shopping: staticHtml`<${literal`sp-icon-shopping-cart`}></${literal`sp-icon-shopping-cart`}>`,
  car: staticHtml`<${literal`sp-icon-car`}></${literal`sp-icon-car`}>`,
  gamepad: staticHtml`<${literal`sp-icon-game`}></${literal`sp-icon-game`}>`,
  tag: staticHtml`<${literal`sp-icon-page-tag`}></${literal`sp-icon-page-tag`}>`,
  repeat: staticHtml`<${literal`sp-icon-refresh`}></${literal`sp-icon-refresh`}>`,
};

export class FinapIcon extends LitElement {
  static styles = styles;

  static properties = {
    name: { type: String },
    size: { type: String },
  };

  name = '';

  size = '24';

  private get _spectrumSize(): string {
    const value = Number(this.size);
    if (!Number.isFinite(value)) return 'm';
    if (value <= 16) return 's';
    if (value <= 20) return 'm';
    return 'l';
  }

  render() {
    const icon = ICONS[this.name];
    if (!icon) {
      return html`<span class="icon-empty" aria-hidden="true"></span>`;
    }
    return html`
      <sp-icon size=${this._spectrumSize} aria-hidden="true">${icon}</sp-icon>
    `;
  }
}

customElements.define('finap-icon', FinapIcon);

declare global {
  interface HTMLElementTagNameMap {
    'finap-icon': FinapIcon;
  }
}
