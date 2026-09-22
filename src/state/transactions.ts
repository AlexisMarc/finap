export const TRANSACTIONS_CHANGED_EVENT = 'finap-transactions-changed';

export function notifyTransactionsChanged(): void {
  window.dispatchEvent(new CustomEvent(TRANSACTIONS_CHANGED_EVENT));
}
