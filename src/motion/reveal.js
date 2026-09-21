const REVEAL_CLASS = 'finap-reveal';
const REVEALED_CLASS = 'finap-revealed';
/**
 * Controller que añade la clase `finap-reveal` al host y la marca como
 * `finap-revealed` cuando entra en el viewport, vía IntersectionObserver.
 */
export class RevealController {
    constructor(host) {
        this.host = host;
        host.addController(this);
    }
    hostConnected() {
        this.host.classList.add(REVEAL_CLASS);
        if (typeof IntersectionObserver === 'undefined') {
            this.host.classList.add(REVEALED_CLASS);
            return;
        }
        this.observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    this.host.classList.add(REVEALED_CLASS);
                    this.observer?.unobserve(entry.target);
                }
            }
        }, { threshold: 0.1 });
        this.observer.observe(this.host);
    }
    hostDisconnected() {
        this.observer?.disconnect();
        this.observer = undefined;
    }
}
