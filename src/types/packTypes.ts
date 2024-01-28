export type InitialState = {
	packList: PackListItem[];
	pack: Pack;
	categories: Category[];
};

export type Pack = {
	packId: string;
	userId: number;
	packIndex: number;
	packName: string;
	packDescription: string;
	packLocationTag: string;
	packDurationTag: string;
	packSeasonTag: string;
	packDistanceTag: string;
	packPublic: boolean;
	packUrlName: string;
	packUrl: string;
	packAffiliate: boolean;
	packAffiliateDescription: string;
};

export type Category = {
	packCategoryName: string;
	packCategoryId: number;
	packId: string;
	packItems: [PackItem];
};

export type PackItem = {
	packItemId: number;
	packCategoryId: number;
	packItemName: string;
	packItemDescription: string;
	packItemWeight: number;
	packItemUnit: string;
	packItemQuantity: number;
	packItemUrl: string;
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
};

export type PackListItem = {
	packName: string;
	packId: string;
};

export type PackButtonSwitches = {
	consumable?: boolean;
	wornWeight?: boolean;
	favorite?: boolean;
};

export type AvailablePack = {
	availableCategories: Category[];
} & Pack;

export type GearClosetList = {
	availablePacks: AvailablePack[] | [];
	gearClosetList: PackItem[] | [];
};
