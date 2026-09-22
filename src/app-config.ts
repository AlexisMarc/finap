import type { CellsConfig, InterceptorFunction } from '@open-cells/core';

import { routes } from './router/routes.js';
import { hasSession } from './state/session.js';

export const APP_ROUTES = new Set([
  'dashboard',
  'analysis',
  'debts',
  'movements',
  'settings',
  'categories',
  'budgets',
]);

interface NavigationLike {
  to?: { page?: string };
}

export interface GuardResult {
  intercept: boolean;
  redirect?: { page: string };
}

/**
 * Guard de sesión: redirige a login cuando se intenta acceder a una ruta de la
 * aplicación sin sesión, y al dashboard cuando ya hay sesión y se visita login.
 */
export function sessionGuard(navigation: NavigationLike): GuardResult {
  const target = navigation?.to?.page;
  if (target && APP_ROUTES.has(target) && !hasSession()) {
    return { intercept: true, redirect: { page: 'login' } };
  }
  if (target === 'login' && hasSession()) {
    return { intercept: true, redirect: { page: 'dashboard' } };
  }
  return { intercept: false };
}

export const appConfig: CellsConfig = {
  mainNode: 'app',
  routes,
  interceptor: sessionGuard as unknown as InterceptorFunction,
};
