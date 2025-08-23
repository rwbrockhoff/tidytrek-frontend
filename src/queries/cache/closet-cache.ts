import { type GearClosetItem } from '@/types/pack-types';

export const removeClosetItemFromCache = (
	state: { gearClosetList: GearClosetItem[] } | undefined,
	packItemId: number,
): { gearClosetList: GearClosetItem[] } | undefined => {
	if (!state) return state;

	return {
		...state,
		gearClosetList: state.gearClosetList.filter((item) => item.packItemId !== packItemId),
	};
};

export const updateClosetItemInCache = (
	state: { gearClosetList: GearClosetItem[] } | undefined,
	packItemId: number,
	updatedItem: Partial<GearClosetItem>,
): { gearClosetList: GearClosetItem[] } | undefined => {
	if (!state) return state;

	return {
		...state,
		gearClosetList: state.gearClosetList.map((item) =>
			item.packItemId === packItemId ? { ...item, ...updatedItem } : item,
		),
	};
};

export const addClosetItemToCache = (
	state: { gearClosetList: GearClosetItem[] } | undefined,
	newItem: GearClosetItem,
): { gearClosetList: GearClosetItem[] } | undefined => {
	if (!state) return state;

	return {
		...state,
		gearClosetList: [...state.gearClosetList, newItem],
	};
};
