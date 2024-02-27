import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './queryKeys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type UserProfileWithPack } from '../types/profileTypes';

export const useGetProfileQuery = () =>
	useQuery<UserProfileWithPack>({
		queryKey: profileKeys.all,
		queryFn: () => tidyTrekAPI.get('/profile/').then((res) => res.data),
	});
