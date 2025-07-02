import { useCallback } from 'react';
import { type BaseTableRowItem, isPackItem } from '@/types/pack-types';
import { cleanUpLink } from '@/utils/link-utils';
import { usePackItemMutations } from '../mutations/use-item-mutations';

type AddItemInfo = { packId: number; packCategoryId: number };

export const usePackItemActions = () => {
	const mutations = usePackItemMutations();
	const { editPackItem, deletePackItem, movePackItemToCloset, addPackItem } = mutations;

	// Add Pack Item
	const handleAddItem = useCallback(
		(addItemInfo: AddItemInfo) => {
			addPackItem.mutate(addItemInfo);
		},
		[addPackItem],
	);

	// Edit Pack Item
	const handleEditPackItem = useCallback(
		(packItem: BaseTableRowItem) => {
			const { packItemId, packItemUrl } = packItem;
			const cleanUrl = cleanUpLink(packItemUrl);

			if (isPackItem(packItem)) {
				editPackItem.mutate({
					packItemId,
					packItem: { ...packItem, packItemUrl: cleanUrl },
				});
			}
		},
		[editPackItem],
	);

	// Move Pack Item
	const handleMoveItemToCloset = useCallback(
		(packItemId: number) => {
			movePackItemToCloset.mutate(packItemId);
		},
		[movePackItemToCloset],
	);

	// Delete Pack Item
	const handleDeleteItem = useCallback(
		(packItemId: number) => {
			deletePackItem.mutate(packItemId);
		},
		[deletePackItem],
	);

	// Use as const to infer exact types from SimpleMutation
	return {
		addPackItem: handleAddItem,
		editPackItem: handleEditPackItem,
		moveItemToCloset: handleMoveItemToCloset,
		deletePackItem: handleDeleteItem,
		// Raw mutations for drag/drop operations
		mutations: {
			movePackItem: mutations.movePackItem,
			editPackItem: mutations.editPackItem,
		},
	} as const;
};
