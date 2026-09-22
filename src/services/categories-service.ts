import { apiFetch } from './http.js';
import type { Category } from './types.js';

export interface CategoryInput {
  name: string;
  color: string;
  icon: string;
}

export function list(): Promise<Category[]> {
  return apiFetch<Category[]>('/categories');
}

export function create(input: CategoryInput): Promise<Category> {
  return apiFetch<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function update(
  id: string,
  input: Partial<CategoryInput>,
): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function remove(id: string): Promise<void> {
  return apiFetch<void>(`/categories/${id}`, { method: 'DELETE' });
}
