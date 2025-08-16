import { useCallback } from 'react';
import { type DragEndEvent } from '@dnd-kit/core';
import { Category, type Pack, type PackQueryState } from '@/types/pack-types';
import {
	useMovePackCategoryMutation,
	useMovePackItemMutation,
} from '@/queries/pack-queries';

import { useQueryClient } from '@tanstack/react-query';
import { packKeys } from '@/queries/query-keys';

export const usePackDragHandler = () => {
	const { mutate: movePackCategory } = useMovePackCategoryMutation();
	const { mutate: movePackItem } = useMovePackItemMutation();
	const queryClient = useQueryClient();

	const handleOnDragEnd = useCallback(
		(
			event: DragEndEvent,
			pack: Pack,
			paramPackId: string | undefined,
			capturedInfo?: {
				sourceInfo: { categoryId: string; category: Category; index: number };
				destInfo: { categoryId: string; category: Category; index: number };
			},
		) => {
			const { active, over } = event;

			if (!over || !pack.categories || !pack.packId) return;

			const activeId = active.id.toString();

			// Category IDs are plain numbers, item IDs contain hyphens
			const isCategoryDrag = !activeId.includes('-');

			if (isCategoryDrag) {
				// Handle category reordering
				const currentIndex = pack.categories.findIndex(
					(cat) => cat.packCategoryId.toString() === activeId,
				);

				if (currentIndex === -1) return;

				// Optimistic update for UI
				queryClient.setQueryData<PackQueryState>(packKeys.packId(pack.packId), (old) => {
					if (!old || !pack.categories) return old;
					return {
						...old,
						categories: pack.categories,
					};
				});

				// Calculate adjacent categories for fractional indexing
				const prevCategory =
					currentIndex > 0 ? pack.categories[currentIndex - 1] : undefined;
				const nextCategory =
					currentIndex < pack.categories.length - 1
						? pack.categories[currentIndex + 1]
						: undefined;

				movePackCategory({
					packId: pack.packId,
					packCategoryId: activeId,
					prevCategoryIndex: prevCategory?.packCategoryIndex,
					nextCategoryIndex: nextCategory?.packCategoryIndex,
					paramPackId,
				});
			} else {
				// Handle item movement between/within categories

				// Extract item ID (category-123-item-456 -> "456")
				const getItemId = (id: string) => {
					const parts = id.split('-');
					return parts.length > 1 ? parts[1] : id;
				};

				const activeItemId = getItemId(activeId);

				if (!capturedInfo) return;

				// Build move parameters from drag info
				const moveInfo = {
					packItemId: activeItemId,
					sourceCategoryId: capturedInfo.sourceInfo.categoryId,
					destCategoryId: capturedInfo.destInfo.categoryId,
					sourceIndex: capturedInfo.sourceInfo.index,
					destIndex: capturedInfo.destInfo.index,
				};

				// Optimistic update for UI
				queryClient.setQueryData<PackQueryState>(packKeys.packId(pack.packId), (old) => {
					if (!old || !pack.categories) return old;
					return {
						...old,
						categories: pack.categories,
					};
				});

				// Find destination category to calculate adjacent items
				const destCategoryObj = pack.categories.find(
					(c) => c.packCategoryId.toString() === moveInfo.destCategoryId,
				);
				if (!destCategoryObj) return;

				// Calculate adjacent items for fractional indexing
				const prevItem =
					moveInfo.destIndex > 0
						? destCategoryObj.packItems[moveInfo.destIndex - 1]
						: undefined;
				const nextItem =
					moveInfo.destIndex < destCategoryObj.packItems.length - 1
						? destCategoryObj.packItems[moveInfo.destIndex + 1]
						: undefined;

				movePackItem({
					packId: paramPackId ? pack.packId : null,
					packItemId: moveInfo.packItemId,
					packCategoryId: moveInfo.destCategoryId,
					prevPackCategoryId: moveInfo.sourceCategoryId,
					sourceIndex: moveInfo.sourceIndex,
					destinationIndex: moveInfo.destIndex,
					prevItemIndex: prevItem?.packItemIndex,
					nextItemIndex: nextItem?.packItemIndex,
				});
			}
		},
		[queryClient, movePackCategory, movePackItem],
	);

	return {
		onDragEnd: handleOnDragEnd,
	};
};
