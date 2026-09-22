import { describe, it, expect, vi } from 'vitest';

import { enableHistoryRouting } from './history.js';

describe('enableHistoryRouting', () => {
  it('sintetiza el evento pushstate al navegar', () => {
    enableHistoryRouting();

    const listener = vi.fn();
    window.addEventListener('pushstate', listener);

    window.history.pushState({}, '', '/dashboard');

    expect(listener).toHaveBeenCalled();
    window.removeEventListener('pushstate', listener);
  });
});
