let pendingSearch = '';

export function setPendingSearch(term: string): void {
  pendingSearch = term.trim();
}

export function consumePendingSearch(): string {
  const term = pendingSearch;
  pendingSearch = '';
  return term;
}
