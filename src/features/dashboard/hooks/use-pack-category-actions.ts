import { useCallback } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import {
	type HeaderInfo,
	type Pack,
	type Category,
	type PackQueryState,
} from '@/types/pack-types';
import { usePackCategoryMutations } from '../mutations/use-category-mutations';
import { usePackItemMutations } from '../mutations/use-item-mutations';
import { paletteList } from '@/styles/palette/palette-constants';
import { calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { packKeys } from '@/queries/query-keys';
import { getCategoryIndex } from '@/queries/pack-queries';

export const usePackCategoryActions = () => {
	const mutations = usePackCategoryMutations();
	const { movePackItem } = usePackItemMutations();
	const queryClient = useQueryClient();

	const {
		addPackCategory,
		deletePackCategory,
		deletePackCategoryAndItems,
		editPackCategory,
		movePackCategory,
	} = mutations;

	// Add Category
	const handleAddPackCategory = useCallback(
		(packId: number, categories: Category[]) => {
			const nextColorIndex = categories.length % paletteList.length;
			const categoryColor = paletteList[nextColorIndex];
			addPackCategory.mutate({ packId, categoryColor });
		},
		[addPackCategory],
	);

	// Edit Category
	const handleEditCategory = useCallback(
		(categoryChanges: HeaderInfo) => {
			editPackCategory.mutate(categoryChanges);
		},
		[editPackCategory],
	);

	// Delete Category
	const handleDeleteCategory = useCallback(
		(packCategoryId: number) => {
			deletePackCategory.mutate(packCategoryId);
		},
		[deletePackCategory],
	);

	// Delete Category and Items
	const handleDeleteCategoryAndItems = useCallback(
		(packCategoryId: number) => {
			deletePackCategoryAndItems.mutate(packCategoryId);
		},
		[deletePackCategoryAndItems],
	);

	// Complex drag handler with optimistic updates
	const handleOnDragEnd = useCallback(
		(result: DropResult, pack: Pack, paramPackId: string | undefined) => {
			const { draggableId, destination, source, type } = result;

			if (!destination) return;
			const sameIndex = destination.index === source.index;

			if (type === 'category') {
				if (sameIndex) return;
				if (!pack || !pack.packId) return;

				const categories = pack.categories || [];
				const { prevItem: prevCategory, nextItem: nextCategory } = calculateAdjacentItems(
					categories,
					source.index,
					destination.index,
				);

				applySynchronousDragUpdate<PackQueryState>(
					queryClient,
					packKeys.packId(pack.packId),
					source.index,
					destination.index,
					'categories',
				);

				movePackCategory.mutate({
					packId: pack.packId,
					paramPackId,
					packCategoryId: draggableId,
					prevCategoryIndex: prevCategory?.packCategoryIndex,
					nextCategoryIndex: nextCategory?.packCategoryIndex,
				});
			} else {
				const sameCategory = destination.droppableId === source.droppableId;
				if (sameIndex && sameCategory) return;

				let prevItem: any, nextItem: any;

				if (sameCategory) {
					const currentData = queryClient.getQueryData<PackQueryState>(
						packKeys.packId(pack.packId),
					);
					if (currentData) {
						const { categories } = currentData;
						const categoryIndex = getCategoryIndex(categories, source.droppableId);
						const originalItems = categories[categoryIndex].packItems;

						const adjacentItems = calculateAdjacentItems(
							originalItems,
							source.index,
							destination.index,
						);
						prevItem = adjacentItems.prevItem;
						nextItem = adjacentItems.nextItem;
					}
				}

				let updatedDestItems: any[] = [];

				queryClient.setQueryData<PackQueryState>(packKeys.packId(pack.packId), (old) => {
					if (!old) return old;

					const { categories } = old;
					const prevCategoryIndex = getCategoryIndex(categories, source.droppableId);

					if (sameCategory) {
						const result = Array.from(categories[prevCategoryIndex].packItems);
						const [removed] = result.splice(source.index, 1);
						result.splice(destination.index, 0, removed);

						categories[prevCategoryIndex].packItems = result;
						updatedDestItems = result;
					} else {
						const [item] = categories[prevCategoryIndex].packItems.splice(
							source.index,
							1,
						);
						const newCategoryIndex = getCategoryIndex(
							categories,
							destination.droppableId,
						);
						categories[newCategoryIndex].packItems.splice(destination.index, 0, item);
						updatedDestItems = categories[newCategoryIndex].packItems;
					}

					return old;
				});

				// Determine prevItemIndex and nextItemIndex based on move type
				let finalPrevItemIndex: string | undefined;
				let finalNextItemIndex: string | undefined;

				if (sameCategory) {
					finalPrevItemIndex = prevItem?.packItemIndex;
					finalNextItemIndex = nextItem?.packItemIndex;
				} else if (destination.index === 0) {
					// Different category, index 0
					finalPrevItemIndex = undefined;
					finalNextItemIndex = updatedDestItems[1]?.packItemIndex;
				} else {
					// Different category
					finalPrevItemIndex = updatedDestItems[destination.index - 1]?.packItemIndex;
					finalNextItemIndex = updatedDestItems[destination.index + 1]?.packItemIndex;
				}

				// Move item with proper prev/next item index values
				const dragId = draggableId.replace(/\D/g, '');
				movePackItem.mutate({
					packId: paramPackId ? pack.packId : null,
					packItemId: dragId,
					packCategoryId: destination.droppableId,
					prevPackCategoryId: source.droppableId,
					prevItemIndex: finalPrevItemIndex,
					nextItemIndex: finalNextItemIndex,
				});
			}
		},
		[queryClient, movePackCategory, movePackItem],
	);

	// Use as const to infer exact types from SimpleMutation
	return {
		addPackCategory: handleAddPackCategory,
		editPackCategory: handleEditCategory,
		deletePackCategory: handleDeleteCategory,
		deletePackCategoryAndItems: handleDeleteCategoryAndItems,
		onDragEnd: handleOnDragEnd,
	} as const;
};
