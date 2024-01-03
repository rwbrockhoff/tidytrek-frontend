import { PackItem, Category } from "./packTypes";

export const getCategoryIdx = (categories: [], categoryId: number) => {
  return categories.findIndex(
    (item: PackItem) => item.packCategoryId === categoryId
  );
};

export const getPackItemIdx = (category: Category, packItemId: number) => {
  return category.packItems.findIndex(
    (item: PackItem) => item.packItemId === packItemId
  );
};
