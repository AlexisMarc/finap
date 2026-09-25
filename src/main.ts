import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/theme-dark.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/tags/sp-tag.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/badge/sp-badge.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/styles/typography.css';

import './tokens/tokens.css';
import './tokens/typography.css';
import './tokens/motion.css';
import './theme/theme.css';
import './motion/motion.css';
import './styles/app.css';

import { initTheme } from './theme/theme';
import { initLocale } from './i18n/i18n';
import { initConnectionStatus } from './pwa/connection-status';
import {
  registerServiceWorker,
  updateServiceWorker,
} from './pwa/register-sw';
import { startAppShell } from './components/app-index.js';
import { enableHistoryRouting } from './router/history.js';
import './components/app-shell/index.js';
import './components/offline-banner/index.js';

initTheme();
initLocale();
initConnectionStatus();
registerServiceWorker();
window.addEventListener('finap-apply-update', () => updateServiceWorker());

enableHistoryRouting();
startAppShell();
