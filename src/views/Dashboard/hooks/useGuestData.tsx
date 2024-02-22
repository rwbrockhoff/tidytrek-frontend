import { isGuestData } from '../../Layout/themeUtils';
import { InitialState as PackState } from '../../../types/packTypes';
import { InitialState as GuestState } from '../../../queries/guestQueries';

const useGuestData = (data: PackState | GuestState | undefined) => {
	const isGuest = isGuestData(data);

	if (isGuest) {
		const { user, profileSettings, socialLinks } = data;
		return { user, profile: profileSettings, socialLinks };
	} else return { user: null, theme: {}, profile: null, socialLinks: [] };
};

export default useGuestData;
