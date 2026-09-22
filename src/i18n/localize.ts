import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { getLocale, t, LOCALE_CHANGED_EVENT, type Locale } from './i18n.js';

/**
 * Controller que re-renderiza el host al cambiar el idioma y expone `t()`.
 */
export class LocalizeController implements ReactiveController {
  constructor(private host: ReactiveControllerHost) {
    host.addController(this);
  }

  private _onChange = (): void => {
    this.host.requestUpdate();
  };

  hostConnected(): void {
    document.documentElement.addEventListener(
      LOCALE_CHANGED_EVENT,
      this._onChange,
    );
  }

  hostDisconnected(): void {
    document.documentElement.removeEventListener(
      LOCALE_CHANGED_EVENT,
      this._onChange,
    );
  }

  t(key: string): string {
    return t(key);
  }

  get locale(): Locale {
    return getLocale();
  }
}
