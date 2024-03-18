import { DropResult } from 'react-beautiful-dnd';
import { usePackCategoryMutations } from '../mutations/use-category-mutations';
import { createContext, useContext } from 'react';
import { Pack } from '@/types/pack-types';
import { usePackItemMutations } from '../mutations/use-item-mutations';

export type HeaderInfo = {
	packCategoryId: number;
	packCategoryName?: string;
	packCategoryColor?: string;
};

type Handlers = {
	addCategory: (packId: number) => void;
	editCategory: (categoryChanges: HeaderInfo) => void;
	deleteCategory: (packCategoryId: number) => void;
	deleteCategoryAndItems: (packCategoryId: number) => void;
	onDragEnd: (result: DropResult, pack: Pack, paramPackId: string | undefined) => void;
};

// Exposed mutations being used outside of handlers
type Mutations = {};

type HandlerData = {
	handlers: Handlers;
	mutations: Mutations;
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

	const handleAddPackCategory = (packId: number) => {
		addPackCategory.mutate(packId);
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

			movePackCategory.mutate({
				packId: pack.packId,
				paramPackId,
				packCategoryId: draggableId,
				prevIndex: source.index,
				newIndex: destination.index,
			});
		} else {
			const sameCategory = destination.droppableId === source.droppableId;
			if (sameIndex && sameCategory) return;

			const dragId = draggableId.replace(/\D/g, '');
			movePackItem.mutate({
				packId: paramPackId ? pack.packId : null,
				packItemId: dragId,
				packCategoryId: destination.droppableId,
				packItemIndex: destination.index,
				prevPackCategoryId: source.droppableId,
				prevPackItemIndex: source.index,
			});
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
