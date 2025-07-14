import { useDeleteGearClosetItemMutation } from '@/queries/closet-queries';
import { type GearClosetItem } from '@/types/pack-types';

export const useDeleteGearClosetItem = () => {
	const deleteItemMutation = useDeleteGearClosetItemMutation();

	const deleteItem = (item: GearClosetItem) => {
		deleteItemMutation.mutate(item.packItemId);
	};

	return {
		deleteItem,
		isDeleting: deleteItemMutation.isPending,
	};
};