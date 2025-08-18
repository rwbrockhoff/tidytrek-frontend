import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import {
	type DragStartEvent,
	type DragOverEvent,
	type DragEndEvent,
} from '@dnd-kit/core';
import { type Category, type Pack, type PackQueryState } from '@/types/pack-types';
import { packKeys } from '@/queries/query-keys';
import { usePackDragHandler } from './use-pack-drag-handler';

/**
 * Handles drag-and-drop for pack categories and items.
 * Supports reordering categories and moving items between them with optimistic updates.
 *
 * @param packCategories - Array of pack categories
 * @param pack - Current pack data (for context)
 * @param paramPackId - Pack ID from URL parameters
 * @returns Local state, active drag ID, and drag event handlers
 */
export const useDashboardDragHandlers = (
	packCategories: Category[],
	pack: Pack | undefined,
	paramPackId: string | undefined,
) => {
	const queryClient = useQueryClient();
	const { onDragEnd } = usePackDragHandler();

	const [activeId, setActiveId] = useState<string | null>(null);
	const [dragStartData, setDragStartData] = useState<{
		activeContainer: Category;
		activeIndex: number;
	} | null>(null);
	const [localPackCategories, setLocalPackCategories] = useState(packCategories);

	useEffect(() => {
		setLocalPackCategories(packCategories);
	}, [packCategories]);

	const handleOnDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);

		const activeId = event.active.id.toString();
		const isItemDrag = activeId.includes('-');
		if (!isItemDrag) return;

		const getItemId = (id: string) => {
			const parts = id.split('-');
			return parts.length > 1 ? parts[1] : id;
		};

		const activeItemId = getItemId(activeId);

		const activeContainer = packCategories.find((container) =>
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
		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		if (!activeId.includes('-')) {
			if (activeId === overId) return;

			const oldIndex = localPackCategories.findIndex(
				(cat) => cat.packCategoryId.toString() === activeId,
			);
			const newIndex = localPackCategories.findIndex(
				(cat) => cat.packCategoryId.toString() === overId,
			);

			if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

			const reordered = arrayMove(localPackCategories, oldIndex, newIndex);

			setLocalPackCategories(reordered);

			if (!pack?.packId) return;

			queryClient.setQueryData<PackQueryState>(packKeys.packId(pack.packId), (old) => {
				if (!old) return old;
				return {
					...old,
					categories: reordered,
				};
			});

			return;
		}

		const getItemId = (id: string) => {
			const parts = id.split('-');
			return parts.length > 1 ? parts[1] : id;
		};

		const activeItemId = getItemId(activeId);
		const overItemId = getItemId(overId);

		const activeContainer = packCategories.find((container) =>
			container.packItems.some((item) => item.packItemId.toString() === activeItemId),
		);

		let overContainer = packCategories.find((container) =>
			container.packItems.some((item) => item.packItemId.toString() === overItemId),
		);

		if (!overContainer) {
			const categoryId = overId.startsWith('category-')
				? overId.replace('category-', '')
				: overItemId;
			overContainer = packCategories.find(
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

		if (!pack?.packId) return;

		queryClient.setQueryData<PackQueryState>(packKeys.packId(pack.packId), (old) => {
			if (!old) return old;

			const newCategories = [...old.categories];
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

			return {
				...old,
				categories: newCategories,
			};
		});
	};

	const handleOnDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		setActiveId(null);

		if (!over) {
			setDragStartData(null);
			return;
		}

		const activeId = active.id.toString();
		const isCategoryDrag = !activeId.includes('-');

		if (isCategoryDrag) {
			if (!pack?.packId) return;
			onDragEnd(event, { ...pack, categories: localPackCategories } as Pack, paramPackId);
		} else if (dragStartData) {
			const getItemId = (id: string) => {
				const parts = id.split('-');
				return parts.length > 1 ? parts[1] : id;
			};
			const activeItemId = getItemId(activeId);

			const currentContainer = packCategories.find((container) =>
				container.packItems.some((item) => item.packItemId.toString() === activeItemId),
			);

			if (currentContainer) {
				const currentIndex = currentContainer.packItems.findIndex(
					(item) => item.packItemId.toString() === activeItemId,
				);

				if (!pack?.packId) return;
				onDragEnd(event, { ...pack, categories: packCategories } as Pack, paramPackId, {
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
				});
			}
		}

		setDragStartData(null);
	};

	return {
		localPackCategories,
		activeId,
		handleOnDragStart,
		handleOnDragOver,
		handleOnDragEnd,
	};
};
