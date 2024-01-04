export interface InitialState {
  packList: [];
  pack: Pack;
  categories: [Category] | [];
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
  wornWeight: boolean;
  consumable: boolean;
  favorite: boolean;
}
