type MoveResult = {
	newIndex: string;
	rebalanced: boolean;
};

type WithId = {
	packId?: number | string;
	packItemId?: number | string;
	packCategoryId?: number | string;
};

const INDEX_FIELD_MAP = {
	packId: 'packIndex',
	packItemId: 'packItemIndex',
	packCategoryId: 'packCategoryIndex',
} as const;

/**
 * Updates index field for specific item after drag-and-drop operations.
 * Handles different item types by matching the correct ID field.
 *
 * @param items - Array of items to update (packs, categories, or pack items)
 * @param result - Move result with new index and ID
 * @param idField - ID field to match (packId, packItemId, packCategoryId, etc)
 * @returns Updated array with new index value for the matching item
 */
export const updateItemIndex = <T extends WithId>(
	items: T[],
	result: MoveResult & WithId,
	idField: keyof WithId,
): T[] => {
	const indexField = INDEX_FIELD_MAP[idField];

	return items.map((item) => {
		const itemId = item[idField]?.toString();
		const resultId = result[idField]?.toString();

		if (itemId === resultId) {
			return { ...item, [indexField]: result.newIndex };
		}
		return item;
	});
};
