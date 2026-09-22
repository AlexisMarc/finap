import { apiFetch } from './http.js';
import type { AssistantAnswer } from './types.js';

export function ask(question: string): Promise<AssistantAnswer> {
  return apiFetch<AssistantAnswer>('/assistant/ask', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}
