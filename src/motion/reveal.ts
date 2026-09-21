import type { ReactiveController, ReactiveControllerHost } from 'lit';

const REVEAL_CLASS = 'finap-reveal';
const REVEALED_CLASS = 'finap-revealed';

/**
 * Controller que añade la clase `finap-reveal` al host y la marca como
 * `finap-revealed` cuando entra en el viewport, vía IntersectionObserver.
 */
export class RevealController implements ReactiveController {
  private observer?: IntersectionObserver;

  constructor(private host: ReactiveControllerHost & HTMLElement) {
    host.addController(this);
  }

  hostConnected(): void {
    this.host.classList.add(REVEAL_CLASS);

    if (typeof IntersectionObserver === 'undefined') {
      this.host.classList.add(REVEALED_CLASS);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.host.classList.add(REVEALED_CLASS);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    this.observer.observe(this.host);
  }

  hostDisconnected(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
