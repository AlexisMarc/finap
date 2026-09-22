import { describe, it, expect } from 'vitest';
import { LandingPage } from './landing-page.js';
import { fixture, teardown } from '../test/fixture.js';
describe('landing-page', () => {
    it('renderiza hero, features y footer', async () => {
        const el = await fixture(new LandingPage());
        expect(el.shadowRoot?.querySelector('.hero')).not.toBeNull();
        expect(el.shadowRoot?.querySelector('.features')).not.toBeNull();
        expect(el.shadowRoot?.querySelector('.footer')).not.toBeNull();
        teardown(el);
    });
    it('muestra la marca y los tres colores de la paleta', async () => {
        const el = await fixture(new LandingPage());
        const root = el.shadowRoot;
        expect(root.querySelector('finap-brand-mark')).not.toBeNull();
        expect(root.querySelector('finap-button:not([variant])')).not.toBeNull();
        expect(root.querySelector('finap-button[variant="secondary"]')).not.toBeNull();
        expect(root.querySelector('.hero__accent')).not.toBeNull();
        teardown(el);
    });
    it('lista las features del producto', async () => {
        const el = await fixture(new LandingPage());
        const cards = el.shadowRoot?.querySelectorAll('.features__grid finap-card');
        expect(cards?.length).toBe(4);
        teardown(el);
    });
    it('aplica el gradiente de marca en el hero', () => {
        expect(LandingPage.styles.cssText).toContain('var(--finap-gradient-brand)');
    });
    it('usa el accent amarillo como elemento decorativo', () => {
        expect(LandingPage.styles.cssText).toContain('var(--finap-color-accent)');
    });
    it('se revela al conectar (reveal on scroll)', async () => {
        const el = await fixture(new LandingPage());
        expect(el.classList.contains('finap-reveal')).toBe(true);
        teardown(el);
    });
});
