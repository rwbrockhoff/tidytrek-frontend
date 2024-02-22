import { usePackCategoryMutations } from '../mutations/usePackCategoryMutations';
import { createContext, useContext, useState } from 'react';

export type HeaderInfo = {
	packCategoryId: number;
	packCategoryName?: string;
	packCategoryColor?: string;
};

type Handlers = {
	toggleCategoryModal: () => void;
	editCategory: (categoryChanges: HeaderInfo) => void;
	deleteCategory: (packCategoryId: number) => void;
	deleteCategoryAndItems: (packCategoryId: number) => void;
};

type Mutations = {};

type HandlerState = { showDeleteCategoryModal: boolean };

type HandlerData = {
	handlers: Handlers;
	mutations: Mutations;
	handlerState: HandlerState;
};

const useCreateHandlers = () => {
	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

	const mutations = usePackCategoryMutations();
	const { deletePackCategory, deletePackCategoryAndItems, editPackCategory } = mutations;

	//--Handlers--//

	const handleToggleCategoryModal = () =>
		setShowDeleteCategoryModal(!showDeleteCategoryModal);

	const handleEditCategory = (categoryChanges: HeaderInfo) => {
		editPackCategory.mutate(categoryChanges);
	};

	const handleDeleteCategoryAndItems = (packCategoryId: number) => {
		deletePackCategoryAndItems.mutate(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleDeleteCategory = (packCategoryId: number) => {
		deletePackCategory.mutate(packCategoryId);
		setShowDeleteCategoryModal(false);
	};
	//--Handlers--//

	const handlers: Handlers = {
		toggleCategoryModal: handleToggleCategoryModal,
		editCategory: handleEditCategory,
		deleteCategory: handleDeleteCategory,
		deleteCategoryAndItems: handleDeleteCategoryAndItems,
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
