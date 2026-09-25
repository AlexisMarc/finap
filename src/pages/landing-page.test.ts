import { describe, it, expect, beforeEach } from 'vitest';

import { LandingPage } from './landing-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { setLocale } from '../i18n/i18n.js';

describe('landing-page', () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale('es');
  });

  it('renderiza header, hero, funciones, beneficios, CTA y footer', async () => {
    const el = await fixture(new LandingPage());

    expect(el.shadowRoot?.querySelector('.site-header')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.hero')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.features')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.benefits')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.cta')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.site-footer')).not.toBeNull();
    teardown(el);
  });

  it('muestra el logo de marca, navegación y toggle de tema en el header', async () => {
    const el = await fixture(new LandingPage());

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.site-header finap-brand-mark')).not.toBeNull();
    expect(root.querySelector('.nav')).not.toBeNull();
    expect(root.querySelector('.site-header sp-action-button')).not.toBeNull();
    teardown(el);
  });

  it('muestra el hero con headline, imagen cálida y CTAs primario y secundario', async () => {
    const el = await fixture(new LandingPage());

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.hero finap-heading')).not.toBeNull();
    expect(root.querySelector('.hero sp-button[variant="accent"]')).not.toBeNull();
    expect(root.querySelector('.hero sp-button[static-color="white"]')).not.toBeNull();
    expect(LandingPage.styles.cssText).toContain('almas-salakhov');
    teardown(el);
  });

  it('no usa el rombo decorativo del hero', async () => {
    const el = await fixture(new LandingPage());

    expect(el.shadowRoot?.querySelector('.hero__mark')).toBeNull();
    teardown(el);
  });

  it('lista las funciones del producto con tarjeta e imagen', async () => {
    const el = await fixture(new LandingPage());

    const features = el.shadowRoot?.querySelectorAll('.features .feature');
    expect(features?.length).toBe(6);
    expect(
      el.shadowRoot?.querySelector('.feature img[slot="cover-photo"]'),
    ).not.toBeNull();
    teardown(el);
  });

  it('lista los beneficios como coachmarks con imagen', async () => {
    const el = await fixture(new LandingPage());

    const benefits = el.shadowRoot?.querySelectorAll('.benefits sp-coachmark');
    expect(benefits?.length).toBe(6);
    expect(
      el.shadowRoot?.querySelector('.benefit img[slot="asset"]'),
    ).not.toBeNull();
    teardown(el);
  });

  it('muestra la llamada a la acción final sobre imagen azul', async () => {
    const el = await fixture(new LandingPage());

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.cta sp-button[size="xl"]')).not.toBeNull();
    expect(LandingPage.styles.cssText).toContain('isaac-quesada');
    teardown(el);
  });

  it('muestra los datos de contacto en el footer', async () => {
    const el = await fixture(new LandingPage());

    const links = Array.from(
      el.shadowRoot?.querySelectorAll('.site-footer sp-link') ?? [],
    ).map((link) => link.getAttribute('href'));
    expect(links).toContain('mailto:marcos.rincon1903@gmail.com');
    expect(links).toContain('https://github.com/AlexisMarc');
    expect(links).toContain('https://www.linkedin.com/in/alexis-rincon-buitrago');
    teardown(el);
  });

  it('se revela al conectar (entrada orquestada)', async () => {
    const el = await fixture(new LandingPage());
    expect(el.classList.contains('finap-reveal')).toBe(true);
    teardown(el);
  });

  it('muestra el selector de idioma en el header', async () => {
    const el = await fixture(new LandingPage());
    expect(
      el.shadowRoot?.querySelector('.site-header sp-picker'),
    ).not.toBeNull();
    teardown(el);
  });

  it('traduce el contenido al cambiar de idioma', async () => {
    const el = await fixture(new LandingPage());

    setLocale('en');
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.hero finap-heading')?.textContent).toContain(
      'Your money',
    );
    teardown(el);
  });
});
