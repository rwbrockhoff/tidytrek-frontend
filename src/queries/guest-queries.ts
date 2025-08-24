import { useQuery } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrek-api';
import { guestKeys } from './query-keys';
import { extractData } from './extract-data';
import { decode } from '../utils';
import { type Pack, type Category } from '../types/pack-types';
import { type Settings } from '../types/settings-types';
import { type BaseProfileState, type UserProfile } from '../types/profile-types';
import { isAxiosError } from '../hooks/form/use-axios-error';

export type GuestQueryState = {
	pack: Pack;
	categories: Category[];
	settings: Settings;
	userProfile: UserProfile;
};

export type GuestProfileViewState = BaseProfileState & {
	// Values unique to guest view for better error handling
	notFound?: boolean;
	isPrivate?: boolean;
	hasError?: boolean;
};

// Type check util if data is from guest profile query
const hasGuestProfileProperties = (obj: object): obj is GuestProfileViewState => {
	return 'notFound' in obj || 'isPrivate' in obj || 'hasError' in obj;
};

export const isGuestProfileData = (data: unknown): data is GuestProfileViewState => {
	return !!data && typeof data === 'object' && hasGuestProfileProperties(data);
};

export const useViewPackQuery = (
	packId: string | undefined,
	options?: { enabled?: boolean },
) => {
	const decodedId = packId ? decode(packId) : null;

	return useQuery<GuestQueryState>({
		queryKey: guestKeys.packId(decodedId),
		queryFn: () =>
			tidyTrekAPI.get(`/guests/pack/${decodedId}`).then(extractData<GuestQueryState>),
		enabled: options?.enabled ?? !!packId,
	});
};

const defaultProfileState = {
	userProfile: null,
	packThumbnailList: [],
	settings: null,
};

export const useViewProfileQuery = (username: string | undefined) => {
	return useQuery<GuestProfileViewState>({
		queryKey: guestKeys.username(username),
		queryFn: async () => {
			try {
				const response = await tidyTrekAPI.get(`/guests/user/${username}`);
				const data = extractData<BaseProfileState>(response);
				// Check if profile is private (200 response but null user data)
				if (data.userProfile === null) {
					return {
						...defaultProfileState,
						isPrivate: true,
					};
				}
				return data;
			} catch (error: unknown) {
				// Handle 404 - user not found
				if (isAxiosError(error) && error.response?.status === 404) {
					return {
						...defaultProfileState,
						notFound: true,
					};
				}
				// Handle all other errors
				return {
					...defaultProfileState,
					hasError: true,
				};
			}
		},
		enabled: !!username,
	});
};
