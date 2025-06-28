import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type UserProfileWithPack } from '../types/profile-types';
import { STALE_TIME } from './query-config';

export const useGetProfileQuery = () =>
	useQuery<UserProfileWithPack>({
		queryKey: profileKeys.all,
		staleTime: STALE_TIME,
		queryFn: () => tidyTrekAPI.get('/profile/').then((res) => res.data),
	});
