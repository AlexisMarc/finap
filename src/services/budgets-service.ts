import { apiFetch } from './http.js';
import type { Budget } from './types.js';

export interface BudgetInput {
  categoryId: string;
  month: string;
  limit: number;
}

export function list(month?: string): Promise<Budget[]> {
  const query = month ? `?month=${encodeURIComponent(month)}` : '';
  return apiFetch<Budget[]>(`/budgets${query}`);
}

export function create(input: BudgetInput): Promise<Budget> {
  return apiFetch<Budget>('/budgets', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function update(
  id: string,
  input: Partial<BudgetInput>,
): Promise<Budget> {
  return apiFetch<Budget>(`/budgets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function remove(id: string): Promise<void> {
  return apiFetch<void>(`/budgets/${id}`, { method: 'DELETE' });
}
