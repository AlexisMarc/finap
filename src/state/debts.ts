export const DEBTS_CHANGED_EVENT = 'finap-debts-changed';

export function notifyDebtsChanged(): void {
  window.dispatchEvent(new CustomEvent(DEBTS_CHANGED_EVENT));
}
