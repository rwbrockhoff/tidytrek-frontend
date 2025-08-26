import { type DragStartEvent } from '@dnd-kit/core';
import { type Category } from '@/types/pack-types';
import { isCategoryDrag, parseItemId, findContainerByItemId } from '../utils/drag-utils';

export const useDragStartHandler = (
	displayCategories: Category[],
	setActiveId: (id: string | null) => void,
	setDragStartData: (
		data: { activeContainer: Category; activeIndex: number } | null,
	) => void,
	startDrag: () => void,
) => {
	return (event: DragStartEvent) => {
		const activeId = event.active.id.toString();
		setActiveId(activeId);
		startDrag();

		// Categories don't need start data
		if (isCategoryDrag(activeId)) return;

		// Store original position for mutation
		const activeItemId = parseItemId(activeId);
		const activeContainer = findContainerByItemId(displayCategories, activeItemId);

		if (activeContainer) {
			const activeIndex = activeContainer.packItems.findIndex(
				(item) => item.packItemId.toString() === activeItemId,
			);
			setDragStartData({ activeContainer, activeIndex });
		}
	};
};
