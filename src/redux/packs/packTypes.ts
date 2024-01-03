export interface InitialState {
  packList: [];
  pack: object;
  categories: [Category] | [];
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
