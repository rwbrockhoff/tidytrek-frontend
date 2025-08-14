import { useState, useEffect } from 'react';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { useZodError } from '@/hooks/form/use-zod-error';

export const usePackItemInput = (item: BaseTableRowItem) => {
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
		const numericFields = ['packItemQuantity', 'packItemWeight', 'packItemPrice'];
		const processedValue = numericFields.includes(name) ? parseFloat(value) || 0 : value;
		
		setPackItem((prevFormData) => ({
			...prevFormData,
			[name]: processedValue,
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
