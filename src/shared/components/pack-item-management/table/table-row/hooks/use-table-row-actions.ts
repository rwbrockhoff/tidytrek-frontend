import { type BaseTableRowItem, type PackItemProperty } from '@/types/pack-types';
import { type FormError } from '@/types/form-types';
import { useTableRowValidation } from './use-table-row-validation';
import { usePackItemInput } from '@/shared/hooks/pack-item-management/use-pack-item-input';

type UseTableRowActionsProps = {
	item: BaseTableRowItem;
	apiError: FormError;
	handleSave: (packItem: BaseTableRowItem) => void;
	handleDelete: (packItemId: number, packId?: number) => void;
	handleMoveItemToCloset: (packItemId: number) => void;
};

export const useTableRowActions = ({
	item,
	apiError,
	handleSave,
	handleDelete,
	handleMoveItemToCloset,
}: UseTableRowActionsProps) => {
	const { validatePackItem } = useTableRowValidation();

	// Local state
	const {
		packItem,
		onChange,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	} = usePackItemInput(item, apiError);

	const handleToggle = () => {
		if (packItemChanged) {
			const { isValid, errors } = validatePackItem(packItem);
			if (!isValid && errors) {
				return updateFormErrors(errors);
			}
			handleSave(packItem);
		}
	};

	const handleChangeProperty = (property: PackItemProperty) =>
		handleSave({ ...packItem, ...property });

	const handleDeleteItem = () => {
		handleDelete(packItem.packItemId, packItem.packId ?? undefined);
	};

	const handleMoveToCloset = () => {
		handleMoveItemToCloset(packItem.packItemId);
	};

	return {
		// Local state
		packItem,
		onChange,
		packItemChanged,
		formErrors,
		primaryError,
		// Actions
		handleToggle,
		handleChangeProperty,
		handleDeleteItem,
		handleMoveToCloset,
	};
};
