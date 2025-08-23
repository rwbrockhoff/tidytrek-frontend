import {
	useEditPackItemMutation,
	useDeletePackItemMutation,
} from '@/queries/pack-queries';
import { type ItemMutations } from './use-pack-item-row';
import { PackItem, type BaseTableRowItem } from '@/types/pack-types';

export const usePackItemMutations = (): ItemMutations => {
	const editMutation = useEditPackItemMutation();
	const deleteMutation = useDeletePackItemMutation();

	return {
		edit: {
			mutate: ({
				packItemId,
				packItem,
			}: {
				packItemId: number;
				packItem: BaseTableRowItem;
			}) => editMutation.mutate({ packItemId, packItem: packItem as PackItem }),
			error: editMutation.error,
			isError: editMutation.isError,
		},
		delete: {
			mutate: ({ packItemId, packId }: { packItemId: number; packId: number }) =>
				deleteMutation.mutate({ packItemId, packId }),
			error: deleteMutation.error,
			isError: deleteMutation.isError,
		},
	};
};
