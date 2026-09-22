import { apiFetch } from './http.js';
import type { DashboardSummary } from './types.js';

export function getDashboard(month?: string): Promise<DashboardSummary> {
  const query = month ? `?month=${encodeURIComponent(month)}` : '';
  return apiFetch<DashboardSummary>(`/dashboard${query}`);
}
