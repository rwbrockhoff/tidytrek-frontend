import { useState, useCallback, useMemo } from 'react';
import { type Category } from '@/types/pack-types';
import { usePackItemActions } from './use-pack-item-actions';
import { convertCurrency, convertWeight, convertQuantity } from '@/utils';

export const usePackCategory = (category: Category) => {
	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const [isMinimized, setMinimized] = useState(false);

	const { addPackItem, moveItemToCloset, editPackItem, deletePackItem } =
		usePackItemActions();

	const handleAddItem = useCallback(
		() => addPackItem({ packId, packCategoryId }),
		[addPackItem, packId, packCategoryId],
	);

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

	const showCategoryItems = packItems[0] && !isMinimized;

	return {
		// Category data
		packCategoryName,
		packCategoryColor,
		packCategoryId,
		packId,
		packItems,

		// State
		isMinimized,

		// Handlers
		handleAddItem,
		handleMinimizeCategory,

		// Pack item actions
		moveItemToCloset,
		editPackItem,
		deletePackItem,

		// Calculated values
		convertedCategoryWeight,
		formattedTotalPrice,
		itemQuantity,
		showCategoryItems,
	};
};
