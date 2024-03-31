import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type UserProfileWithPack } from '../types/profile-types';

export const useGetProfileQuery = () =>
	useQuery<UserProfileWithPack>({
		queryKey: profileKeys.all,
		queryFn: () => tidyTrekAPI.get('/profile/').then((res) => res.data),
	});
