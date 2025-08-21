import { type Category } from '@/types/pack-types';
import { useMemo } from 'react';
import { useConvertCurrency, convertWeight } from '@/utils';
import { usePackContext } from './use-pack-context';

/**
 * Calculates weight and price totals for pack categories
 * handles unit conversions and generating chart data.
 * Breaks down weights into: base weight, consumable, and worn weight.
 *
 * @param packCategories - Array of pack categories with pack items
 * @returns Object with weight totals, chart data, and formatted price info
 */

export const useCategoryInfo = (packCategories: Category[]) => {
	const { weightUnit: outputUnit, currency } = usePackContext();
	const convertCurrency = useConvertCurrency(currency);

	return useMemo(() => {
		let consumables = 0;
		let wornWeight = 0;
		let totalPackPrice = 0;

		const categories = packCategories || [];

		// Calculate different weights properties for each category's pack items
		const categoryWeights = categories.map((category) => {
			const packItems = category?.packItems || [];
			const { totalWeight, totalWornWeight, totalConsumableWeight, totalPrice } =
				convertWeight(packItems, outputUnit.base);
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
			consumables: convertToDisplayWeight(consumables, outputUnit.base),
			wornWeight: convertToDisplayWeight(wornWeight, outputUnit.base),
			baseWeight: convertToDisplayWeight(baseWeight, outputUnit.base),
		};

		return {
			chartCategoryInfo,
			categoryWeights,
			totalWeight,
			packHasWeight,
			descriptivePackWeight,
			totalPackPrice: convertCurrency(totalPackPrice),
		};
	}, [packCategories, outputUnit, convertCurrency]);
};

const convertToDisplayWeight = (weight: number, outputUnit: string) => {
	if (!weight) return `0 ${outputUnit}`;
	const numericalWeight = Number(weight).toFixed(2);
	const unit = Number(numericalWeight) === 1 ? outputUnit.slice(0, -1) : outputUnit;
	return `${numericalWeight} ${unit}`;
};
