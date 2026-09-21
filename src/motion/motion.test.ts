import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const motionCss = readFileSync(new URL('./motion.css', import.meta.url), 'utf8');

describe('motion.css', () => {
  it('define keyframes de fade y slide', () => {
    expect(motionCss).toContain('@keyframes finap-fade-in');
    expect(motionCss).toContain('@keyframes finap-slide-in-up');
    expect(motionCss).toContain('@keyframes finap-slide-in-left');
  });

  it('define clases de entrada', () => {
    expect(motionCss).toContain('.finap-fade-in');
    expect(motionCss).toContain('.finap-slide-in-up');
  });

  it('define el reveal on scroll con estado oculto y revelado', () => {
    expect(motionCss).toContain('.finap-reveal');
    expect(motionCss).toContain('.finap-revealed');
  });

  it('desactiva animaciones bajo prefers-reduced-motion', () => {
    const block = motionCss.slice(motionCss.indexOf('prefers-reduced-motion'));
    expect(block).toContain('animation: none');
    expect(block).toContain('transition: none');
  });
});
