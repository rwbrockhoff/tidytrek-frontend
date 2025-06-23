export type InitialState = {
	packList: PackListItem[];
	pack: Pack;
	categories: Category[];
};

export type Pack = {
	packId: number;
	userId: number;
	packIndex: string;
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
	categories?: Category[];
};

export type Category = {
	packCategoryName: string;
	packCategoryId: number;
	packId: number;
	packCategoryIndex: string;
	packCategoryColor: string;
	packItems: PackItem[];
};

export type PackItem = {
	packItemId: number;
	packId: number;
	packCategoryId: number;
	packItemIndex: string;
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

// Type for items in the gear closet (packId and packCategoryId are null)
export type GearClosetItem = Omit<PackItem, 'packId' | 'packCategoryId'> & {
	packId: null;
	packCategoryId: null;
};

export type PackListItem = {
	packName: string;
	packId: number;
	packIndex: string;
	packCategories: Category[];
};

export type PackInfo = {
	packItemId: number;
	packId: number | string;
	packCategoryId: number | string;
	packItemIndex: string;
};

export type PackItemProperty = {
	[Property in keyof PackItem]?: PackItem[Property];
};

export type MovePackItemProps = {
	packId: number | null;
	packItemId: string;
	packCategoryId: string;
	prevPackCategoryId: string;
	prevItemIndex?: string;
	nextItemIndex?: string;
};

export type MovePackCategoryProps = {
	packId: number;
	packCategoryId: string;
	prevCategoryIndex?: string;
	nextCategoryIndex?: string;
	paramPackId: string | undefined;
};

export type HeaderInfo = {
	packCategoryId: number;
	packCategoryName?: string;
	packCategoryColor?: string;
};
