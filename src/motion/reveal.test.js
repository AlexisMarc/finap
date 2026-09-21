import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RevealController } from './reveal.js';
class TestHost extends HTMLElement {
    constructor() {
        super(...arguments);
        this.updateComplete = Promise.resolve(true);
    }
    addController(_controller) { }
    removeController(_controller) { }
    requestUpdate(_name, _oldValue) { }
}
if (!customElements.get('reveal-test-host')) {
    customElements.define('reveal-test-host', TestHost);
}
function installIntersectionObserver() {
    let callback = null;
    class MockIntersectionObserver {
        constructor(cb) {
            this.callback = cb;
            callback = cb;
        }
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    return {
        trigger(entries) {
            callback?.(entries, {});
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
        const host = document.createElement('reveal-test-host');
        new RevealController(host);
        host.classList.add('finap-reveal');
        expect(host.classList.contains('finap-reveal')).toBe(true);
    });
    it('añade finap-revealed cuando el elemento entra al viewport', () => {
        const { trigger } = installIntersectionObserver();
        const host = document.createElement('reveal-test-host');
        const controller = new RevealController(host);
        controller.hostConnected();
        trigger([{ isIntersecting: true }]);
        expect(host.classList.contains('finap-revealed')).toBe(true);
    });
    it('no añade finap-revealed mientras está fuera del viewport', () => {
        const { trigger } = installIntersectionObserver();
        const host = document.createElement('reveal-test-host');
        const controller = new RevealController(host);
        controller.hostConnected();
        trigger([{ isIntersecting: false }]);
        expect(host.classList.contains('finap-revealed')).toBe(false);
    });
    it('se revela inmediatamente si no hay IntersectionObserver', () => {
        vi.stubGlobal('IntersectionObserver', undefined);
        const host = document.createElement('reveal-test-host');
        const controller = new RevealController(host);
        controller.hostConnected();
        expect(host.classList.contains('finap-revealed')).toBe(true);
    });
});
