import { type InternalMutation } from '@/types/form-types';
import { type MovePackItemProps, type PackItem } from '@/types/pack-types';
import { createContext, useContext } from 'react';
import { cleanUpLink } from '@/components/ui';
import { usePackItemMutations } from '../mutations/use-item-mutations';

type AddItemInfo = { packId: number; packCategoryId: number };

type Handlers = {
	addPackItem: (addItemInfo: AddItemInfo) => void;
	moveItemToCloset: (packItemId: number) => void;
	editPackItem: (packItem: PackItem) => void;
	deleteItem: (packItemId: number) => void;
};

// Exposed mutations being used outside of handlers
type Mutations = {
	movePackItem: InternalMutation<MovePackItemProps>;
	editPackItem: InternalMutation<{
		packInfo: { packItemId: number; packItem: PackItem };
	}>;
};

type HandlerData = {
	handlers: Handlers;
	mutations: Mutations;
};

const useCreateHandlers = () => {
	const mutations = usePackItemMutations();
	const { editPackItem, deletePackItem, movePackItemToCloset, addPackItem } = mutations;

	//-Handlers--//
	const handleEditPackItem = (packItem: PackItem) => {
		const { packItemId } = packItem;
		const { packItemUrl } = packItem;
		const cleanUrl = cleanUpLink(packItemUrl);
		editPackItem.mutate({ packItemId, packItem: { ...packItem, packItemUrl: cleanUrl } });
	};

	const handleAddItem = (addItemInfo: AddItemInfo) => addPackItem.mutate(addItemInfo);

	const handleMoveItemToCloset = (packItemId: number) => {
		movePackItemToCloset.mutate(packItemId);
	};

	const handleDeleteItem = (packItemId: number) => {
		deletePackItem.mutate(packItemId);
	};

	//-Handlers--//

	const handlers: Handlers = {
		addPackItem: handleAddItem,
		editPackItem: handleEditPackItem,
		moveItemToCloset: handleMoveItemToCloset,
		deleteItem: handleDeleteItem,
	};

	return { handlers, mutations };
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
