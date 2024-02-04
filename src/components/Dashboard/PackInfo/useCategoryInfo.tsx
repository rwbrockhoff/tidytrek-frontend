import { Category } from '../../../types/packTypes';
import { weightConverter } from '../../../utils/weightConverter';
import { useMemo } from 'react';

const chartColors = ['#338866', '#78B87A', '#5F84A2', '#7BB8C0', '#A7B5FE', '#F36F3B'];

export const useCategoryInfo = (packCategories: Category[]) => {
	return useMemo(() => {
		const categoryWeights = packCategories.map((category) => {
			return weightConverter(category.packItems, 'lb');
		});

		const totalWeight = Number(
			categoryWeights.reduce((acc, item) => (acc += item), 0).toFixed(2),
		);

		const packHasWeight = totalWeight > 0;

		const chartCategoryInfo = categoryWeights.map((totalWeight: number, index) => {
			const categoryName = packCategories[index].packCategoryName;
			const categoryId = packCategories[index].packCategoryId;
			const chartColor = chartColors[index];
			return { categoryName, categoryId, totalWeight, chartColor };
		});

		return { chartCategoryInfo, categoryWeights, totalWeight, packHasWeight };
	}, [packCategories]);
};
