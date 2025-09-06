import { isGuestProfileData } from '@/queries/guest-queries';
import type { GuestProfileViewState } from '@/queries/guest-queries';
import type { BaseProfileState } from '@/types/profile-types';

type UseGuestProfileDataReturn = {
	notFound: boolean;
	isPrivate: boolean;
	isFollowing?: boolean;
	showSkeletonCards: boolean;
};

export const useGuestProfileData = (
	data: GuestProfileViewState | BaseProfileState | undefined,
): UseGuestProfileDataReturn => {
	if (!isGuestProfileData(data)) {
		return {
			notFound: false,
			isPrivate: false,
			isFollowing: undefined,
			showSkeletonCards: false,
		};
	}

	const notFound = data.notFound ?? false;
	const isPrivate = data.isPrivate ?? false;
	const isFollowing = data.isFollowing;
	const showSkeletonCards = notFound || isPrivate;

	return {
		notFound,
		isPrivate,
		isFollowing,
		showSkeletonCards,
	};
};
