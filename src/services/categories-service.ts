import { apiFetch } from './http.js';
import type { Category } from './types.js';

export function list(): Promise<Category[]> {
  return apiFetch<Category[]>('/categories');
}
