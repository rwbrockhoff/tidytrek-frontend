import { PackItem, Category, PackListItem } from '../types/pack-types';

export const getCategoryIdx = (categories: Category[], categoryId: number | string) => {
	return categories.findIndex(
		(item: Category) => item.packCategoryId === Number(categoryId),
	);
};

export const getPackItemIdx = (category: Category, packItemId: number) => {
	return category.packItems.findIndex(
		(item: PackItem) => item.packItemId === Number(packItemId),
	);
};

export const getPackIdx = (packList: PackListItem[], packId: number) => {
	return packList.findIndex((pack: PackListItem) => pack.packId === Number(packId));
};
