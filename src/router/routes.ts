import type { RouteDefinition } from '@open-cells/core';

export const routes: RouteDefinition[] = [
  {
    name: 'landing',
    path: '/',
    component: 'landing-page',
    action: () => import('../pages/landing-page.js'),
  },
];
