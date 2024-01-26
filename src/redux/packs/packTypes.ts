export interface InitialState {
	packList: PackListItem[];
	pack: Pack;
	categories: Category[];
}

export interface Pack {
	packId: number;
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
}

export interface Category {
	packCategoryName: string;
	packCategoryId: number;
	packId: number;
	packItems: [PackItem];
}

export interface PackItem {
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
}

export interface PackListItem {
	packName: string;
	packId: number;
}

export type PackButtonSwitches = {
	consumable?: boolean;
	wornWeight?: boolean;
	favorite?: boolean;
};

export type GearClosetList = {
	availablePacks: Pack[] | [];
	gearClosetList: PackItem[] | [];
};
