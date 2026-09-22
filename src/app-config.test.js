import { describe, it, expect } from 'vitest';
import { appConfig } from './app-config.js';
describe('app-config', () => {
    it('apunta al nodo principal #app', () => {
        expect(appConfig.mainNode).toBe('app');
    });
    it('incluye la ruta raíz hacia la landing', () => {
        expect(appConfig.routes?.some((r) => r.name === 'landing')).toBe(true);
    });
});
