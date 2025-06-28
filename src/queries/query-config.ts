// React Query config constants

// 5 minutes - prevents excess refetching
export const STALE_TIME = 5 * 60 * 1000;

// Retry count for failed queries
export const RETRY_COUNT = 3;

// Retry backoff delay: 1s, 2s, 4s (exponential, max is 10s as a fallback)
export const RETRY_DELAY = (attemptIndex: number) =>
	Math.min(1000 * 2 ** attemptIndex, 10000);
