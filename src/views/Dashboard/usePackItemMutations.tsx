import {
	useMovePackItemMutation,
	useAddNewPackItemMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
	useMoveItemToClosetMutation,
} from '../../queries/packQueries';

import { useMoveItemToPackMutation } from '../../queries/closetQueries';

export const usePackItemMutations = () => {
	const addPackItem = useAddNewPackItemMutation();
	const editPackItem = useEditPackItemMutation();
	const movePackItem = useMovePackItemMutation();
	const movePackItemToCloset = useMoveItemToClosetMutation();
	const moveItemToPack = useMoveItemToPackMutation();
	const deletePackItem = useDeletePackItemMutation();

	return {
		addPackItem,
		editPackItem,
		movePackItemToCloset,
		movePackItem,
		moveItemToPack,
		deletePackItem,
	};
};
