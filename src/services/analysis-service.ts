import { apiFetch } from './http.js';
import type {
  AnalysisEvolution,
  AnalysisSummary,
  CategoryBreakdown,
} from './types.js';

export type AnalysisInterval = 'day' | 'week' | 'month';

export function getSummary(
  from: string,
  to: string,
): Promise<AnalysisSummary> {
  return apiFetch<AnalysisSummary>(
    `/analysis/summary?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
  );
}

export function getByCategory(
  from: string,
  to: string,
  type?: string,
): Promise<CategoryBreakdown[]> {
  const typeParam = type ? `&type=${encodeURIComponent(type)}` : '';
  return apiFetch<CategoryBreakdown[]>(
    `/analysis/by-category?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${typeParam}`,
  );
}

export function getEvolution(
  from: string,
  to: string,
  interval: AnalysisInterval = 'month',
): Promise<AnalysisEvolution> {
  return apiFetch<AnalysisEvolution>(
    `/analysis/evolution?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&interval=${interval}`,
  );
}
