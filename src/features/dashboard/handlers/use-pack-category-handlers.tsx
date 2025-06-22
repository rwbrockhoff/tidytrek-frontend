import { type DropResult } from 'react-beautiful-dnd';
import { type HeaderInfo, type Pack, type Category } from '@/types/pack-types';
import { usePackCategoryMutations } from '../mutations/use-category-mutations';
import { createContext, useContext } from 'react';
import { usePackItemMutations } from '../mutations/use-item-mutations';
import { paletteList } from '@/styles/theme/palette-constants';
import { calculateAdjacentItems } from '@/utils';

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

			// Find destination category and get adjacent items
			const destCategory = pack.categories?.find(
				cat => cat.packCategoryId.toString() === destination.droppableId
			);
			let destItems = destCategory?.packItems || [];
			
			// For same-category moves, use shared adjacent item calculation
			if (sameCategory) {
				const { prevItem, nextItem } = calculateAdjacentItems(
					destItems,
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
				// Cross-category move - consider global ordering
				// For cross-category moves, we need to consider what the user actually sees
				// If dropping at top of destination category, compare with global minimum
				if (destination.index === 0) {
					// Dropping at top of destination category
					// Find the current top item in destination category
					const topItemInDestCategory = destItems[0];
					
					const dragId = draggableId.replace(/\D/g, '');
					movePackItem.mutate({
						packId: paramPackId ? pack.packId : null,
						packItemId: dragId,
						packCategoryId: destination.droppableId,
						prevPackCategoryId: source.droppableId,
						prevItemIndex: undefined, // No item before (top position)
						nextItemIndex: topItemInDestCategory?.packItemIndex,
					});
				} else {
					// Dropping in middle/bottom of destination category
					const prevItem = destItems[destination.index - 1];
					const nextItem = destItems[destination.index];
					
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
