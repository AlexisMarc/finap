import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ReactiveController } from 'lit';

import { RevealController } from './reveal.js';

class TestHost extends HTMLElement {
  addController(_controller: ReactiveController): void {}
}

if (!customElements.get('reveal-test-host')) {
  customElements.define('reveal-test-host', TestHost);
}

type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

function installIntersectionObserver() {
  let callback: ObserverCallback | null = null;

  class MockIntersectionObserver {
    callback: ObserverCallback;

    constructor(cb: ObserverCallback) {
      this.callback = cb;
      callback = cb;
    }

    observe(): void {}

    unobserve(): void {}

    disconnect(): void {}
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

  return {
    trigger(entries: Array<Partial<IntersectionObserverEntry>>): void {
      callback?.(entries as IntersectionObserverEntry[], {} as IntersectionObserver);
    },
  };
}

describe('RevealController', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('añade finap-reveal al conectar', () => {
    installIntersectionObserver();
    const host = document.createElement('reveal-test-host') as TestHost;
    new RevealController(host);
    host.classList.add('finap-reveal');

    expect(host.classList.contains('finap-reveal')).toBe(true);
  });

  it('añade finap-revealed cuando el elemento entra al viewport', () => {
    const { trigger } = installIntersectionObserver();
    const host = document.createElement('reveal-test-host') as TestHost;
    const controller = new RevealController(host);
    controller.hostConnected();

    trigger([{ isIntersecting: true }]);

    expect(host.classList.contains('finap-revealed')).toBe(true);
  });

  it('no añade finap-revealed mientras está fuera del viewport', () => {
    const { trigger } = installIntersectionObserver();
    const host = document.createElement('reveal-test-host') as TestHost;
    const controller = new RevealController(host);
    controller.hostConnected();

    trigger([{ isIntersecting: false }]);

    expect(host.classList.contains('finap-revealed')).toBe(false);
  });

  it('se revela inmediatamente si no hay IntersectionObserver', () => {
    const host = document.createElement('reveal-test-host') as TestHost;
    const controller = new RevealController(host);
    controller.hostConnected();

    expect(host.classList.contains('finap-revealed')).toBe(true);
  });
});
