import { useQuery } from '@tanstack/react-query';
import { userProfileKeys } from './queryKeys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { InitialState } from '../types/profileSettingsTypes';

export const useGetProfileSettingsQuery = () =>
	useQuery<InitialState>({
		queryKey: userProfileKeys.all,
		queryFn: () => tidyTrekAPI.get('/user-profile/').then((res) => res.data),
	});
