import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const motionTokensCss = readFileSync(
  join(import.meta.dirname, 'motion.css'),
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
