import { PaletteColor, PaletteName } from '@/styles/palette/palette-constants';

export enum WeightUnit {
	oz = 'oz',
	lb = 'lb',
	kg = 'kg',
	g = 'g',
}

export enum TableRowContext {
	PACK = 'pack',
	CLOSET = 'closet',
}

export type PackQueryState = {
	packList: PackListItem[];
	pack: Pack;
	categories: Category[];
};

export type PackWithCategories = {
	pack: Pack;
	categories: Category[];
};

export type Pack = {
	packId: number;
	userId: string;
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
	palette?: PaletteName;
	categories?: Category[];
};

export type PackFormFields = {
	packName: string;
	packDescription?: string | null;
	packUrlName?: string | null;
	packUrl?: string | null;
	packAffiliateDescription?: string | null;
	packLocationTag?: string | null;
	packDurationTag?: string | null;
	packSeasonTag?: string | null;
	packDistanceTag?: string | null;
};

export type Category = {
	packCategoryName: string;
	packCategoryId: number;
	packId: number;
	packCategoryIndex: string;
	packCategoryColor: PaletteColor;
	packItems: PackItem[];
};

// Base type for all table row items
export type BaseTableRowItem = {
	packItemId: number;
	packId: number | null;
	packCategoryId: number | null;
	packItemIndex: string;
	packItemName: string;
	packItemDescription: string;
	packItemWeight: number;
	packItemWeightUnit: WeightUnit;
	packItemQuantity: number;
	packItemUrl: string;
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
	packItemPrice: number | string;
};

export type PackItem = BaseTableRowItem & {
	packId: number;
	packCategoryId: number;
};

// Type for items in the gear closet (packId and packCategoryId are null)
export type GearClosetItem = BaseTableRowItem & {
	packId: null;
	packCategoryId: null;
};

// Type check utilities
export function isPackItem(item: BaseTableRowItem): item is PackItem {
	return item.packId !== null && item.packCategoryId !== null;
}

export function isGearClosetItem(item: BaseTableRowItem): item is GearClosetItem {
	return item.packId === null && item.packCategoryId === null;
}

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

// Base type for all drag and drop move operations
export type BaseMoveProps = {
	sourceIndex?: number;
	destinationIndex?: number;
};

export type MovePackItemProps = BaseMoveProps & {
	packId: number | null;
	packItemId: string;
	packCategoryId: string;
	prevPackCategoryId: string;
	prevItemIndex?: string;
	nextItemIndex?: string;
};

export type MovePackItemResponse = {
	packItemId: string;
	newIndex: string;
	rebalanced: boolean;
	categoryChanged: boolean;
};

export type MovePackCategoryProps = BaseMoveProps & {
	packId: number;
	packCategoryId: string;
	prevCategoryIndex?: string;
	nextCategoryIndex?: string;
	paramPackId: string | undefined;
};

export type MovePackProps = BaseMoveProps & {
	packId: string;
	prevPackIndex?: string;
	nextPackIndex?: string;
};

export type MoveGearClosetItemProps = BaseMoveProps & {
	packItemId: string;
	prevItemIndex?: string;
	nextItemIndex?: string;
};

export type MoveGearClosetItemResponse = {
	newIndex: string;
	rebalanced: boolean;
};

export type HeaderInfo = {
	packCategoryId: number;
	packCategoryName?: string;
	packCategoryColor?: PaletteColor;
};
