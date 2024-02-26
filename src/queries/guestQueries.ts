import { useQuery } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { guestKeys } from './queryKeys';
import { decode } from '../utils/generateDisplayId';
import { type Pack, type Category } from '../types/packTypes';
import { type Settings } from '../types/settingsTypes';
import { type UserProfileWithPack, type UserProfile } from '../types/profileTypes';

export type InitialState = {
	pack: Pack;
	categories: Category[];
	settings: Settings;
	userProfile: UserProfile;
};

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

export const useViewProfileQuery = (userId: string | undefined) => {
	const decodedId = userId ? decode(userId) : null;
	const decodedUserName = !decodedId ? userId : null;

	return useQuery<UserProfileWithPack>({
		queryKey: guestKeys.packId(decodedId as number | null),
		queryFn: () => {
			const decodedUserId = userId && decode(userId);
			return tidyTrekAPI
				.get(`/guests/user/${decodedUserId}/${decodedUserName}`)
				.then((res) => res.data);
		},
	});
};
