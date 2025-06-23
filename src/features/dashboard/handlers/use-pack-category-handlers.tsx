import { type DropResult } from 'react-beautiful-dnd';
import { type HeaderInfo, type Pack, type Category, type InitialState } from '@/types/pack-types';
import { usePackCategoryMutations } from '../mutations/use-category-mutations';
import { createContext, useContext } from 'react';
import { usePackItemMutations } from '../mutations/use-item-mutations';
import { paletteList } from '@/styles/theme/palette-constants';
import { calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { packKeys } from '@/queries/query-keys';
import { getCategoryIndex } from '@/queries/pack-queries';

type Handlers = {
	addCategory: (packId: number, categories: Category[]) => void;
	editCategory: (categoryChanges: HeaderInfo) => void;
	deleteCategory: (packCategoryId: number) => void;
	deleteCategoryAndItems: (packCategoryId: number) => void;
	onDragEnd: (result: DropResult, pack: Pack, paramPackId: string | undefined) => void;
};

type HandlerData = {
	handlers: Handlers;
};

const useCreateHandlers = () => {
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

	//--Handlers--//

	const handleEditCategory = (categoryChanges: HeaderInfo) => {
		editPackCategory.mutate(categoryChanges);
	};

	const handleDeleteCategoryAndItems = (packCategoryId: number) => {
		deletePackCategoryAndItems.mutate(packCategoryId);
	};

	const handleDeleteCategory = (packCategoryId: number) => {
		deletePackCategory.mutate(packCategoryId);
	};

	const handleAddPackCategory = (packId: number, categories: Category[]) => {
		// Calculate next palette color based on current categories length
		const nextColorIndex = categories.length % paletteList.length;
		const categoryColor = paletteList[nextColorIndex];
		
		addPackCategory.mutate({ packId, categoryColor });
	};

	const handleOnDragEnd = (
		result: DropResult,
		pack: Pack,
		paramPackId: string | undefined,
	) => {
		const { draggableId, destination, source, type } = result;

		if (!destination) return;
		const sameIndex = destination.index === source.index;

		if (type === 'category') {
			if (sameIndex) return;
			if (!pack || !pack.packId) return;

			// Get adjacent categories for fractional indexing
			const categories = pack.categories || [];
			const { prevItem: prevCategory, nextItem: nextCategory } = calculateAdjacentItems(
				categories,
				source.index,
				destination.index
			);


			applySynchronousDragUpdate<InitialState>(
				queryClient,
				packKeys.packId(pack.packId),
				source.index,
				destination.index,
				'categories'
			);

			// Then trigger the mutation
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

			// Apply optimistic update first and capture the updated state
			let updatedDestItems: any[] = [];
			
			queryClient.setQueryData<InitialState>(
				packKeys.packId(pack.packId), 
				(old) => {
					if (!old) return old;

					const { categories } = old;
					const prevCategoryIndex = getCategoryIndex(categories, source.droppableId);
					
					if (sameCategory) {
						const result = Array.from(categories[prevCategoryIndex].packItems);
						const [removed] = result.splice(source.index, 1);
						result.splice(destination.index, 0, removed);
						
						categories[prevCategoryIndex].packItems = result;
						// For same category, use the updated items
						updatedDestItems = result;
					} else {
						const [item] = categories[prevCategoryIndex].packItems.splice(source.index, 1);
						const newCategoryIndex = getCategoryIndex(categories, destination.droppableId);
						categories[newCategoryIndex].packItems.splice(destination.index, 0, item);
						// For cross-category, get the updated destination category items
						updatedDestItems = categories[newCategoryIndex].packItems;
					}

					return old;
				}
			);

			// For same-category moves, use shared adjacent item calculation
			if (sameCategory) {
				const { prevItem, nextItem } = calculateAdjacentItems(
					updatedDestItems,
					source.index,
					destination.index
				);
				
				const dragId = draggableId.replace(/\D/g, '');
				movePackItem.mutate({
					packId: paramPackId ? pack.packId : null,
					packItemId: dragId,
					packCategoryId: destination.droppableId,
					prevPackCategoryId: source.droppableId,
					prevItemIndex: prevItem?.packItemIndex,
					nextItemIndex: nextItem?.packItemIndex,
				});
			} else {
				// Cross-category move - use the updated destination items after optimistic update
				// For cross-category moves, we need to consider the CURRENT state of destination category
				if (destination.index === 0) {
					// Dropping at top of destination category
					// Find the current top item in destination category (excluding the item we just added)
					// Since we already added the item optimistically, we need the item that was originally at position 0
					const topItemInDestCategory = updatedDestItems[1]; // Item that was at position 0 before our drop
					
					const dragId = draggableId.replace(/\D/g, '');
					movePackItem.mutate({
						packId: paramPackId ? pack.packId : null,
						packItemId: dragId,
						packCategoryId: destination.droppableId,
						prevPackCategoryId: source.droppableId,
						prevItemIndex: undefined,
						nextItemIndex: topItemInDestCategory?.packItemIndex,
					});
				} else {
					// Dropping in middle/bottom of destination category
					// Since we've already placed the item optimistically, we need to get adjacent items
					// excluding the dropped item to get correct fractional indexes
					const prevItem = updatedDestItems[destination.index - 1];
					const nextItem = updatedDestItems[destination.index + 1]; // Skip the item we just dropped
					
					const dragId = draggableId.replace(/\D/g, '');
					movePackItem.mutate({
						packId: paramPackId ? pack.packId : null,
						packItemId: dragId,
						packCategoryId: destination.droppableId,
						prevPackCategoryId: source.droppableId,
						prevItemIndex: prevItem?.packItemIndex,
						nextItemIndex: nextItem?.packItemIndex,
					});
				}
			}
		}
	};
	//--Handlers--//

	const handlers: Handlers = {
		addCategory: handleAddPackCategory,
		editCategory: handleEditCategory,
		deleteCategory: handleDeleteCategory,
		deleteCategoryAndItems: handleDeleteCategoryAndItems,
		onDragEnd: handleOnDragEnd,
	};

	return { handlers, mutations };
};

export const HandlerContext = createContext<HandlerData | {}>({});

export const usePackCategoryHandlers = () => useContext(HandlerContext) as HandlerData;

export const HandlerWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<HandlerContext.Provider value={useCreateHandlers()}>
			{children}
		</HandlerContext.Provider>
	);
};
