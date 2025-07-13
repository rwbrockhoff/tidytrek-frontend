import { useState, useCallback, useMemo } from 'react';
import { type Category } from '@/types/pack-types';
import { convertCurrency, convertWeight, convertQuantity } from '@/utils';

export const usePackCategory = (category: Category) => {
	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const [isMinimized, setMinimized] = useState(false);

	const handleMinimizeCategory = useCallback(
		() => setMinimized(!isMinimized),
		[isMinimized],
	);

	const { totalWeight: convertedCategoryWeight, totalPrice } = useMemo(
		() => convertWeight(packItems, 'lb'),
		[packItems],
	);

	const formattedTotalPrice = useMemo(
		() => convertCurrency(totalPrice, 'USD'),
		[totalPrice],
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
