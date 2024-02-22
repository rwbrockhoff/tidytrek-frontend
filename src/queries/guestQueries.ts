import { useQuery } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { guestKeys } from './queryKeys';
import { decode } from '../utils/generateDisplayId';
import { type Pack, type Category } from '../types/packTypes';
import { type Settings } from '../types/settingsTypes';
import { ProfileSettings, SocialLink } from '../types/profileSettingsTypes';

export type InitialState = {
	pack: Pack;
	categories: Category[];
	settings: Settings;
	profileSettings: ProfileSettings;
	socialLinks: SocialLink[];
	user: { firstName: string; username: string };
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
