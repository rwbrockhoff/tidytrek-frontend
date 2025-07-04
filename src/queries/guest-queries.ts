import { useQuery } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { guestKeys } from './query-keys';
import { decode, extractData } from '../utils';
import { type Pack, type Category } from '../types/pack-types';
import { type Settings } from '../types/settings-types';
import { type BaseProfileState, type UserProfile } from '../types/profile-types';

export type InitialState = {
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
export const isGuestProfileData = (data: any): data is GuestProfileViewState => {
	return (
		!!data &&
		(data.notFound !== undefined ||
			data.isPrivate !== undefined ||
			data.hasError !== undefined)
	);
};

export const useViewPackQuery = (packId: string | undefined) => {
	const decodedId = packId ? decode(packId) : null;

	return useQuery<InitialState>({
		queryKey: guestKeys.packId(decodedId as number | null),
		queryFn: () => {
			if (packId) {
				const decodedId = decode(packId);
				return tidyTrekAPI.get(`/guests/pack/${decodedId}`).then(extractData);
			} else return tidyTrekAPI.get('/guests/pack').then(extractData);
		},
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
				const data = extractData(response);
				// Check if profile is private (200 response but null user data)
				if (data.userProfile === null) {
					return {
						...defaultProfileState,
						isPrivate: true,
					};
				}
				return data;
			} catch (error: any) {
				// Handle 404 - user not found
				if (error.response?.status === 404) {
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
	});
};
