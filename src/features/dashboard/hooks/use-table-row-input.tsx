import { useState, useEffect } from 'react';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { useZodError } from '@/hooks/form/use-zod-error';

// fields that should be cast from string to number on input
const numericFields = new Set(['packItemQuantity', 'packItemWeight', 'packItemPrice']);

export const useTableRowInput = (item: BaseTableRowItem) => {
	const [packItemChanged, setPackItemChanged] = useState(false);
	const [packItem, setPackItem] = useState<BaseTableRowItem>(item);

	const { formErrors, updateFormErrors, resetFormErrors, primaryError } =
		useZodError<BaseTableRowItem>([
			'packItemQuantity',
			'packItemWeight',
			'packItemPrice',
		]);

	useEffect(() => {
		setPackItem({ ...item });
	}, [item]);

	const updateField = (name: string, value: string) => {
		setPackItem((prevFormData) => ({
			...prevFormData,
			[name]: numericFields.has(name) ? Number(value) : value,
		}));
		if (!packItemChanged) setPackItemChanged(true);
	};
	const onChange = (e: InputEvent) => {
		const { name, value } = e.target as HTMLInputElement;
		updateField(name, value);
		clearZodErrors<BaseTableRowItem>(e, formErrors, resetFormErrors);
	};

	return {
		packItem,
		onChange,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	};
};
