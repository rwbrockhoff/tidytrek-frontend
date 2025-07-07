import { PackQueryState as PackState } from '@/types/pack-types';
import { GuestQueryState as GuestState } from '@/queries/guest-queries';

const isGuestData = (data: PackState | GuestState | undefined): data is GuestState => {
	return (data && 'settings' in data) || false;
};

export const useGuestData = (data: PackState | GuestState | undefined) => {
	const isGuest = isGuestData(data);

	if (isGuest) {
		const { userProfile, settings } = data;
		return { userProfile, settings };
	} else return { user: null, theme: {}, profile: null, settings: null, socialLinks: [] };
};
