import { type Category } from '@/types/pack-types';
import { useMemo } from 'react';
import { convertCurrency, convertWeight } from '@/utils';

// useCategoryInfo summarizes the weight (and price) of the entire pack
// it returns totalWeight, consumables, wornWeight, totalPackPrice
// and returns data required for the Pack Chart

export const useCategoryInfo = (packCategories: Category[], outputUnit: string) => {
	return useMemo(() => {
		let consumables = 0;
		let wornWeight = 0;
		let totalPackPrice = 0;

		let categories = packCategories || [];

		// Calculate different weights properties for each category's pack items
		const categoryWeights = categories.map((category) => {
			const packItems = category?.packItems || [];
			const { totalWeight, totalWornWeight, totalConsumableWeight, totalPrice } =
				convertWeight(packItems, outputUnit);
			consumables += totalConsumableWeight;
			wornWeight += totalWornWeight;
			totalPackPrice += totalPrice;
			return totalWeight;
		});

		const totalWeight = Number(
			categoryWeights.reduce((acc, item) => (acc += item), 0).toFixed(2),
		);

		const packHasWeight = totalWeight > 0;

		// Create info to be displayed next to chart (color, name, and total weight)
		const chartCategoryInfo = categoryWeights.map((totalWeight: number, index) => {
			const categoryName = categories[index].packCategoryName;
			const categoryId = categories[index].packCategoryId;
			const chartColor = categories[index].packCategoryColor;
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
			totalPackPrice: convertCurrency(totalPackPrice, 'USD'),
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
