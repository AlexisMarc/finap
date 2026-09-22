import { describe, it, expect, vi, beforeEach } from 'vitest';

import { enqueue, list, clear, flush } from './offline-queue.js';

describe('offline-queue', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('encola, lista y limpia', () => {
    enqueue({ url: '/api/v1/transactions', method: 'POST', body: '{}' });
    expect(list().length).toBe(1);
    clear();
    expect(list().length).toBe(0);
  });

  it('flush reenvía y limpia los sincronizados', async () => {
    enqueue({ url: '/api/v1/transactions', method: 'POST', body: '{}' });
    globalThis.fetch = vi.fn().mockResolvedValue({ status: 201 });

    const sent = await flush();

    expect(sent).toBe(1);
    expect(list().length).toBe(0);
  });

  it('flush conserva los que fallan', async () => {
    enqueue({ url: '/api/v1/transactions', method: 'POST', body: '{}' });
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('offline'));

    const sent = await flush();

    expect(sent).toBe(0);
    expect(list().length).toBe(1);
  });
});
