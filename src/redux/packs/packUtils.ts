import { PackItem, Category, PackListItem } from './packTypes';

export const getCategoryIdx = (categories: [], categoryId: number) => {
  return categories.findIndex(
    (item: PackItem) => item.packCategoryId === categoryId,
  );
};

export const getPackItemIdx = (category: Category, packItemId: number) => {
  return category.packItems.findIndex(
    (item: PackItem) => item.packItemId === packItemId,
  );
};

export const getPackIdx = (packList, packId: number) => {
  return packList.findIndex((pack: PackListItem) => pack.packId === packId);
};
