import { vi } from 'vitest';
import type { UseQueryResult } from '@tanstack/react-query';

// Creates a properly defined query response handling all query properties
// while allowing us to pass in our expected type

// QueryResponse (typed) + Our Expected Data (typed)
// Example: const queryResponse = createQueryResponse<AuthStatusResponse>({ isLoading: true });

export const createQueryResponse = <T>(
	overrides?: Partial<UseQueryResult<T, Error>>,
): UseQueryResult<T, Error> =>
	({
		data: undefined,
		error: null,
		isError: false,
		isLoading: false,
		isPending: false,
		isSuccess: true,
		isLoadingError: false,
		isRefetchError: false,
		status: 'success',
		fetchStatus: 'idle',
		isInitialLoading: false,
		isFetching: false,
		isStale: false,
		isPlaceholderData: false,
		isPaused: false,
		refetch: vi.fn(),
		...overrides,
	}) as UseQueryResult<T, Error>;
