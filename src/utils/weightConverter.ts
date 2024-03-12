import { type PackItem } from '../types/pack-types';

// weightConverter sums the total weight of all pack items into one weight metric
// it also returns the total price, consumable weight, and wornWeight
// useCategoryInfo is the more complex hook used to summarize a pack (this hook is for a pack category);

export const weightConverter = (itemList: PackItem[], outputUnit: string) => {
	if (itemList[0]) {
		let totalConsumableWeight = 0;
		let totalWornWeight = 0;
		let totalPrice = 0;

		const totalWeight = itemList
			.map((item: PackItem) => {
				const {
					packItemWeight,
					packItemUnit,
					packItemQuantity,
					wornWeight,
					consumable,
					packItemPrice,
				} = item;

				// handle pricing first
				if (packItemPrice) totalPrice += packItemPrice * packItemQuantity;

				// Ensure we always return number type for reducer
				let convertedWeight = 0;
				const itemWeight = Number(packItemWeight) * packItemQuantity;

				if (packItemUnit === outputUnit || itemWeight === 0) {
					return itemWeight;
				}
				if (outputUnit === 'oz') {
					convertedWeight = convertToOunces(itemWeight, packItemUnit);
				} else if (outputUnit === 'lb') {
					convertedWeight = convertToPounds(itemWeight, packItemUnit);
				} else if (outputUnit === 'kg') {
					convertedWeight = convertToKilograms(itemWeight, packItemUnit);
				} else if (outputUnit === 'g') {
					convertedWeight = convertToGrams(itemWeight, packItemUnit);
				} else convertedWeight = itemWeight;

				if (wornWeight) totalWornWeight += convertedWeight;
				if (consumable) totalConsumableWeight += convertedWeight;

				return convertedWeight;
			})
			.reduce((weight: number, sum: number = 0) => (sum += weight))
			.toFixed(2);

		return {
			totalWeight: Number(totalWeight),
			totalWornWeight,
			totalConsumableWeight,
			totalPrice: totalPrice,
		};
	} else
		return {
			totalWeight: 0,
			totalWornWeight: 0,
			totalConsumableWeight: 0,
			totalPrice: 0,
		};
};

function convertToOunces(weight: number, unit: string) {
	switch (unit) {
		case 'lb':
			return weight * 16;
		case 'kg':
			return weight * 0.0283495;
		case 'g':
			return weight * 28.3495;
		default:
			return weight;
	}
}

function convertToPounds(weight: number, unit: string) {
	switch (unit) {
		case 'oz':
			return weight / 16;
		case 'kg':
			return weight * 2.20462;
		case 'g':
			return weight * 0.00220462;
		default:
			return weight;
	}
}

function convertToKilograms(weight: number, unit: string) {
	switch (unit) {
		case 'oz':
			return weight * 0.0283495;
		case 'lb':
			return weight * 0.453592;
		case 'g':
			return weight / 1000;
		default:
			return weight;
	}
}

function convertToGrams(weight: number, unit: string) {
	switch (unit) {
		case 'oz':
			return weight * 28.3495;
		case 'lb':
			return weight * 453.592;
		case 'kg':
			return weight * 1000;
		default:
			return weight;
	}
}

export const quantityConverter = (items: PackItem[]) => {
	return items.reduce((acc, item) => (acc += item.packItemQuantity), 0);
};
