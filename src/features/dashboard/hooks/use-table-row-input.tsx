import { useState, useEffect } from 'react';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { clearZodErrors, useZodError } from '@/hooks';

export const useTableRowInput = (item: BaseTableRowItem) => {
	const [packItemChanged, setPackItemChanged] = useState(false);
	const [packItem, setPackItem] = useState<BaseTableRowItem>(item);

	const { formErrors, updateFormErrors, resetFormErrors, primaryError } =
		useZodError<BaseTableRowItem>(['packItemQuantity', 'packItemWeight', 'packItemPrice']);

	useEffect(() => {
		setPackItem({ ...item });
	}, [item]);

	const handleInput = (e: InputEvent | SelectEvent) => {
		setPackItem((prevFormData) => ({
			...prevFormData,
			[e.target?.name]: e.target?.value,
		}));
		if (!packItemChanged) setPackItemChanged(true);
		// clear errors
		clearZodErrors<BaseTableRowItem>(e, formErrors, resetFormErrors as (property: keyof BaseTableRowItem) => void);
	};

	return {
		packItem,
		handleInput,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	};
};
