/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register';

let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

export function registerServiceWorker(): void {
  updateSW = registerSW({
    immediate: true,
    onNeedRefresh(): void {
      window.dispatchEvent(new CustomEvent('finap-update-available'));
    },
  });
}

export function updateServiceWorker(): void {
  void updateSW?.(true);
}
