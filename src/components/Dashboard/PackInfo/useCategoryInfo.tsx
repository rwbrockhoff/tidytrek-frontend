import { type Category } from '../../../types/packTypes';
import { weightConverter } from '../../../utils/weightConverter';
import { useMemo } from 'react';

export const useCategoryInfo = (packCategories: Category[], outputUnit: string) => {
	return useMemo(() => {
		let consumables = 0;
		let wornWeight = 0;

		// Calculate different weights properties for each category's pack items
		const categoryWeights = packCategories.map(({ packItems }) => {
			const { totalWeight, totalWornWeight, totalConsumableWeight } = weightConverter(
				packItems,
				outputUnit,
			);
			consumables += totalConsumableWeight;
			wornWeight += totalWornWeight;
			return totalWeight;
		});

		const totalWeight = Number(
			categoryWeights.reduce((acc, item) => (acc += item), 0).toFixed(2),
		);

		const packHasWeight = totalWeight > 0;

		// Create info to be displayed next to chart (color, name, and total weight)
		const chartCategoryInfo = categoryWeights.map((totalWeight: number, index) => {
			const categoryName = packCategories[index].packCategoryName;
			const categoryId = packCategories[index].packCategoryId;
			const chartColor = packCategories[index].packCategoryColor;
			return { categoryName, categoryId, totalWeight, chartColor };
		});

		// Calculate and format descriptive weights (baseweight, consumabels, wornweight)
		const baseWeight = totalWeight - (consumables + wornWeight);
		const descriptivePackWeight = {
			consumables: convertToDisplayWeight(consumables, 'lb'),
			wornWeight: convertToDisplayWeight(wornWeight, 'lb'),
			baseWeight: convertToDisplayWeight(baseWeight, 'lb'),
		};

		return {
			chartCategoryInfo,
			categoryWeights,
			totalWeight,
			packHasWeight,
			descriptivePackWeight,
		};
	}, [packCategories]);
};

const convertToDisplayWeight = (weight: number, outputUnit: string) => {
	if (!weight) return `0 ${outputUnit}s`;
	else {
		const numericalWeight = Number(weight).toFixed(2);
		return `${numericalWeight} ${outputUnit}s`;
	}
};
