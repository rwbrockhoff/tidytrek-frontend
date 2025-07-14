import { useDeletePackItemMutation, useMoveItemToClosetMutation } from '@/queries/pack-queries';
import { type PackItem } from '@/types/pack-types';

export const useDeletePackItem = () => {
	const deleteItemMutation = useDeletePackItemMutation();
	const moveToClosetMutation = useMoveItemToClosetMutation();

	const deleteItem = (item: PackItem) => {
		deleteItemMutation.mutate(item.packItemId);
	};

	const moveToCloset = (item: PackItem) => {
		moveToClosetMutation.mutate(item.packItemId);
	};

	return {
		deleteItem,
		moveToCloset,
		isDeleting: deleteItemMutation.isPending,
		isMoving: moveToClosetMutation.isPending,
	};
};