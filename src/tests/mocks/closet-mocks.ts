import type { GearClosetItem, MoveGearClosetItemProps } from '@/types/pack-types';

export const createMockGearClosetItem = (
	overrides?: Partial<GearClosetItem>,
): GearClosetItem => ({
	packItemId: 1,
	packId: null,
	packCategoryId: null,
	packItemIndex: '1000',
	packItemName: 'Z-Packs Duplex 2P',
	packItemDescription: 'Two-person ultralight tent',
	packItemWeight: 21,
	packItemUnit: 'oz',
	packItemQuantity: 1,
	packItemUrl: 'https://zpacks.com/duplex-mock-tent',
	wornWeight: false,
	consumable: false,
	favorite: true,
	packItemPrice: 700.0,
	...overrides,
});

export const createMockGearClosetList = () => ({
	gearClosetList: [
		createMockGearClosetItem(),
		createMockGearClosetItem({
			packItemId: 2,
			packItemName: 'Petzl Headlamp',
			packItemDescription: 'Heavier backup headlamp for day hikes',
			packItemWeight: 3,
			packItemPrice: 70.0,
			packItemIndex: '2000',
		}),
	],
});

export const createMockMoveGearClosetItemProps = (
	overrides?: Partial<MoveGearClosetItemProps>,
): MoveGearClosetItemProps => ({
	packItemId: '1',
	prevItemIndex: '1000',
	nextItemIndex: '2000',
	...overrides,
});
