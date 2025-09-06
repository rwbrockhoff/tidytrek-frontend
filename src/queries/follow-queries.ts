import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { extractData } from './extract-data';
import { guestKeys } from './query-keys';
import type { GuestProfileViewState } from './guest-queries';

export const followKeys = {
	all: ['follows'] as const,
} as const;

export const useFollowUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (username: string) =>
			tidyTrekAPI.post(`/follows/${username}`).then(extractData),
		onSuccess: (_, username) => {
			queryClient.setQueryData<GuestProfileViewState>(guestKeys.user(username), (old) =>
				old ? { ...old, isFollowing: true } : old,
			);
		},
	});
};

export const useUnfollowUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (username: string) =>
			tidyTrekAPI.delete(`/follows/${username}`).then(extractData),
		onSuccess: (_, username) => {
			queryClient.setQueryData<GuestProfileViewState>(guestKeys.user(username), (old) =>
				old ? { ...old, isFollowing: false } : old,
			);
		},
	});
};
