import { html, nothing, type TemplateResult } from 'lit';
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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';

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
  help: staticHtml`<${literal`sp-icon-help`}></${literal`sp-icon-help`}>`,
};

/** Nombres de icono soportados (para tests y mapeos estáticos). */
export const ICON_NAMES = Object.keys(ICONS);

export function isKnownIcon(name: string): boolean {
  return name in ICONS;
}

/** Renderiza un `sp-icon` con el icono de workflow correspondiente. */
export function finapIcon(
  name: string,
  size: string | number = '24',
): TemplateResult | typeof nothing {
  const icon = ICONS[name];
  if (!icon) return nothing;
  const value = Number(size);
  const spectrumSize = !Number.isFinite(value)
    ? 'm'
    : value <= 16
      ? 's'
      : value <= 20
        ? 'm'
        : 'l';
  return html`<sp-icon size=${spectrumSize} aria-hidden="true">${icon}</sp-icon>`;
}
