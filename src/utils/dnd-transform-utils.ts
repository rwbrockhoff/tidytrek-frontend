import { type DragEndEvent } from '@dnd-kit/core';
import { type Category, type PackItem, type GearClosetItem } from '@/types/pack-types';

export type DragResult = {
	draggableId: string;
	source: { droppableId: string; index: number };
	destination: { droppableId: string; index: number };
	type: 'category' | 'item';
};

// Transforms dnd-kit drag event for API index handling
export function transformDragEvent(
	event: DragEndEvent,
	categories: Category[],
): DragResult | null {
	const { active, over } = event;

	if (!over) return null;

	const activeId = active.id.toString();
	const overId = over.id.toString();

	// Determine if we're dragging a category or item
	const isDraggingCategory = categories.some(
		(cat) => cat.packCategoryId.toString() === activeId,
	);

	if (isDraggingCategory) {
		return transformCategoryDrag(activeId, overId, categories);
	} else {
		return transformItemDrag(activeId, overId, categories);
	}
}

// Handles category-to-category drag operations
function transformCategoryDrag(
	activeId: string,
	overId: string,
	categories: Category[],
): DragResult | null {
	const sourceIndex = categories.findIndex(
		(cat) => cat.packCategoryId.toString() === activeId,
	);
	const destinationIndex = categories.findIndex(
		(cat) => cat.packCategoryId.toString() === overId,
	);

	if (sourceIndex === -1 || destinationIndex === -1) return null;

	return {
		draggableId: activeId,
		source: { droppableId: 'dashboard-drop-window', index: sourceIndex },
		destination: { droppableId: 'dashboard-drop-window', index: destinationIndex },
		type: 'category',
	};
}

// Handles item drag between categories or within same category
function transformItemDrag(
	activeId: string,
	overId: string,
	categories: Category[],
): DragResult | null {
	// Find source category and item index
	let sourceCategory: Category | null = null;
	let sourceItemIndex = -1;

	for (const category of categories) {
		const itemIndex = category.packItems.findIndex(
			(item) => item.packItemId.toString() === activeId,
		);
		if (itemIndex !== -1) {
			sourceCategory = category;
			sourceItemIndex = itemIndex;
			break;
		}
	}

	if (!sourceCategory || sourceItemIndex === -1) return null;

	// Determine destination
	let destinationCategoryId: string;
	let destinationItemIndex: number;

	// Check if dropped over another item
	const destinationItem = findItemById(overId, categories);
	if (destinationItem) {
		const destCategory = categories.find((cat) =>
			cat.packItems.some((item) => item.packItemId.toString() === overId),
		);
		if (!destCategory) return null;

		destinationCategoryId = destCategory.packCategoryId.toString();
		destinationItemIndex = destCategory.packItems.findIndex(
			(item) => item.packItemId.toString() === overId,
		);
	} else {
		// Check if dropped over a category droppable zone (category-123)
		if (overId.startsWith('category-')) {
			const categoryId = overId.replace('category-', '');
			const destCategory = categories.find(
				(cat) => cat.packCategoryId.toString() === categoryId,
			);
			if (!destCategory) return null;

			destinationCategoryId = categoryId;
			destinationItemIndex = destCategory.packItems.length; // End of list
		} else {
			// Dropped over a category (direct category ID)
			const destCategory = categories.find(
				(cat) => cat.packCategoryId.toString() === overId,
			);
			if (!destCategory) return null;

			destinationCategoryId = overId;
			destinationItemIndex = destCategory.packItems.length;
		}
	}

	return {
		draggableId: activeId,
		source: {
			droppableId: sourceCategory.packCategoryId.toString(),
			index: sourceItemIndex,
		},
		destination: {
			droppableId: destinationCategoryId,
			index: destinationItemIndex,
		},
		type: 'item',
	};
}

// Finds pack item by ID across all categories
function findItemById(itemId: string, categories: Category[]): PackItem | null {
	for (const category of categories) {
		const item = category.packItems.find((item) => item.packItemId.toString() === itemId);
		if (item) return item;
	}
	return null;
}

// Transforms drag events for gear closet flat list
export function transformGearClosetDragEvent(
	event: DragEndEvent,
	gearClosetItems: GearClosetItem[],
): DragResult | null {
	const { active, over } = event;

	if (!over) return null;

	const activeId = active.id.toString();
	const overId = over.id.toString();

	const sourceIndex = gearClosetItems.findIndex(
		(item) => item.packItemId.toString() === activeId,
	);
	const destinationIndex = gearClosetItems.findIndex(
		(item) => item.packItemId.toString() === overId,
	);

	if (sourceIndex === -1) return null;

	// If dropped over another item, insert before it
	// If destinationIndex is -1, it means dropped over the droppable area (append to end)
	const finalDestinationIndex =
		destinationIndex === -1 ? gearClosetItems.length : destinationIndex;

	return {
		draggableId: activeId,
		source: { droppableId: 'gear-closet', index: sourceIndex },
		destination: { droppableId: 'gear-closet', index: finalDestinationIndex },
		type: 'item',
	};
}
