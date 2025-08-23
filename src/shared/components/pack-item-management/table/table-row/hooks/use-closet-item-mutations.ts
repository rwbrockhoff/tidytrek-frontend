import { useEditGearClosetItemMutation, useDeleteGearClosetItemMutation } from '@/queries/closet-queries';
import { type ItemMutations } from './use-pack-item-row';
import { type BaseTableRowItem, type GearClosetItem, isGearClosetItem } from '@/types/pack-types';

export const useClosetItemMutations = (): ItemMutations => {
  const editMutation = useEditGearClosetItemMutation();
  const deleteMutation = useDeleteGearClosetItemMutation();

  return {
    edit: {
      mutate: (data: { packItemId: number; packItem: BaseTableRowItem }) => {
        const { packItem } = data;
        if (isGearClosetItem(packItem)) {
          const gearClosetItem: GearClosetItem = {
            ...packItem,
            packId: null,
            packCategoryId: null,
          };
          editMutation.mutate(gearClosetItem);
        }
      },
      error: editMutation.error,
      isError: editMutation.isError,
    },
    delete: {
      mutate: ({ packItemId }: { packItemId: number; packId?: number }) => 
        deleteMutation.mutate(packItemId),
      error: deleteMutation.error,
      isError: deleteMutation.isError,
    },
  };
};