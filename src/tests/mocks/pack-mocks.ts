import { paletteList } from '@/styles/theme/palette-constants';
import type {
	Pack,
	PackListItem,
	InitialState,
	Category,
	PackWithCategories,
	PackInfo,
} from '@/types/pack-types';

export const createMockPack = (overrides?: Partial<Pack>): Pack => ({
	packId: 1,
	userId: 'cdtThruHiker',
	packIndex: '1000',
	packName: 'CDT Shakedown',
	packDescription: 'Current gear list for CDT',
	packLocationTag: 'Montana',
	packDurationTag: '6 Months',
	packSeasonTag: 'Summer',
	packDistanceTag: '',
	packPublic: false,
	packPricing: false,
	packUrlName: 'Youtube Gear Review',
	packUrl: 'https://fakeyoutube.com/cdt-gear-review',
	packPhotoUrl: 'https://example.com/cdt-inspiration.jpg',
	packAffiliate: false,
	packAffiliateDescription: '',
	packViews: 0,
	packBookmarkCount: 0,
	...overrides,
});

export const createMockPackListItem = (
	overrides?: Partial<PackListItem>,
): PackListItem => ({
	packId: 1,
	packName: 'Vermont: Weekend Trips',
	packIndex: '2000',
	packCategories: [],
	...overrides,
});

export const createMockCategory = (overrides?: Partial<Category>): Category => ({
	packId: 1,
	packCategoryId: 1,
	packCategoryName: 'Clothing',
	packCategoryIndex: '1000',
	packCategoryColor: paletteList[1],
	packItems: [],
	...overrides,
});

export const createMockInitialState = (
	overrides?: Partial<InitialState>,
): InitialState => ({
	packList: [createMockPackListItem()],
	pack: createMockPack(),
	categories: [createMockCategory()],
	...overrides,
});

export const createMockPackWithCategories = (
	overrides?: Partial<PackWithCategories>,
): PackWithCategories => ({
	pack: createMockPack(),
	categories: [createMockCategory()],
	...overrides,
});

export const createMockPackList = () => ({
	packList: [
		createMockPackListItem(),
		createMockPackListItem({
			packId: 2,
			packName: 'Colorado Trail - Section Hike',
			packIndex: '3000',
		}),
	],
});

export const createMockPackInfo = (overrides?: Partial<PackInfo>): PackInfo => ({
	packItemId: 1,
	packId: '1',
	packCategoryId: '1',
	packItemIndex: '1000',
	...overrides,
});
