import { type InternalMutation } from '../../../types/formTypes';
import { usePackItemMutations } from '../mutations/usePackItemMutations';
import { createContext, useContext, useState } from 'react';
import { MovePackItemProps, PackInfo, PackItem } from '../../../types/packTypes';
import { cleanUpLink } from '../../../components/ui/Link';

type AddItemInfo = { packId: number; packCategoryId: number };

type Handlers = {
	addPackItem: (addItemInfo: AddItemInfo) => void;
	moveItemToCloset: () => void;
	moveItemToPack: (packInfo: PackInfo) => void;
	editPackItem: (packItem: PackItem) => void;
	toggleItemModal: () => void;
	deleteItemPrompt: (packItemId: number) => void;
	deleteItem: () => void;
};

// Exposed mutations being used outside of handlers
type Mutations = {
	movePackItem: InternalMutation<MovePackItemProps>;
	editPackItem: InternalMutation<{
		packInfo: { packItemId: number; packItem: PackItem };
	}>;
};

type HandlerState = {
	packItemToChange: number | null;
	showDeleteItemModal: boolean;
};

type HandlerData = {
	handlers: Handlers;
	mutations: Mutations;
	handlerState: HandlerState;
};

const useCreateHandlers = () => {
	const [packItemToChange, setPackItemToChange] = useState<number | null>(null);
	const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

	const mutations = usePackItemMutations();
	const {
		editPackItem,
		deletePackItem,
		movePackItemToCloset,
		moveItemToPack,
		addPackItem,
	} = mutations;

	//-Handlers--//
	const handleEditPackItem = (packItem: PackItem) => {
		const { packItemId } = packItem;
		const { packItemUrl } = packItem;
		const cleanUrl = cleanUpLink(packItemUrl);
		editPackItem.mutate({ packItemId, packItem: { ...packItem, packItemUrl: cleanUrl } });
	};

	const handleToggleItemModal = () => setShowDeleteItemModal(!showDeleteItemModal);

	const handleAddItem = (addItemInfo: AddItemInfo) => addPackItem.mutate(addItemInfo);

	const handleMoveItemToPack = (packInfo: PackInfo) => moveItemToPack.mutate(packInfo);

	const handleMoveItemToCloset = () => {
		if (packItemToChange) movePackItemToCloset.mutate(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleDeleteItemPrompt = (packItemId: number) => {
		setPackItemToChange(packItemId);
		setShowDeleteItemModal(true);
	};

	const handleDeleteItem = () => {
		if (packItemToChange) deletePackItem.mutate(packItemToChange);
		setShowDeleteItemModal(false);
	};

	//-Handlers--//

	const handlers: Handlers = {
		addPackItem: handleAddItem,
		editPackItem: handleEditPackItem,
		moveItemToCloset: handleMoveItemToCloset,
		deleteItemPrompt: handleDeleteItemPrompt,
		deleteItem: handleDeleteItem,
		toggleItemModal: handleToggleItemModal,
		moveItemToPack: handleMoveItemToPack,
	};

	const handlerState: HandlerState = {
		packItemToChange,
		showDeleteItemModal,
	};
	return { handlers, mutations, handlerState };
};

export const HandlerContext = createContext<HandlerData | {}>({});

export const usePackItemHandlers = () => useContext(HandlerContext) as HandlerData;

export const HandlerWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<HandlerContext.Provider value={useCreateHandlers()}>
			{children}
		</HandlerContext.Provider>
	);
};
