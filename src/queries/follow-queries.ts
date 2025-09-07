import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { extractData } from './extract-data';
import { guestKeys } from './query-keys';
import type { GuestProfileViewState } from './guest-queries';

export const followKeys = {
	all: ['follows'] as const,
	following: () => [...followKeys.all, 'following'] as const,
	followers: () => [...followKeys.all, 'followers'] as const,
	counts: () => [...followKeys.all, 'counts'] as const,
} as const;

type FollowingUser = {
	userId: string;
	username: string;
	firstName: string;
	trailName: string | null;
	profilePhotoUrl: string | null;
	followedAt: string;
};

type FollowingListResponse = {
	following: FollowingUser[];
};

type FollowersListResponse = {
	followers: FollowingUser[];
};

type FollowCounts = {
	followerCount: number;
	followingCount: number;
};

export const useFollowUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (username: string) =>
			tidyTrekAPI.post(`/follows/${username}`).then(extractData),
		onSuccess: (_, username) => {
			queryClient.setQueryData<GuestProfileViewState>(guestKeys.user(username), (old) =>
				old ? { ...old, isFollowing: true } : old,
			);
			// Invalidate follow queries to refresh counts and following list
			queryClient.invalidateQueries({ queryKey: followKeys.counts() });
			queryClient.invalidateQueries({ queryKey: followKeys.following() });
			queryClient.invalidateQueries({ queryKey: followKeys.followers() });
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
			// Refresh counts & following list
			queryClient.invalidateQueries({ queryKey: followKeys.counts() });
			queryClient.invalidateQueries({ queryKey: followKeys.following() });
			queryClient.invalidateQueries({ queryKey: followKeys.followers() });
		},
	});
};

export const useFollowingQuery = () => {
	return useQuery({
		queryKey: followKeys.following(),
		queryFn: () =>
			tidyTrekAPI.get('/follows/following').then(extractData<FollowingListResponse>),
		select: (data) => data.following,
	});
};

export const useFollowersQuery = () => {
	return useQuery({
		queryKey: followKeys.followers(),
		queryFn: () =>
			tidyTrekAPI.get('/follows/followers').then(extractData<FollowersListResponse>),
		select: (data) => data.followers,
	});
};

export const useFollowCountsQuery = () => {
	return useQuery({
		queryKey: followKeys.counts(),
		queryFn: () => tidyTrekAPI.get('/follows/counts').then(extractData<FollowCounts>),
	});
};
