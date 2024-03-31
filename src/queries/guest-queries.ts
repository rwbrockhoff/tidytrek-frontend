import { useQuery } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { guestKeys } from './query-keys';
import { decode } from '../utils';
import { type Pack, type Category } from '../types/pack-types';
import { type Settings } from '../types/settings-types';
import { type UserProfileWithPack, type UserProfile } from '../types/profile-types';

export type InitialState = {
	pack: Pack;
	categories: Category[];
	settings: Settings;
	userProfile: UserProfile;
};

type GuestProfileViewState = {
	settings: Settings;
} & UserProfileWithPack;

export const useViewPackQuery = (packId: string | undefined) => {
	const decodedId = packId ? decode(packId) : null;

	return useQuery<InitialState>({
		queryKey: guestKeys.packId(decodedId as number | null),
		queryFn: () => {
			if (packId) {
				const decodedId = decode(packId);
				return tidyTrekAPI.get(`/guests/pack/${decodedId}`).then((res) => res.data);
			} else return tidyTrekAPI.get('/guests/pack').then((res) => res.data);
		},
	});
};

export const useViewProfileQuery = (username: string | undefined) => {
	return useQuery<GuestProfileViewState>({
		queryKey: guestKeys.username(username),
		queryFn: () => tidyTrekAPI.get(`/guests/user/${username}`).then((res) => res.data),
	});
};
