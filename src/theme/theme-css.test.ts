import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const themeCss = readFileSync(join(import.meta.dirname, 'theme.css'), 'utf8');

describe('theme.css', () => {
  it('define el bloque de tema oscuro explícito', () => {
    expect(themeCss).toContain("[data-theme='dark']");
  });

  it('cubre fondos, texto y superficie en modo oscuro', () => {
    const dark = themeCss.slice(themeCss.indexOf("[data-theme='dark']"));
    expect(dark).toContain('--finap-color-bg');
    expect(dark).toContain('--finap-color-surface');
    expect(dark).toContain('--finap-color-text');
    expect(dark).toContain('--finap-color-border');
  });

  it('cubre acentos de marca y gradiente en modo oscuro', () => {
    const dark = themeCss.slice(themeCss.indexOf("[data-theme='dark']"));
    expect(dark).toContain('--finap-color-primary');
    expect(dark).toContain('--finap-color-secondary');
    expect(dark).toContain('--finap-color-accent');
    expect(dark).toContain('--finap-gradient-brand');
  });

  it('respeta prefers-color-scheme: dark', () => {
    expect(themeCss).toContain('prefers-color-scheme: dark');
  });
});
