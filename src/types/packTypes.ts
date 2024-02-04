export type InitialState = {
	packList: PackListItem[];
	pack: Pack;
	categories: Category[];
};

export type Pack = {
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
};

export type Category = {
	packCategoryName: string;
	packCategoryId: number;
	packId: number;
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
	packId: number;
	packIndex: number;
	packCategories: Category[];
};

export type PackInfo = {
	packItemId: number;
	packId: number;
	packCategoryId: number;
};

export type PackButtonSwitches = {
	consumable?: boolean;
	wornWeight?: boolean;
	favorite?: boolean;
};

export type MovePackItemProps = {
	packId: number | null;
	packItemId: string;
	packCategoryId: string;
	packItemIndex: number;
	prevPackCategoryId: string;
	prevPackItemIndex: number;
};
