import {
	useMovePackItemMutation,
	useAddNewPackItemMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
	useMoveItemToClosetMutation,
} from '@/queries/pack-queries';
import { useMoveItemToPackMutation } from '@/queries/closet-queries';

export const usePackItemMutations = () => {
	const addPackItem = useAddNewPackItemMutation();
	const editPackItem = useEditPackItemMutation();
	const movePackItem = useMovePackItemMutation();
	const movePackItemToCloset = useMoveItemToClosetMutation();
	const moveItemToPack = useMoveItemToPackMutation();
	const deletePackItem = useDeletePackItemMutation();

	// Use as const to infer exact types from SimpleMutation
	return {
		addPackItem,
		editPackItem,
		movePackItemToCloset,
		movePackItem,
		moveItemToPack,
		deletePackItem,
	} as const;
};
