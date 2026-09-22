import { apiFetch } from './http.js';
import type { Debt } from './types.js';

export interface DebtInput {
  name: string;
  total: number;
  paid?: number;
  dueDate?: string;
}

export function list(): Promise<Debt[]> {
  return apiFetch<Debt[]>('/debts');
}

export function create(input: DebtInput): Promise<Debt> {
  return apiFetch<Debt>('/debts', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function update(id: string, input: Partial<DebtInput>): Promise<Debt> {
  return apiFetch<Debt>(`/debts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function remove(id: string): Promise<void> {
  return apiFetch<void>(`/debts/${id}`, { method: 'DELETE' });
}

export function registerPayment(id: string, amount: number): Promise<Debt> {
  return apiFetch<Debt>(`/debts/${id}/payments`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });
}
