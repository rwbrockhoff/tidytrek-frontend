import { type PackItem, WeightUnit } from '@/types/pack-types';

// convertWeight sums the total weight of all pack items into one weight metric
// it also returns the total price, consumable weight, and wornWeight
// useCategoryInfo is the more complex hook used to summarize a pack (this hook is for a pack category);

export type WeightConversionResult = {
	totalWeight: number;
	totalWornWeight: number;
	totalConsumableWeight: number;
	totalPrice: number;
};

export const convertWeight = (itemList: PackItem[], outputUnit: WeightUnit): WeightConversionResult => {
	if (!itemList.length) {
		return {
			totalWeight: 0,
			totalWornWeight: 0,
			totalConsumableWeight: 0,
			totalPrice: 0,
		};
	}

	let totalConsumableWeight = 0;
	let totalWornWeight = 0;
	let totalPrice = 0;

	const totalWeight = itemList.reduce((acc, item) => {
		const {
			packItemWeight = 0,
			packItemWeightUnit = WeightUnit.oz,
			packItemQuantity = 1,
			wornWeight = false,
			consumable = false,
			packItemPrice = 0,
		} = item;

		// account for item quantities in weight & price
		const itemWeight = packItemWeight * packItemQuantity;
		totalPrice += packItemPrice * packItemQuantity;

		// convert weight unit if needed
		const convertedWeight =
			packItemWeightUnit === outputUnit
				? itemWeight
				: convertToUnit(itemWeight, packItemWeightUnit, outputUnit);

		// add to wornWeight or consumables if item has property
		if (wornWeight) totalWornWeight += convertedWeight;
		if (consumable) totalConsumableWeight += convertedWeight;

		return acc + convertedWeight;
	}, 0);

	return {
		totalWeight: Number(totalWeight.toFixed(2)),
		totalWornWeight: Number(totalWornWeight.toFixed(2)),
		totalConsumableWeight: Number(totalConsumableWeight.toFixed(2)),
		totalPrice,
	};
};

const convertToUnit = (weight: number, fromUnit: WeightUnit, toUnit: WeightUnit): number => {
	switch (toUnit) {
		case WeightUnit.oz:
			return convertToOunces(weight, fromUnit);
		case WeightUnit.lb:
			return convertToPounds(weight, fromUnit);
		case WeightUnit.kg:
			return convertToKilograms(weight, fromUnit);
		case WeightUnit.g:
			return convertToGrams(weight, fromUnit);
		default:
			return weight;
	}
};

function convertToOunces(weight: number, unit: WeightUnit) {
	switch (unit) {
		case WeightUnit.lb:
			return weight * 16;
		case WeightUnit.kg:
			return weight * 35.274;
		case WeightUnit.g:
			return weight / 28.3495;
		default:
			return weight;
	}
}

function convertToPounds(weight: number, unit: WeightUnit) {
	switch (unit) {
		case WeightUnit.oz:
			return weight / 16;
		case WeightUnit.kg:
			return weight * 2.20462;
		case WeightUnit.g:
			return weight * 0.00220462;
		default:
			return weight;
	}
}

function convertToKilograms(weight: number, unit: WeightUnit) {
	switch (unit) {
		case WeightUnit.oz:
			return weight / 35.274;
		case WeightUnit.lb:
			return weight * 0.453592;
		case WeightUnit.g:
			return weight / 1000;
		default:
			return weight;
	}
}

function convertToGrams(weight: number, unit: WeightUnit) {
	switch (unit) {
		case WeightUnit.oz:
			return weight * 28.3495;
		case WeightUnit.lb:
			return weight * 453.592;
		case WeightUnit.kg:
			return weight * 1000;
		default:
			return weight;
	}
}

export const convertQuantity = (items: PackItem[]) => {
	return items.reduce((acc, item) => (acc += item.packItemQuantity), 0);
};
