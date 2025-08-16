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
