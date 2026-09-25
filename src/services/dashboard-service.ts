import { apiFetch } from './http.js';
import type { DashboardSummary } from './types.js';

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export function getDashboard(
  month: string = currentMonth(),
): Promise<DashboardSummary> {
  return apiFetch<DashboardSummary>(
    `/dashboard?month=${encodeURIComponent(month)}`,
  );
}
