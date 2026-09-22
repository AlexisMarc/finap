import { describe, it, expect } from 'vitest';

import { LandingPage } from './landing-page.js';
import { fixture, teardown } from '../test/fixture.js';

describe('landing-page', () => {
  it('renderiza header, hero, funciones y footer', async () => {
    const el = await fixture(new LandingPage());

    expect(el.shadowRoot?.querySelector('.site-header')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.hero')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.features')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.site-footer')).not.toBeNull();
    teardown(el);
  });

  it('muestra el logo de marca, navegación y toggle de tema en el header', async () => {
    const el = await fixture(new LandingPage());

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.site-header finap-brand-mark')).not.toBeNull();
    expect(root.querySelector('.nav')).not.toBeNull();
    expect(root.querySelector('.site-header finap-theme-toggle')).not.toBeNull();
    teardown(el);
  });

  it('muestra el hero con headline y CTAs primario y secundario', async () => {
    const el = await fixture(new LandingPage());

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.hero finap-heading')).not.toBeNull();
    expect(root.querySelector('.hero finap-button:not([variant])')).not.toBeNull();
    expect(root.querySelector('.hero finap-button[variant="secondary"]')).not.toBeNull();
    teardown(el);
  });

  it('lista las funciones del producto', async () => {
    const el = await fixture(new LandingPage());

    const features = el.shadowRoot?.querySelectorAll('.features .feature');
    expect(features?.length).toBe(3);
    teardown(el);
  });

  it('usa el gradiente de marca como acento decorativo', () => {
    expect(LandingPage.styles.cssText).toContain('var(--finap-gradient-brand)');
  });

  it('se revela al conectar (entrada orquestada)', async () => {
    const el = await fixture(new LandingPage());
    expect(el.classList.contains('finap-reveal')).toBe(true);
    teardown(el);
  });
});
