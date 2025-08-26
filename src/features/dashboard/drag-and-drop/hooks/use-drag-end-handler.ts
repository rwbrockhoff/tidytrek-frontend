import { type DragEndEvent } from '@dnd-kit/core';
import { type Category, type Pack } from '@/types/pack-types';
import { isCategoryDrag, parseItemId, findContainerByItemId } from '../utils/drag-utils';
import { calculateCategoryMove } from '../utils/category-drag-calculations';
import { calculateItemMove } from '../utils/item-drag-calculations';

type CapturedInfo = {
	sourceInfo: { categoryId: string; category: Category; index: number };
	destInfo: { categoryId: string; category: Category; index: number };
};

export const useDragEndHandler = (
	displayCategories: Category[],
	pack: Pack | undefined,
	paramPackId: string | undefined,
	dragStartData: { activeContainer: Category; activeIndex: number } | null,
	serverDragEnd: (
		event: DragEndEvent,
		pack: Pack,
		paramPackId: string | undefined,
		capturedInfo?: CapturedInfo,
		onSettled?: () => void,
	) => void,
	updateDrag: (categories: Category[]) => void,
	completeDrag: () => void,
	resetDrag: () => void,
	endDrag: () => void,
	resetDragState: () => void,
) => {
	return (event: DragEndEvent) => {
		const { active, over } = event;

		// Clean up UI state first
		resetDragState();

		if (!over) {
			resetDrag();
			return;
		}

		const activeId = active.id.toString();
		const overId = over.id.toString();

		// Calculate final positions for server
		let finalCategories = displayCategories;

		if (isCategoryDrag(activeId)) {
			const categoryMove = calculateCategoryMove(displayCategories, activeId, overId);
			if (categoryMove) {
				finalCategories = categoryMove;
			}
		} else {
			const itemMove = calculateItemMove(displayCategories, activeId, overId);
			if (itemMove) {
				finalCategories = itemMove;
			}
		}

		// Update temp state and mark drag complete
		updateDrag(finalCategories);
		completeDrag();

		try {
			if (!pack?.packId) {
				resetDrag();
				return;
			}

			// Build server data for item moves
			let serverCapturedInfo = undefined;
			if (dragStartData && !isCategoryDrag(activeId)) {
				serverCapturedInfo = buildServerCapturedInfo(
					activeId,
					finalCategories,
					dragStartData,
				);
			}

			// Send server final positions
			serverDragEnd(
				event,
				{ ...pack, categories: finalCategories } as Pack,
				paramPackId,
				serverCapturedInfo,
				() => endDrag(),
			);
		} catch (error) {
			resetDrag();
		}
	};
};

const buildServerCapturedInfo = (
	activeId: string,
	finalCategories: Category[],
	dragStartData: { activeContainer: Category; activeIndex: number },
): CapturedInfo | undefined => {
	const activeItemId = parseItemId(activeId);
	const destContainer = findContainerByItemId(finalCategories, activeItemId);

	if (!destContainer) return undefined;

	const destIndex = destContainer.packItems.findIndex(
		(item) => item.packItemId.toString() === activeItemId,
	);

	return {
		sourceInfo: {
			categoryId: dragStartData.activeContainer.packCategoryId.toString(),
			category: dragStartData.activeContainer,
			index: dragStartData.activeIndex,
		},
		destInfo: {
			categoryId: destContainer.packCategoryId.toString(),
			category: destContainer,
			index: destIndex,
		},
	};
};
