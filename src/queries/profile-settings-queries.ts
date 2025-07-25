import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileSettingsKeys, profileKeys, userKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrek-api';
import { ProfileQueryState } from '../types/profile-types';
import { type UserInfo } from '../types/profile-types';
import { type SimpleMutation } from './mutation-types';
import { extractData } from './extract-data';

export const useGetProfileSettingsQuery = () =>
	useQuery<ProfileQueryState>({
		queryKey: profileSettingsKeys.all,
		queryFn: () =>
			tidyTrekAPI.get('/profile-settings/').then(extractData<ProfileQueryState>),
	});

export const useGenerateUsernameQuery = () =>
	useQuery<{ username: string }>({
		queryKey: profileSettingsKeys.username,
		queryFn: () =>
			tidyTrekAPI
				.get('/profile-settings/random-username')
				.then(extractData<{ username: string }>),
		enabled: false, // Only run when manually triggered
	});

export const useUpdateUsernameMutation = (): SimpleMutation<
	{ username: string; trailName: string },
	{ message?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userInfo: { username: string; trailName: string }) =>
			tidyTrekAPI
				.put('/profile-settings/username', userInfo)
				.then(extractData<{ message?: string }>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useAddSocialLinkMutation = (): SimpleMutation<string> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (socialLinkUrl: string) =>
			tidyTrekAPI
				.post('/profile-settings/social-link', { socialLinkUrl })
				.then(extractData<void>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useDeleteSocialLinkMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (socialLinkId: number) =>
			tidyTrekAPI
				.delete(`/profile-settings/social-link/${socialLinkId}`)
				.then(extractData<void>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useEditProfileMutation = (): SimpleMutation<
	UserInfo,
	{ message?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (profileInfo: UserInfo) =>
			tidyTrekAPI
				.put('/profile-settings/', profileInfo)
				.then(extractData<{ message?: string }>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useUploadProfilePhotoMutation = (): SimpleMutation<
	FormData,
	{ profilePhotoUrl?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) =>
			tidyTrekAPI
				.post('/profile-settings/profile-photo', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then(extractData<{ profilePhotoUrl?: string }>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useDeleteProfilePhotoMutation = (): SimpleMutation<void, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () =>
			tidyTrekAPI.delete(`/profile-settings/profile-photo`).then(extractData<void>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useUploadBannerPhotoMutation = (): SimpleMutation<
	FormData,
	{ bannerPhotoUrl?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) =>
			tidyTrekAPI
				.post('/profile-settings/banner-photo', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then(extractData<{ bannerPhotoUrl?: string }>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};
