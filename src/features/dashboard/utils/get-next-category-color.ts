import { type Category } from '@/types/pack-types';
import { paletteList } from '@/styles/palette/palette-constants';

export const getNextCategoryColor = (categories: Category[]): string => {
	const nextColorIndex = categories.length % paletteList.length;
	return paletteList[nextColorIndex];
};
