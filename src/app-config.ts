import type { CellsConfig } from '@open-cells/core';

import { routes } from './router/routes.js';

export const appConfig: CellsConfig = {
  mainNode: 'app',
  routes,
};
