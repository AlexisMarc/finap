import type { RouteDefinition } from '@open-cells/core';

export const routes: RouteDefinition[] = [
  {
    name: 'landing',
    path: '/',
    component: 'landing-page',
    action: () => import('../pages/landing-page.js'),
  },
  {
    name: 'login',
    path: '/login',
    component: 'login-page',
    action: () => import('../pages/login-page.js'),
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: 'dashboard-page',
    action: () => import('../pages/dashboard-page.js'),
  },
  {
    name: 'analysis',
    path: '/analysis',
    component: 'analysis-page',
    action: () => import('../pages/analysis-page.js'),
  },
  {
    name: 'debts',
    path: '/debts',
    component: 'debts-page',
    action: () => import('../pages/debts-page.js'),
  },
  {
    name: 'movements',
    path: '/movements',
    component: 'movements-page',
    action: () => import('../pages/movements-page.js'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: 'settings-page',
    action: () => import('../pages/settings-page.js'),
  },
];
