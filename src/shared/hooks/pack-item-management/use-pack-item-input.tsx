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
		// Only sync from parent if we haven't made local changes
		if (!packItemChanged) {
			setPackItem({ ...item });
		}
	}, [item, packItemChanged]);

	const updateField = (name: string, value: string) => {
		let processedValue: string | number;
		if (name === 'packItemPrice') {
			// Keep price as string during editing to preserve decimals
			processedValue = value;
		} else if (['packItemQuantity', 'packItemWeight'].includes(name)) {
			processedValue = parseFloat(value) || 0;
		} else {
			processedValue = value;
		}
		
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
