import { type PackQueryState, type PackItem } from '@/types/pack-types';

export const removePackItemFromCache = (
	state: PackQueryState | undefined,
	packItemId: number,
): PackQueryState | undefined => {
	if (!state) return state;

	return {
		...state,
		categories: state.categories.map((category) => ({
			...category,
			packItems: category.packItems.filter((item) => item.packItemId !== packItemId),
		})),
	};
};

export const updatePackItemInCache = (
	state: PackQueryState | undefined,
	updatedItem: PackItem,
): PackQueryState | undefined => {
	if (!state) return state;

	return {
		...state,
		categories: state.categories.map((category) => ({
			...category,
			packItems: category.packItems.map((item) =>
				item.packItemId === updatedItem.packItemId ? updatedItem : item,
			),
		})),
	};
};

export const updatePackItemIndexInCache = (
	state: PackQueryState | undefined,
	packItemId: string,
	newIndex: string,
): PackQueryState | undefined => {
	if (!state) return state;

	return {
		...state,
		categories: state.categories.map((category) => ({
			...category,
			packItems: category.packItems.map((item) =>
				item.packItemId.toString() === packItemId
					? { ...item, packItemIndex: newIndex }
					: item,
			),
		})),
	};
};
