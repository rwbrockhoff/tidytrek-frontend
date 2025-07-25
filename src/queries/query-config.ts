// React Query config constants

export const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const RETRY_COUNT = 3;

// Retry backoff delay: 1s, 2s, 4s (exponential, max is 10s)
export const RETRY_DELAY = (attemptIndex: number) =>
	Math.min(1000 * 2 ** attemptIndex, 10000);
