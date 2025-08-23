import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import {
	type DragStartEvent,
	type DragOverEvent,
	type DragEndEvent,
} from '@dnd-kit/core';
import { type Category, type Pack } from '@/types/pack-types';
import { usePackDragHandler } from './use-pack-drag-handler';
import { useDragState } from './use-drag-state';

/**
 * Handles drag-and-drop for pack categories and items.
 * Uses temp local state during drag to prevent excessive re-renders,
 * only updates cache & the server on drag end.
 *
 * @param packCategories - Array of pack categories from TanStack Query
 * @param pack - Current pack data (for context)
 * @param paramPackId - Pack ID from URL parameters
 * @returns Display categories, active drag ID, and drag event handlers
 */
export const useDashboardDragHandlers = (
	packCategories: Category[],
	pack: Pack | undefined,
	paramPackId: string | undefined,
) => {
	const { onDragEnd: serverDragEnd } = usePackDragHandler();
	const {
		isDragging,
		displayCategories,
		startDrag,
		updateDrag,
		completeDrag,
		endDrag,
		resetDrag,
	} = useDragState(packCategories);

	const [activeId, setActiveId] = useState<string | null>(null);
	const [lastDragPosition, setLastDragPosition] = useState<string>('');
	const [dragStartData, setDragStartData] = useState<{
		activeContainer: Category;
		activeIndex: number;
	} | null>(null);

	const handleOnDragStart = (event: DragStartEvent) => {
		const activeId = event.active.id.toString();
		setActiveId(activeId);

		// Start drag state management
		startDrag();

		const isItemDrag = activeId.includes('-');
		if (!isItemDrag) return;

		const getItemId = (id: string) => {
			const parts = id.split('-');
			return parts.length > 1 ? parts[1] : id;
		};

		const activeItemId = getItemId(activeId);

		// Use displayCategories for finding the container
		const activeContainer = displayCategories.find((container) =>
			container.packItems.some((item) => item.packItemId.toString() === activeItemId),
		);

		if (activeContainer) {
			const activeIndex = activeContainer.packItems.findIndex(
				(item) => item.packItemId.toString() === activeItemId,
			);
			setDragStartData({ activeContainer, activeIndex });
		}
	};

	const handleOnDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over || !isDragging) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		const currentPosition = `${activeId}->${overId}`;
		if (currentPosition === lastDragPosition) {
			return;
		}
		setLastDragPosition(currentPosition);

		// Handle category drag
		if (!activeId.includes('-')) {
			if (activeId === overId) return;

			const oldIndex = displayCategories.findIndex(
				(cat) => cat.packCategoryId.toString() === activeId,
			);
			const newIndex = displayCategories.findIndex(
				(cat) => cat.packCategoryId.toString() === overId,
			);

			if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

			const reordered = arrayMove(displayCategories, oldIndex, newIndex);
			updateDrag(reordered);

			return;
		}

		const getItemId = (id: string) => {
			const parts = id.split('-');
			return parts.length > 1 ? parts[1] : id;
		};

		const activeItemId = getItemId(activeId);
		const overItemId = getItemId(overId);

		// Use displayCategories instead of packCategories
		const activeContainer = displayCategories.find((container) =>
			container.packItems.some((item) => item.packItemId.toString() === activeItemId),
		);

		let overContainer = displayCategories.find((container) =>
			container.packItems.some((item) => item.packItemId.toString() === overItemId),
		);

		if (!overContainer) {
			const categoryId = overId.startsWith('category-')
				? overId.replace('category-', '')
				: overItemId;
			overContainer = displayCategories.find(
				(container) => container.packCategoryId.toString() === categoryId,
			);
		}

		if (!activeContainer || !overContainer) return;

		const activeIndex = activeContainer.packItems.findIndex(
			(item) => item.packItemId.toString() === activeItemId,
		);
		const overIndex = overContainer.packItems.findIndex(
			(item) => item.packItemId.toString() === overItemId,
		);

		if (activeIndex === -1) return;

		let newIndex: number;

		if (activeContainer.packCategoryId === overContainer.packCategoryId) {
			newIndex = overIndex >= 0 ? overIndex : overContainer.packItems.length - 1;
			if (activeIndex === newIndex) return;
		} else {
			if (overId.startsWith('category-')) {
				newIndex = overContainer.packItems.length;
			} else {
				const isBelowOverItem =
					over.rect && active.rect?.current?.translated
						? active.rect.current.translated.top > over.rect.top + over.rect.height / 2
						: false;

				const modifier = isBelowOverItem ? 1 : 0;
				newIndex = overIndex >= 0 ? overIndex + modifier : overContainer.packItems.length;
			}
		}

		const movingItem = activeContainer.packItems[activeIndex];
		if (!movingItem) return;

		// Build new categories array with the move applied
		const newCategories = [...displayCategories];
		const sourceCategoryIndex = newCategories.findIndex(
			(cat) => cat.packCategoryId === activeContainer.packCategoryId,
		);
		const destCategoryIndex = newCategories.findIndex(
			(cat) => cat.packCategoryId === overContainer!.packCategoryId,
		);

		if (sourceCategoryIndex !== -1 && destCategoryIndex !== -1) {
			// Same category: use arrayMove from @dnd-kit
			if (activeContainer.packCategoryId === overContainer!.packCategoryId) {
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
				// Cross-category: manual splice
				const newSourceItems = [...newCategories[sourceCategoryIndex].packItems];
				newSourceItems.splice(activeIndex, 1);
				newCategories[sourceCategoryIndex] = {
					...newCategories[sourceCategoryIndex],
					packItems: newSourceItems,
				};

				const updatedItem = {
					...movingItem,
					packCategoryId: overContainer!.packCategoryId,
				};
				const newDestItems = [...newCategories[destCategoryIndex].packItems];
				newDestItems.splice(newIndex, 0, updatedItem);
				newCategories[destCategoryIndex] = {
					...newCategories[destCategoryIndex],
					packItems: newDestItems,
				};
			}
		}

		updateDrag(newCategories);
	};

	const handleOnDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		setActiveId(null);
		setLastDragPosition('');
		setDragStartData(null);

		if (!over) {
			resetDrag();
			return;
		}

		const activeId = active.id.toString();
		const isCategoryDrag = !activeId.includes('-');

		completeDrag();

		try {
			if (isCategoryDrag) {
				if (!pack?.packId) {
					resetDrag();
					return;
				}
				await serverDragEnd(
					event,
					{ ...pack, categories: displayCategories } as Pack,
					paramPackId,
					undefined,
					endDrag,
				);
			} else if (dragStartData) {
				const getItemId = (id: string) => {
					const parts = id.split('-');
					return parts.length > 1 ? parts[1] : id;
				};
				const activeItemId = getItemId(activeId);

				const currentContainer = displayCategories.find((container) =>
					container.packItems.some((item) => item.packItemId.toString() === activeItemId),
				);

				if (currentContainer) {
					const currentIndex = currentContainer.packItems.findIndex(
						(item) => item.packItemId.toString() === activeItemId,
					);

					if (!pack?.packId) {
						resetDrag();
						return;
					}

					// Send server update with final positions
					// Pass endDrag as onSettled callback to prevent "flash" back to original position
					await serverDragEnd(
						event,
						{ ...pack, categories: displayCategories } as Pack,
						paramPackId,
						{
							sourceInfo: {
								categoryId: dragStartData.activeContainer.packCategoryId.toString(),
								category: dragStartData.activeContainer,
								index: dragStartData.activeIndex,
							},
							destInfo: {
								categoryId: currentContainer.packCategoryId.toString(),
								category: currentContainer,
								index: currentIndex,
							},
						},
						endDrag, // onSettled callback
					);
				}
			}
		} catch (error) {
			resetDrag();
		}
	};

	return {
		localPackCategories: displayCategories,
		activeId,
		handleOnDragStart,
		handleOnDragOver,
		handleOnDragEnd,
	};
};
