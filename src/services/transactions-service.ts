import { apiFetch } from './http.js';
import type { Paginated, Transaction, TransactionType } from './types.js';

export interface TransactionFilters {
  type?: TransactionType | '';
  categoryId?: string;
  from?: string;
  to?: string;
  search?: string;
  sort?: 'date' | 'amount';
  order?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export function list(
  filters: TransactionFilters = {},
): Promise<Paginated<Transaction>> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  }
  const query = params.toString();
  return apiFetch<Paginated<Transaction>>(
    `/transactions${query ? `?${query}` : ''}`,
  );
}

export function getById(id: string): Promise<Transaction> {
  return apiFetch<Transaction>(`/transactions/${id}`);
}

export interface TransactionInput {
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
}

export function create(input: TransactionInput): Promise<Transaction> {
  return apiFetch<Transaction>('/transactions', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function update(
  id: string,
  input: Partial<TransactionInput>,
): Promise<Transaction> {
  return apiFetch<Transaction>(`/transactions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function remove(id: string): Promise<void> {
  return apiFetch<void>(`/transactions/${id}`, { method: 'DELETE' });
}

