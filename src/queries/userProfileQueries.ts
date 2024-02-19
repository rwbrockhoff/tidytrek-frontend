import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userProfileKeys } from './queryKeys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { InitialState } from '../types/profileSettingsTypes';

export const useGetProfileSettingsQuery = () =>
	useQuery<InitialState>({
		queryKey: userProfileKeys.all,
		queryFn: () => tidyTrekAPI.get('/user-profile/').then((res) => res.data),
	});

export const useAddSocialLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (socialInfo: { service: string; socialLink: string }) =>
			tidyTrekAPI.post('/user-profile/social-link', socialInfo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
		},
	});
};

export const useDeleteSocialLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (socialLinkId: number) =>
			tidyTrekAPI.delete(`/user-profile/social-link/${socialLinkId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
		},
	});
};
