import { type PackQueryState, type PackItem } from '@/types/pack-types';

export const removePackItemFromCache = (
	state: PackQueryState | undefined,
	packItemId: number,
): PackQueryState | undefined => {
	if (!state) return state;

	return {
		...state,
		categories: state.categories.map((category) => ({
			...category,
			packItems: category.packItems.filter((item) => item.packItemId !== packItemId),
		})),
	};
};

export const updatePackItemInCache = (
	state: PackQueryState | undefined,
	updatedItem: PackItem,
): PackQueryState | undefined => {
	if (!state) return state;

	return {
		...state,
		categories: state.categories.map((category) => ({
			...category,
			packItems: category.packItems.map((item) =>
				item.packItemId === updatedItem.packItemId ? updatedItem : item,
			),
		})),
	};
};

export const updatePackItemIndexInCache = (
	state: PackQueryState | undefined,
	packItemId: string,
	newIndex: string,
): PackQueryState | undefined => {
	if (!state) return state;

	return {
		...state,
		categories: state.categories.map((category) => {
			const itemIndex = category.packItems.findIndex(
				(item) => item.packItemId.toString() === packItemId,
			);
			if (itemIndex === -1) return category;

			// Update item with new fractional index
			const updatedItem = { ...category.packItems[itemIndex], packItemIndex: newIndex };
			const newItems = [...category.packItems];

			// Remove item from current position
			newItems.splice(itemIndex, 1);

			// Find correct index based on fractional index
			const newIndexFloat = parseFloat(newIndex);
			const insertIndex = newItems.findIndex(
				(item) => parseFloat(item.packItemIndex) > newIndexFloat,
			);
			const finalInsertIndex = insertIndex === -1 ? newItems.length : insertIndex;

			// Insert at new position
			newItems.splice(finalInsertIndex, 0, updatedItem);

			return { ...category, packItems: newItems };
		}),
	};
};

export const movePackItemBetweenCategoriesInCache = (
	state: PackQueryState | undefined,
	packItemId: string,
	newCategoryId: number,
	newIndex: string,
): PackQueryState | undefined => {
	if (!state) return state;

	let movingItem: PackItem | null = null;

	// find/remove the item from current category
	const categoriesAfterRemoval = state.categories.map((category) => {
		const itemIndex = category.packItems.findIndex(
			(item) => item.packItemId.toString() === packItemId,
		);
		if (itemIndex === -1) return category;

		// Found item - remove it (but remember it)
		movingItem = {
			...category.packItems[itemIndex],
			packItemIndex: newIndex,
			packCategoryId: newCategoryId,
		};
		const newItems = [...category.packItems];
		newItems.splice(itemIndex, 1);

		return { ...category, packItems: newItems };
	});

	if (!movingItem) return state; // Item not found

	// now add item to destination category
	const categoriesAfterInsertion = categoriesAfterRemoval.map((category) => {
		if (category.packCategoryId !== newCategoryId) return category;

		const newItems = [...category.packItems];

		// Find correct insert index based on fractional index
		const newIndexFloat = parseFloat(newIndex);
		const insertIndex = newItems.findIndex(
			(item) => parseFloat(item.packItemIndex) > newIndexFloat,
		);
		const finalInsertIndex = insertIndex === -1 ? newItems.length : insertIndex;

		// Insert at new position
		newItems.splice(finalInsertIndex, 0, movingItem!);

		return { ...category, packItems: newItems };
	});

	return { ...state, categories: categoriesAfterInsertion };
};

export const updatePackCategoryIndexInCache = (
	state: PackQueryState | undefined,
	packCategoryId: string,
	newIndex: string,
): PackQueryState | undefined => {
	if (!state) return state;

	const categoryIndex = state.categories.findIndex(
		(category) => category.packCategoryId.toString() === packCategoryId,
	);
	if (categoryIndex === -1) return state;

	const updatedCategory = {
		...state.categories[categoryIndex],
		packCategoryIndex: newIndex,
	};
	const newCategories = [...state.categories];

	// Remove category from current position
	newCategories.splice(categoryIndex, 1);

	// Find insert index based on fractional index
	const newIndexFloat = parseFloat(newIndex);
	const insertIndex = newCategories.findIndex(
		(category) => parseFloat(category.packCategoryIndex) > newIndexFloat,
	);
	const finalInsertIndex = insertIndex === -1 ? newCategories.length : insertIndex;

	// Insert at new position
	newCategories.splice(finalInsertIndex, 0, updatedCategory);

	return {
		...state,
		categories: newCategories,
	};
};
