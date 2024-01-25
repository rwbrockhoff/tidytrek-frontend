import { useState, useEffect } from 'react';
import { type PackItem } from '../../../../redux/packs/packTypes';

export const useTableRowInput = (item: PackItem) => {
	const [packItemChanged, setPackItemChanged] = useState(false);
	const [packItem, setPackItem] = useState({
		packItemName: '',
		packItemId: 0,
		packCategoryId: 0,
		packItemDescription: '',
		packItemWeight: 0,
		packItemUnit: 'oz',
		packItemQuantity: 1,
		packItemUrl: '',
		wornWeight: false,
		consumable: false,
		favorite: false,
	});

	useEffect(() => {
		setPackItem({ ...item });
	}, [item]);

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
	) => {
		setPackItem((prevFormData) => ({
			...prevFormData,
			[e.target?.name]: e.target?.value,
		}));
		if (!packItemChanged) setPackItemChanged(true);
	};

	return { packItem, handleInput, packItemChanged };
};
