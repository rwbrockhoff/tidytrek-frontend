import { type Category, type Pack } from '@/types/pack-types';

// Determines whether pack is empty with no user data
// Used to render an onboarding card for improved UX

export const isUntouchedPack = (
	canEdit: boolean,
	packCategories: Category[],
	currentPack: Pack,
	packDescription: string,
	packUrl: string,
): boolean => {
	return (
		canEdit &&
		packCategories.length <= 1 &&
		(packCategories.length === 0 || packCategories[0].packItems?.length <= 1) &&
		(packCategories.length === 0 ||
			!packCategories[0].packItems?.length ||
			!packCategories[0].packItems[0].packItemName ||
			packCategories[0].packItems[0].packItemName.trim() === '') &&
		!packDescription &&
		!packUrl &&
		!currentPack.packLocationTag &&
		!currentPack.packDurationTag &&
		!currentPack.packSeasonTag &&
		!currentPack.packDistanceTag
	);
};
