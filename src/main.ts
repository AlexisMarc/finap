import './tokens/tokens.css';
import './tokens/typography.css';
import './tokens/motion.css';
import './theme/theme.css';
import './motion/motion.css';

import '@fontsource-variable/inter';
import '@fontsource-variable/sora';

import { initTheme } from './theme/theme';
import { startAppShell } from './components/app-index.js';
import './components/app-shell/index.js';

initTheme();
startAppShell();
