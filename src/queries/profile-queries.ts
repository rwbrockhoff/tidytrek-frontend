import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type UserProfile } from '../types/profile-types';
import { type Pack } from '../types/pack-types';
import { STALE_TIME } from './query-config';

type ProfileQueryState = {
	userProfile: UserProfile | null;
	packThumbnailList: Pack[];
	hasError?: boolean;
};

const defaultProfileState: ProfileQueryState = {
	userProfile: null,
	packThumbnailList: [],
};

export const useGetProfileQuery = () =>
	useQuery<ProfileQueryState>({
		queryKey: profileKeys.all,
		staleTime: STALE_TIME,
		queryFn: async () => {
			try {
				const response = await tidyTrekAPI.get('/profile/');
				return response.data;
			} catch (error) {
				return {
					...defaultProfileState,
					hasError: true,
				};
			}
		},
	});
