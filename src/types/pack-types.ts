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
	packPricing: boolean;
	packUrlName: string;
	packUrl: string;
	packPhotoUrl: string;
	packAffiliate: boolean;
	packAffiliateDescription: string;
	packViews: number;
	packBookmarkCount: number;
};

export type Category = {
	packCategoryName: string;
	packCategoryId: number;
	packId: number;
	packCategoryColor: string;
	packItems: [PackItem];
};

export type PackItem = {
	packItemId: number;
	packId: number;
	packCategoryId: number;
	packItemIndex: number;
	packItemName: string;
	packItemDescription: string;
	packItemWeight: number;
	packItemUnit: string;
	packItemQuantity: number;
	packItemUrl: string;
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
	packItemPrice: number;
};

export type PackListItem = {
	packName: string;
	packId: number;
	packIndex: number;
	packCategories: Category[];
};

export type PackInfo = {
	packItemId: number;
	packId: number | string;
	packCategoryId: number | string;
	packItemIndex: number;
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

export type MovePackCategoryProps = {
	packId: number;
	packCategoryId: string;
	newIndex: number;
	prevIndex: number;
	paramPackId: string | undefined;
};
