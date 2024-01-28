import { Category } from '../../../types/packTypes';
import { weightConverter } from '../../../utils/weightConverter';
import { useMemo } from 'react';

export const useWeightSum = (packCategories: Category[]) => {
	return useMemo(() => {
		const categoryWeights = packCategories.map((category) => {
			return weightConverter(category.packItems, 'lb');
		});

		const packHasWeight = categoryWeights.reduce((acc, item) => (acc += item), 0) > 0;

		return { categoryWeights, packHasWeight };
	}, [packCategories]);
};
