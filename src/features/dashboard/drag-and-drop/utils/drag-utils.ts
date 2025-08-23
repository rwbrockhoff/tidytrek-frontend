import { type Category } from '@/types/pack-types';

export const parseItemId = (id: string): string => {
	const parts = id.split('-');
	return parts.length > 1 ? parts[1] : id;
};

export const isCategoryDrag = (id: string): boolean => !id.includes('-');

export const findContainerByItemId = (
	categories: Category[],
	itemId: string,
): Category | undefined => {
	return categories.find((container) =>
		container.packItems.some((item) => item.packItemId.toString() === itemId),
	);
};

export const findContainerByCategoryId = (
	categories: Category[],
	categoryId: string,
): Category | undefined => {
	return categories.find(
		(container) => container.packCategoryId.toString() === categoryId,
	);
};

export const extractCategoryIdFromOverId = (
	overId: string,
	overItemId: string,
): string => {
	return overId.startsWith('category-') ? overId.replace('category-', '') : overItemId;
};

export const calculateDropIndex = (
	overId: string,
	overContainer: Category,
	overIndex: number,
	isSameCategory: boolean,
): number => {
	if (isSameCategory) {
		return overIndex >= 0 ? overIndex : overContainer.packItems.length - 1;
	}

	if (overId.startsWith('category-')) {
		return overContainer.packItems.length;
	}

	return overIndex >= 0 ? overIndex : overContainer.packItems.length;
};

export const createDragPosition = (activeId: string, overId: string): string => {
	return `${activeId}->${overId}`;
};
