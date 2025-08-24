import { useState, useEffect } from 'react';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent, type FormError } from '@/types/form-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { useZodError } from '@/hooks/form/use-zod-error';

export const usePackItemInput = (item: BaseTableRowItem, apiError?: FormError) => {
	const [packItemChanged, setPackItemChanged] = useState(false);
	const [packItem, setPackItem] = useState<BaseTableRowItem>(item);

	const { formErrors, updateFormErrors, resetFormErrors, primaryError } =
		useZodError<BaseTableRowItem>([
			'packItemQuantity',
			'packItemWeight',
			'packItemPrice',
		]);

	useEffect(() => {
		// Sync packItem state when switching item (or on initial load)
		if (
			item.packItemId !== packItem.packItemId ||
			(!packItemChanged && packItem.packItemId) ||
			!packItem.packItemId
		) {
			setPackItem({ ...item });
			if (item.packItemId !== packItem.packItemId) {
				// Reset change flag when switching to a different item
				setPackItemChanged(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item.packItemId]); // Only depend on ID - this prevents sync during drag

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

	let combinedPrimaryError = { error: false, message: '' };
	if (primaryError.error) {
		combinedPrimaryError = primaryError;
	} else if (apiError?.error) {
		combinedPrimaryError = apiError;
	}

	const updatePackItem = (updates: Partial<BaseTableRowItem>) => {
		setPackItem(prev => ({ ...prev, ...updates }));
		if (!packItemChanged) setPackItemChanged(true);
	};

	return {
		packItem,
		onChange,
		updatePackItem,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError: combinedPrimaryError,
	};
};
