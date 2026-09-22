import { describe, it, expect, vi } from 'vitest';

import {
  CONNECTION_CHANGED_EVENT,
  initConnectionStatus,
} from './connection-status.js';

describe('connection-status', () => {
  it('emite al pasar a offline y a online', () => {
    initConnectionStatus();

    const details: boolean[] = [];
    const listener = (event: Event) => {
      details.push((event as CustomEvent<boolean>).detail);
    };
    window.addEventListener(CONNECTION_CHANGED_EVENT, listener);

    window.dispatchEvent(new Event('offline'));
    window.dispatchEvent(new Event('online'));

    expect(details).toEqual([false, true]);
    window.removeEventListener(CONNECTION_CHANGED_EVENT, listener);
  });
});
