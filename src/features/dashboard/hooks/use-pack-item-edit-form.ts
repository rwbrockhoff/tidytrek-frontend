import { useState, useEffect } from 'react';
import { type BaseTableRowItem, type PackItemProperty } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { convertCurrency } from '@/utils';
import { useToggle } from '@/hooks/ui/use-toggle';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';

type UsePackItemEditFormProps = {
	initialItem: BaseTableRowItem | null;
};

export const usePackItemEditForm = ({ initialItem }: UsePackItemEditFormProps) => {
	const [formData, setFormData] = useState<BaseTableRowItem | null>(null);
	const [itemChanged, setItemChanged] = useState(false);
	const { isToggled: isPriceEditing, toggle: togglePriceEdit } = useToggle();

	const { formErrors, resetFormErrors } = useZodError<BaseTableRowItem>([
		'packItemName',
		'packItemQuantity',
		'packItemWeight',
		'packItemPrice',
	]);

	useEffect(() => {
		if (initialItem) setFormData(initialItem);
	}, [initialItem]);

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors<BaseTableRowItem>(e, formErrors, resetFormErrors);
	};

	const handleInputChange = (e: InputEvent) => {
		const { name, value } = e.target;
		if (formData) {
			setFormData({ ...formData, [name]: value });
			handleClearErrors(e);
			if (!itemChanged) setItemChanged(true);
		}
	};

	const handleNumericChange = (field: keyof BaseTableRowItem, value: number) => {
		if (formData) {
			setFormData({ ...formData, [field]: value });
			if (!itemChanged) setItemChanged(true);
		}
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) e.target.value = '0';
		e.target.value = e.target.value.replace(/[^0-9\.-]+/g, '');
		handleNumericChange('packItemPrice', Number(e.target.value));
	};

	const handleWeightUnitChange = (unit: string) => {
		if (formData) {
			setFormData({ ...formData, packItemUnit: unit });
			if (!itemChanged) setItemChanged(true);
		}
	};

	const handlePropertyChange = (property: PackItemProperty) => {
		if (formData) {
			setFormData({ ...formData, ...property });
			if (!itemChanged) setItemChanged(true);
		}
	};

	const getFormattedPrice = () => {
		if (!formData) return '';

		return isPriceEditing
			? formData.packItemPrice === 0
				? ''
				: formData.packItemPrice?.toString() || ''
			: convertCurrency(formData.packItemPrice || 0, 'USD');
	};

	const handlePriceFocus = () => {
		if (!isPriceEditing) togglePriceEdit();
	};

	const handlePriceBlur = () => {
		if (isPriceEditing) togglePriceEdit();
	};

	const resetForm = () => {
		if (initialItem) {
			setFormData(initialItem);
			setItemChanged(false);
			resetFormErrors();
		}
	};

	return {
		formData,
		itemChanged,
		isPriceEditing,
		formErrors,
		handleInputChange,
		handleNumericChange,
		handlePriceChange,
		handleWeightUnitChange,
		handlePropertyChange,
		getFormattedPrice,
		handlePriceFocus,
		handlePriceBlur,
		resetForm,
	};
};
