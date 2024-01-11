import { PackItem, Category, PackListItem } from './packTypes';

export const getCategoryIdx = (categories: [], categoryId: number) => {
  return categories.findIndex(
    (item: PackItem) => item.packCategoryId === Number(categoryId),
  );
};

export const getPackItemIdx = (category: Category, packItemId: number) => {
  return category.packItems.findIndex(
    (item: PackItem) => item.packItemId === Number(packItemId),
  );
};

export const getPackIdx = (packList: PackListItem[], packId: number) => {
  return packList.findIndex(
    (pack: PackListItem) => pack.packId === Number(packId),
  );
};
