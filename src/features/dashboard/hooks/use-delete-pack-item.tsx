import {
	useDeletePackItemMutation,
	useMoveItemToClosetMutation,
} from '@/queries/pack-queries';
import { type PackItem } from '@/types/pack-types';

export const useDeletePackItem = () => {
	const deleteItemMutation = useDeletePackItemMutation();
	const moveToClosetMutation = useMoveItemToClosetMutation();

	const deleteItem = (item: PackItem, onSuccess?: () => void) => {
		deleteItemMutation.mutate(
			{ packItemId: item.packItemId, packId: item.packId },
			{
				onSuccess,
			},
		);
	};

	const moveToCloset = (item: PackItem, onSuccess?: () => void) => {
		moveToClosetMutation.mutate(item.packItemId, {
			onSuccess,
		});
	};

	return {
		deleteItem,
		moveToCloset,
		isDeleting: deleteItemMutation.isPending,
		isMoving: moveToClosetMutation.isPending,
	};
};
