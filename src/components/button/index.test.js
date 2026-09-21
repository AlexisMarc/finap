import { describe, it, expect } from 'vitest';
import { FinapButton } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
describe('finap-button', () => {
    it('renderiza un <button> nativo con variante primaria por defecto', async () => {
        const el = await fixture(new FinapButton());
        const button = el.shadowRoot?.querySelector('button');
        expect(button).not.toBeNull();
        expect(button?.classList.contains('primary')).toBe(true);
        teardown(el);
    });
    it('aplica la variante secundaria cuando se indica', async () => {
        const el = new FinapButton();
        el.variant = 'secondary';
        await fixture(el);
        expect(el.shadowRoot?.querySelector('button')?.classList.contains('secondary')).toBe(true);
        teardown(el);
    });
    it('marca el botón como deshabilitado', async () => {
        const el = new FinapButton();
        el.disabled = true;
        await fixture(el);
        const button = el.shadowRoot?.querySelector('button');
        expect(button?.hasAttribute('disabled')).toBe(true);
        teardown(el);
    });
    it('renderiza un <button> nativo, que soporta activación por teclado', async () => {
        const el = await fixture(new FinapButton());
        expect(el.shadowRoot?.querySelector('button')?.tagName).toBe('BUTTON');
        teardown(el);
    });
    it('usa tokens de diseño en lugar de valores hardcodeados', () => {
        const cssText = FinapButton.styles.cssText;
        expect(cssText).toContain('var(--finap-');
        expect(cssText).toContain('var(--finap-color-primary)');
    });
});
