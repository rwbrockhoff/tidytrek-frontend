import { type DragOverEvent } from '@dnd-kit/core';
import { type Category } from '@/types/pack-types';
import { isCategoryDrag, createDragPosition } from '../utils/drag-utils';
import { calculateCategoryMove } from '../utils/category-drag-calculations';
import { calculateItemMove } from '../utils/item-drag-calculations';

export const useDragOverHandler = (
	displayCategories: Category[],
	isDragging: boolean,
	lastDragPosition: string,
	setLastDragPosition: (position: string) => void,
	updateDrag: (categories: Category[]) => void,
) => {
	return (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over || !isDragging) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		// Skip if same position to avoid calculations
		const currentPosition = createDragPosition(activeId, overId);
		if (currentPosition === lastDragPosition) return;
		setLastDragPosition(currentPosition);

		// Calculate new positions based on drag type
		let newCategories: Category[] | null = null;
		if (isCategoryDrag(activeId)) {
			newCategories = calculateCategoryMove(displayCategories, activeId, overId);
		} else {
			newCategories = calculateItemMove(displayCategories, activeId, overId);
		}

		// Update visual state for UI
		if (newCategories) {
			updateDrag(newCategories);
		}
	};
};
