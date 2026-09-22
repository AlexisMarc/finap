declare module '@open-cells/core/src/router.js' {
  export class Router {
    constructor();
    useHistory: boolean;
    _getHashPath(): string;
    _getURLPath(): string;
  }
}
