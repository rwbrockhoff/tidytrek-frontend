import { useState, useEffect } from 'react';
import { type PackItem } from '@/types/pack-types';
import { type InputEvent, type SelectEvent } from '@/types/form-types';

export const useTableRowInput = (item: PackItem) => {
	const [packItemChanged, setPackItemChanged] = useState(false);
	const [packItem, setPackItem] = useState<PackItem>({
		packId: 0,
		packItemName: '',
		packItemId: 0,
		packItemIndex: 0,
		packCategoryId: 0,
		packItemDescription: '',
		packItemWeight: 0,
		packItemUnit: 'oz',
		packItemQuantity: 1,
		packItemUrl: '',
		wornWeight: false,
		consumable: false,
		favorite: false,
		packItemPrice: 0,
	});

	useEffect(() => {
		setPackItem({ ...item });
	}, [item]);

	const handleInput = (e: InputEvent | SelectEvent) => {
		setPackItem((prevFormData) => ({
			...prevFormData,
			[e.target?.name]: e.target?.value,
		}));
		if (!packItemChanged) setPackItemChanged(true);
	};

	return { packItem, handleInput, packItemChanged };
};
