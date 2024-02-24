import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileSettingsKeys, profileKeys, userKeys } from './queryKeys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { InitialState } from '../types/profileTypes';

export const useGetProfileSettingsQuery = () =>
	useQuery<InitialState>({
		queryKey: profileSettingsKeys.all,
		queryFn: () => tidyTrekAPI.get('/profile-settings/').then((res) => res.data),
	});

export const useAddSocialLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (socialInfo: { service: string; socialLink: string }) =>
			tidyTrekAPI.post('/profile-settings/social-link', socialInfo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useDeleteSocialLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (socialLinkId: number) =>
			tidyTrekAPI.delete(`/profile-settings/social-link/${socialLinkId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useEditProfileMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (profileInfo: { userLocation: string; userBio: string }) =>
			tidyTrekAPI.put('/profile-settings/', profileInfo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
		},
	});
};

export const useUploadProfilePhotoMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) =>
			tidyTrekAPI.post('/profile-settings/profile-photo', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useDeleteProfilePhotoMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.delete(`/profile-settings/profile-photo`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileSettingsKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useUploadBannerPhotoMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) =>
			tidyTrekAPI.post('/profile-settings/banner-photo', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};
