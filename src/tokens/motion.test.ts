import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const motionTokensCss = readFileSync(
  new URL('./motion.css', import.meta.url),
  'utf8',
);

describe('motion.css (tokens)', () => {
  it.each([
    '--finap-motion-duration-fast',
    '--finap-motion-duration-normal',
    '--finap-motion-duration-slow',
    '--finap-motion-easing-standard',
    '--finap-motion-easing-emphasized',
    '--finap-motion-easing-decelerate',
  ])('declara el token %s', (token) => {
    expect(motionTokensCss).toMatch(new RegExp(`${token}\\s*:`));
  });
});
