import { type BaseTableRowItem, type PackItemProperty } from '@/types/pack-types';
import { z } from 'zod';
import { useTableRowValidation } from './use-table-row-validation';

type UseTableRowActionsProps = {
  packItem: BaseTableRowItem;
  packItemChanged: boolean;
  handleOnSave: (packItem: BaseTableRowItem) => void;
  handleDelete: (packItemId: number) => void;
  moveToCloset?: (packItemId: number) => void;
  updateFormErrors: (errors: z.ZodIssue[]) => void;
};

export const useTableRowActions = ({
  packItem,
  packItemChanged,
  handleOnSave,
  handleDelete,
  moveToCloset,
  updateFormErrors,
}: UseTableRowActionsProps) => {
  const { validatePackItem } = useTableRowValidation();

  const handleToggle = () => {
    if (packItemChanged) {
      const { isValid, errors } = validatePackItem(packItem);
      if (!isValid) {
        return updateFormErrors(errors);
      }
      handleOnSave(packItem);
    }
  };

  const handleChangeProperty = (property: PackItemProperty) =>
    handleOnSave({ ...packItem, ...property });

  const handleMoveItemToCloset = () => {
    moveToCloset && moveToCloset(packItem.packItemId);
  };

  const handleDeleteItem = () => {
    handleDelete(packItem.packItemId);
  };

  return {
    handleToggle,
    handleChangeProperty,
    handleMoveItemToCloset,
    handleDeleteItem,
  };
};