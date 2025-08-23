import { arrayMove } from '@dnd-kit/sortable';
import { type Category, type PackItem } from '@/types/pack-types';
import {
	parseItemId,
	findContainerByItemId,
	extractCategoryIdFromOverId,
	findContainerByCategoryId,
	calculateDropIndex,
} from './drag-utils';

export const calculateItemMove = (
	categories: Category[],
	activeId: string,
	overId: string,
): Category[] | null => {
	// Parse item IDs from drag event
	const activeItemId = parseItemId(activeId);
	const overItemId = parseItemId(overId);

	// Find source and destination containers
	const activeContainer = findContainerByItemId(categories, activeItemId);
	let overContainer = findContainerByItemId(categories, overItemId);

	// Handle drop on category (not item)
	if (!overContainer) {
		const categoryId = extractCategoryIdFromOverId(overId, overItemId);
		overContainer = findContainerByCategoryId(categories, categoryId);
	}

	if (!activeContainer || !overContainer) return null;

	// Find item positions
	const activeIndex = activeContainer.packItems.findIndex(
		(item) => item.packItemId.toString() === activeItemId,
	);
	const overIndex = overContainer.packItems.findIndex(
		(item) => item.packItemId.toString() === overItemId,
	);

	if (activeIndex === -1) return null;

	// Calculate drop position
	const isSameCategory = activeContainer.packCategoryId === overContainer.packCategoryId;
	const newIndex = calculateDropIndex(overId, overContainer, overIndex, isSameCategory);

	// No change needed
	if (isSameCategory && activeIndex === newIndex) return null;

	const movingItem = activeContainer.packItems[activeIndex];
	if (!movingItem) return null;

	// Build updated categories array
	return buildUpdatedCategories(
		categories,
		activeContainer,
		overContainer,
		activeIndex,
		newIndex,
		movingItem,
		isSameCategory,
	);
};

const buildUpdatedCategories = (
	categories: Category[],
	activeContainer: Category,
	overContainer: Category,
	activeIndex: number,
	newIndex: number,
	movingItem: PackItem,
	isSameCategory: boolean,
): Category[] => {
	const newCategories = [...categories];

	// Find category positions in array
	const sourceCategoryIndex = newCategories.findIndex(
		(cat) => cat.packCategoryId === activeContainer.packCategoryId,
	);
	const destCategoryIndex = newCategories.findIndex(
		(cat) => cat.packCategoryId === overContainer.packCategoryId,
	);

	if (sourceCategoryIndex === -1 || destCategoryIndex === -1) return categories;

	if (isSameCategory) {
		// Same category: reorder items with arrayMove
		const newItems = arrayMove(
			newCategories[sourceCategoryIndex].packItems,
			activeIndex,
			newIndex,
		);
		newCategories[sourceCategoryIndex] = {
			...newCategories[sourceCategoryIndex],
			packItems: newItems,
		};
	} else {
		// Cross-category: remove from source/add to destination
		const newSourceItems = [...newCategories[sourceCategoryIndex].packItems];
		newSourceItems.splice(activeIndex, 1);
		newCategories[sourceCategoryIndex] = {
			...newCategories[sourceCategoryIndex],
			packItems: newSourceItems,
		};

		// Update item's category ID and insert
		const updatedItem = {
			...movingItem,
			packCategoryId: overContainer.packCategoryId,
		};
		const newDestItems = [...newCategories[destCategoryIndex].packItems];
		newDestItems.splice(newIndex, 0, updatedItem);
		newCategories[destCategoryIndex] = {
			...newCategories[destCategoryIndex],
			packItems: newDestItems,
		};
	}

	return newCategories;
};
