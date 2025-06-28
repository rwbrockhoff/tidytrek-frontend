import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Generic mutation type with optional response data type
// Usage: InternalMutation<RequestType, ResponseType> for API responses
// Example: editProfile: InternalMutation<UserInfo, ProfileResponse>;
export type InternalMutation<T, TData = unknown> = UseMutationResult<
	AxiosResponse<TData>,
	Error,
	T,
	unknown
>;

// Simplified mutation type that extracts data directly from AxiosResponse
// Usage: SimpleMutation<RequestType, ResponseType> for cleaner data access
// Example: addNewPack: SimpleMutation<void, Pack>;
export type SimpleMutation<T, TData = unknown> = UseMutationResult<
	TData,
	Error,
	T,
	unknown
>;
