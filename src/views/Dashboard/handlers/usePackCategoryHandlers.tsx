import { DropResult } from 'react-beautiful-dnd';
import { usePackCategoryMutations } from '../mutations/usePackCategoryMutations';
import { createContext, useContext, useState } from 'react';
import { Pack } from '../../../types/packTypes';
import { usePackItemMutations } from '../mutations/usePackItemMutations';

export type HeaderInfo = {
	packCategoryId: number;
	packCategoryName?: string;
	packCategoryColor?: string;
};

type Handlers = {
	addCategory: (packId: number) => void;
	toggleCategoryModal: () => void;
	editCategory: (categoryChanges: HeaderInfo) => void;
	deleteCategoryPrompt: (packCategoryId: number) => void;
	deleteCategory: () => void;
	deleteCategoryAndItems: () => void;
	onDragEnd: (result: DropResult, pack: Pack, paramPackId: string | undefined) => void;
};

// Exposed mutations being used outside of handlers
type Mutations = {};

type HandlerState = { showDeleteCategoryModal: boolean };

type HandlerData = {
	handlers: Handlers;
	mutations: Mutations;
	handlerState: HandlerState;
};

const useCreateHandlers = () => {
	const [packCategoryToDelete, setPackCategoryToDelete] = useState<number | null>(null);
	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

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

	const handleToggleCategoryModal = () =>
		setShowDeleteCategoryModal(!showDeleteCategoryModal);

	const handleDeleteCategoryPrompt = (packCategoryId: number) => {
		setPackCategoryToDelete(packCategoryId);
		setShowDeleteCategoryModal(true);
	};

	const handleEditCategory = (categoryChanges: HeaderInfo) => {
		editPackCategory.mutate(categoryChanges);
	};

	const handleDeleteCategoryAndItems = () => {
		if (packCategoryToDelete) deletePackCategoryAndItems.mutate(packCategoryToDelete);
		setShowDeleteCategoryModal(false);
	};

	const handleDeleteCategory = () => {
		if (packCategoryToDelete) deletePackCategory.mutate(packCategoryToDelete);
		setShowDeleteCategoryModal(false);
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
		toggleCategoryModal: handleToggleCategoryModal,
		editCategory: handleEditCategory,
		deleteCategoryPrompt: handleDeleteCategoryPrompt,
		deleteCategory: handleDeleteCategory,
		deleteCategoryAndItems: handleDeleteCategoryAndItems,
		onDragEnd: handleOnDragEnd,
	};

	const handlerState: HandlerState = {
		showDeleteCategoryModal,
	};

	return { handlers, mutations, handlerState };
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
