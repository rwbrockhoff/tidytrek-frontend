import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrek-api';
import { type BaseProfileState } from '../types/profile-types';
import { STALE_TIME } from './query-config';
import { extractData } from './extract-data';

export type ProfileQueryState = BaseProfileState & {
	hasError?: boolean;
};

const defaultProfileState: ProfileQueryState = {
	userProfile: null,
	packThumbnailList: [],
	settings: null,
};

export const useGetProfileQuery = () =>
	useQuery<ProfileQueryState>({
		queryKey: profileKeys.all,
		staleTime: STALE_TIME,
		queryFn: async () => {
			try {
				const response = await tidyTrekAPI.get('/profile/');
				return extractData<ProfileQueryState>(response);
			} catch (error) {
				return {
					...defaultProfileState,
					hasError: true,
				};
			}
		},
	});
