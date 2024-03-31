import { isGuestData } from '@/styles/theme/theme-utils';
import { InitialState as PackState } from '@/types/pack-types';
import { InitialState as GuestState } from '@/queries/guest-queries';

export const useGuestData = (data: PackState | GuestState | undefined) => {
	const isGuest = isGuestData(data);

	if (isGuest) {
		const { userProfile, settings } = data;
		return { userProfile, settings };
	} else return { user: null, theme: {}, profile: null, settings: null, socialLinks: [] };
};
