import { describe, it, expect } from 'vitest';
import { FinapText } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
describe('finap-text', () => {
    it('renderiza un <p> con variante body por defecto', async () => {
        const el = await fixture(new FinapText());
        const p = el.shadowRoot?.querySelector('p');
        expect(p).not.toBeNull();
        expect(p?.classList.contains('body')).toBe(true);
        teardown(el);
    });
    it('aplica la variante muted', async () => {
        const el = new FinapText();
        el.variant = 'muted';
        await fixture(el);
        expect(el.shadowRoot?.querySelector('p')?.classList.contains('muted')).toBe(true);
        teardown(el);
    });
    it('usa tokens de texto', () => {
        const cssText = FinapText.styles.cssText;
        expect(cssText).toContain('var(--finap-color-text)');
        expect(cssText).toContain('var(--finap-font-size-md)');
    });
});
