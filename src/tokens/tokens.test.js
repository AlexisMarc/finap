import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const tokensCss = readFileSync(join(import.meta.dirname, 'tokens.css'), 'utf8');
const REQUIRED_TOKENS = [
    '--finap-color-primary',
    '--finap-color-secondary',
    '--finap-color-accent',
    '--finap-color-bg',
    '--finap-color-text',
    '--finap-color-text-muted',
    '--finap-color-border',
    '--finap-space-1',
    '--finap-space-8',
    '--finap-radius-sm',
    '--finap-radius-lg',
    '--finap-shadow-sm',
    '--finap-shadow-lg',
    '--finap-breakpoint-sm',
    '--finap-breakpoint-xl',
    '--finap-container-max-width',
    '--finap-gradient-brand',
];
describe('tokens.css', () => {
    it('usa el prefijo --finap-', () => {
        expect(tokensCss).toMatch(/--finap-/);
    });
    it.each(REQUIRED_TOKENS)('declara el token %s', (token) => {
        expect(tokensCss).toMatch(new RegExp(`${token}\\s*:`));
    });
    it('declara la paleta inspirada en Mastercard', () => {
        expect(tokensCss).toContain('#eb001b');
        expect(tokensCss).toContain('#ff5f00');
        expect(tokensCss).toContain('#f79e1b');
    });
    it('declara el gradiente de marca con los tres colores', () => {
        const block = tokensCss.slice(tokensCss.indexOf('--finap-gradient-brand'));
        expect(block).toContain('--finap-color-primary');
        expect(block).toContain('--finap-color-secondary');
        expect(block).toContain('--finap-color-accent');
    });
});
