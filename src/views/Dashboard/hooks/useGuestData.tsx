import { isGuestData } from '../../../shared/theme/themeUtils';
import { InitialState as PackState } from '../../../types/packTypes';
import { InitialState as GuestState } from '../../../queries/guestQueries';

const useGuestData = (data: PackState | GuestState | undefined) => {
	const isGuest = isGuestData(data);

	if (isGuest) {
		const { user, profileSettings, settings, socialLinks } = data;
		return { user, profile: profileSettings, settings, socialLinks };
	} else return { user: null, theme: {}, profile: null, settings: null, socialLinks: [] };
};

export default useGuestData;
