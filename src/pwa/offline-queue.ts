export interface QueuedRequest {
  url: string;
  method: string;
  body?: string;
}

const STORAGE_KEY = 'finap-outbox';

function read(): QueuedRequest[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as QueuedRequest[];
  } catch {
    return [];
  }
}

function write(items: QueuedRequest[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function enqueue(request: QueuedRequest): void {
  write([...read(), request]);
}

export function list(): QueuedRequest[] {
  return read();
}

export function clear(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Reenvía las peticiones encoladas. Devuelve cuántas se sincronizaron.
 */
export async function flush(): Promise<number> {
  const items = read();
  const remaining: QueuedRequest[] = [];
  let sent = 0;

  for (const item of items) {
    try {
      const response = await fetch(item.url, {
        method: item.method,
        headers: { 'Content-Type': 'application/json' },
        body: item.body,
      });
      if (response.status < 500) {
        sent += 1;
      } else {
        remaining.push(item);
      }
    } catch {
      remaining.push(item);
    }
  }

  write(remaining);
  return sent;
}
