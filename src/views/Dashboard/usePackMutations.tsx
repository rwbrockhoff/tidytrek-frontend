import {
	useAddPackCategoryMutation,
	useMovePackItemMutation,
	useMovePackCategoryMutation,
	useAddNewPackItemMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
	useEditPackCategoryMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
	useMoveItemToClosetMutation,
} from '../../queries/packQueries';

import { useMoveItemToPackMutation } from '../../queries/closetQueries';

export const usePackMutations = () => {
	const addPackCategory = useAddPackCategoryMutation();
	const editPackCategory = useEditPackCategoryMutation();
	const movePackCategory = useMovePackCategoryMutation();
	const deletePackCategory = useDeletePackCategoryMutation();
	const deletePackCategoryAndItems = useDeletePackCategoryAndItemsMutation();

	const addPackItem = useAddNewPackItemMutation();
	const editPackItem = useEditPackItemMutation();
	const movePackItem = useMovePackItemMutation();
	const movePackItemToCloset = useMoveItemToClosetMutation();
	const moveItemToPack = useMoveItemToPackMutation();
	const deletePackItem = useDeletePackItemMutation();

	return {
		addPackCategory,
		editPackCategory,
		movePackCategory,
		deletePackCategory,
		deletePackCategoryAndItems,

		addPackItem,
		editPackItem,
		movePackItemToCloset,
		movePackItem,
		moveItemToPack,
		deletePackItem,
	};
};
