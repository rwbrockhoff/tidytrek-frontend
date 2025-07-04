import type { Pack } from '@/types/pack-types';

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