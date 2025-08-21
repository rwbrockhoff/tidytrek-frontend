import { useState, useMemo } from 'react';
import { type Category, WeightUnit } from '@/types/pack-types';
import { useConvertCurrency, convertWeight, convertQuantity } from '@/utils';
import { usePackContext } from './use-pack-context';

export const usePackCategory = (category: Category, forceMinimized?: boolean) => {
	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const [isMinimized, setMinimized] = useState(forceMinimized ?? false);
	const { currency } = usePackContext();
	const convertCurrency = useConvertCurrency(currency);

	const handleMinimizeCategory = () => setMinimized(!isMinimized);

	const { totalWeight: convertedCategoryWeight, totalPrice } = useMemo(
		() => convertWeight(packItems, WeightUnit.lb),
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
