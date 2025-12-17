const NETWORK_ERROR_PATTERNS = [
  'network request failed',
  'fetch failed',
  'timeout',
  'enotfound',
  'econnrefused',
  'econnreset',
  'network error',
  'no internet',
  'offline',
];

export function isNetworkError(error: unknown): boolean {
  if (!error) return false;

  const message = error instanceof Error
    ? error.message.toLowerCase()
    : String(error).toLowerCase();

  return NETWORK_ERROR_PATTERNS.some(pattern => message.includes(pattern));
}
