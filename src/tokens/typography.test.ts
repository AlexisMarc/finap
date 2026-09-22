import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const typographyCss = readFileSync(
  join(import.meta.dirname, 'typography.css'),
  'utf8',
);

describe('typography.css', () => {
  it('declara la familia tipográfica', () => {
    expect(typographyCss).toMatch(/--finap-font-family\s*:/);
  });

  it('declara la familia display (Sora)', () => {
    expect(typographyCss).toMatch(/--finap-font-family-display\s*:/);
    expect(typographyCss).toContain('Sora');
  });

  it('usa Inter como familia de cuerpo', () => {
    expect(typographyCss).toContain('Inter');
  });

  it.each([
    '--finap-font-size-xs',
    '--finap-font-size-md',
    '--finap-font-size-3xl',
    '--finap-font-size-4xl',
    '--finap-letter-spacing-tight',
    '--finap-font-weight-regular',
    '--finap-font-weight-bold',
    '--finap-line-height-tight',
    '--finap-line-height-loose',
  ])('declara el token %s', (token) => {
    expect(typographyCss).toMatch(new RegExp(`${token}\\s*:`));
  });
});
