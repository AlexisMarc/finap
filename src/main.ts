import './tokens/tokens.css';
import './tokens/typography.css';
import './tokens/motion.css';
import './theme/theme.css';
import './motion/motion.css';

import '@fontsource-variable/inter';
import '@fontsource-variable/sora';

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
