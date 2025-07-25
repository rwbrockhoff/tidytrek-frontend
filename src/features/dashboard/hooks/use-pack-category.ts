import { useState, useMemo } from 'react';
import { type Category } from '@/types/pack-types';
import { useConvertCurrency, convertWeight, convertQuantity } from '@/utils';

export const usePackCategory = (category: Category) => {
	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const [isMinimized, setMinimized] = useState(false);
	const convertCurrency = useConvertCurrency();

	const handleMinimizeCategory = () => setMinimized(!isMinimized);

	const { totalWeight: convertedCategoryWeight, totalPrice } = useMemo(
		() => convertWeight(packItems, 'lb'),
		[packItems],
	);

	const formattedTotalPrice = useMemo(
		() => convertCurrency(totalPrice),
		[totalPrice, convertCurrency],
	);

	const itemQuantity = useMemo(
		() => (packItems[0] ? convertQuantity(packItems) : 0),
		[packItems],
	);

	return {
		// Category data
		packCategoryName,
		packCategoryColor,
		packCategoryId,
		packId,
		packItems,

		// State
		isMinimized,
		handleMinimizeCategory,

		// Calculated values
		convertedCategoryWeight,
		formattedTotalPrice,
		itemQuantity,
	};
};
