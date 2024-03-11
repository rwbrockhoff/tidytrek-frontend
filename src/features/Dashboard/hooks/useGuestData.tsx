import { isGuestData } from '../../../styles/theme/theme-utils';
import { InitialState as PackState } from '../../../types/packTypes';
import { InitialState as GuestState } from '../../../queries/guestQueries';

const useGuestData = (data: PackState | GuestState | undefined) => {
	const isGuest = isGuestData(data);

	if (isGuest) {
		const { userProfile, settings } = data;
		return { userProfile, settings };
	} else return { user: null, theme: {}, profile: null, settings: null, socialLinks: [] };
};

export default useGuestData;
