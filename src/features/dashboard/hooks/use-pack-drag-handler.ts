import { useCallback } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import { type Pack, type PackQueryState } from '@/types/pack-types';
import { useMovePackCategoryMutation, useMovePackItemMutation } from '@/queries/pack-queries';
import { calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { packKeys } from '@/queries/query-keys';
import { getCategoryIndex } from '@/queries/pack-queries';

export const usePackDragHandler = () => {
	const { mutate: movePackCategory } = useMovePackCategoryMutation();
	const { mutate: movePackItem } = useMovePackItemMutation();
	const queryClient = useQueryClient();

	const handleOnDragEnd = useCallback(
		(result: DropResult, pack: Pack, paramPackId: string | undefined) => {
			const { draggableId, destination, source, type } = result;

			// User dropped outside of any droppable area
			if (!destination) return;
			const sameIndex = destination.index === source.index;

			// CATEGORY REORDERING

			// User is dragging a whole category to reorder it
			if (type === 'category') {
				if (sameIndex) return; // No change in position
				if (!pack || !pack.packId) return;

				const categories = pack.categories || [];
				// Figure out what categories are before/after the drop position for fractional indexing
				const { prevItem: prevCategory, nextItem: nextCategory } = calculateAdjacentItems(
					categories,
					source.index,
					destination.index,
				);

				// Update UI immediately for smooth drag experience
				applySynchronousDragUpdate<PackQueryState>(
					queryClient,
					packKeys.packId(pack.packId),
					source.index,
					destination.index,
					'categories',
				);

				// Send the reorder to the server with fractional index positions
				movePackCategory({
					packId: pack.packId,
					paramPackId,
					packCategoryId: draggableId,
					prevCategoryIndex: prevCategory?.packCategoryIndex,
					nextCategoryIndex: nextCategory?.packCategoryIndex,
				});
			} else {
				// ITEM REORDERING
				// User is dragging an item within or between categories
				const sameCategory = destination.droppableId === source.droppableId;
				if (sameIndex && sameCategory) return; // No actual movement

				let prevItem: any, nextItem: any;

				// If moving within the same category, we can calculate neighbors easily
				if (sameCategory) {
					const currentData = queryClient.getQueryData<PackQueryState>(
						packKeys.packId(pack.packId),
					);
					if (currentData) {
						const { categories } = currentData;
						const categoryIndex = getCategoryIndex(categories, source.droppableId);
						const originalItems = categories[categoryIndex].packItems;

						// Get the items that will be before/after for fractional indexing
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

				// Update the UI immediately by moving items around in our cached data
				queryClient.setQueryData<PackQueryState>(packKeys.packId(pack.packId), (old) => {
					if (!old) return old;

					const { categories } = old;
					const prevCategoryIndex = getCategoryIndex(categories, source.droppableId);

					if (sameCategory) {
						// Moving within the same category - just reorder the array
						const result = Array.from(categories[prevCategoryIndex].packItems);
						const [removed] = result.splice(source.index, 1);
						result.splice(destination.index, 0, removed);

						categories[prevCategoryIndex].packItems = result;
						updatedDestItems = result;
					} else {
						// Moving between categories - remove from source and add to destination
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

				// Figure out the fractional index values for the server
				// This is where the complex positioning logic happens
				let finalPrevItemIndex: string | undefined;
				let finalNextItemIndex: string | undefined;

				if (sameCategory) {
					// Use the neighbors we calculated earlier
					finalPrevItemIndex = prevItem?.packItemIndex;
					finalNextItemIndex = nextItem?.packItemIndex;
				} else if (destination.index === 0) {
					// Dropped at the top of a different category
					finalPrevItemIndex = undefined;
					finalNextItemIndex = updatedDestItems[1]?.packItemIndex;
				} else {
					// Dropped somewhere in the middle of a different category
					finalPrevItemIndex = updatedDestItems[destination.index - 1]?.packItemIndex;
					finalNextItemIndex = updatedDestItems[destination.index + 1]?.packItemIndex;
				}

				// Send the move to the server with all the fractional index data
				const dragId = draggableId.replace(/\D/g, ''); // Extract numeric ID
				movePackItem({
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

	return {
		onDragEnd: handleOnDragEnd,
	};
};
