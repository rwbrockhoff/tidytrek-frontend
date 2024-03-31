import {
	useAddPackCategoryMutation,
	useMovePackCategoryMutation,
	useEditPackCategoryMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} from '@/queries/pack-queries';

export const usePackCategoryMutations = () => {
	const addPackCategory = useAddPackCategoryMutation();
	const editPackCategory = useEditPackCategoryMutation();
	const movePackCategory = useMovePackCategoryMutation();
	const deletePackCategory = useDeletePackCategoryMutation();
	const deletePackCategoryAndItems = useDeletePackCategoryAndItemsMutation();

	return {
		addPackCategory,
		editPackCategory,
		movePackCategory,
		deletePackCategory,
		deletePackCategoryAndItems,
	};
};
