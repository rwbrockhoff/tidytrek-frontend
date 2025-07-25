import { UseMutationResult } from '@tanstack/react-query';

// Simplified mutation type that extracts data from AxiosResponse
// Usage: SimpleMutation<RequestType, ResponseType> for cleaner data access
// Example: addNewPack: SimpleMutation<void, Pack>;

export type SimpleMutation<T, TData = unknown> = UseMutationResult<
	TData,
	Error,
	T,
	unknown
>;
