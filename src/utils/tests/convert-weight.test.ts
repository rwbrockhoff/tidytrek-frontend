import { convertWeight, convertQuantity } from '../convert-weight';
import { mockPackItems, mockPackItemsWithMultipleItems } from '@/tests/mock-data';
import { createMockPackItem } from '@/tests/mocks/pack-mocks';
import { WeightUnit } from '@/types/pack-types';

describe('Weight Converter Utility Fn', () => {
	it('Should return 0 for empty array of pack items', () => {
		const { totalWeight } = convertWeight([], WeightUnit.lb);
		expect(totalWeight).toBe(0);
	});

	it('Should still return 0 given bad metric argument', () => {
		const { totalWeight } = convertWeight([], 'badMetric' as WeightUnit);
		expect(totalWeight).toBe(0);
	});

	it('Should return float with decimal', () => {
		const { totalWeight } = convertWeight(mockPackItems, WeightUnit.lb);
		expect(String(totalWeight)).toContain('.');
	});

	it('Should convert to pounds', () => {
		const { totalWeight } = convertWeight(mockPackItems, WeightUnit.lb);
		expect(totalWeight).toBe(7.91);
	});

	it('Should convert to ounces', () => {
		const { totalWeight } = convertWeight(mockPackItems, WeightUnit.oz);
		expect(totalWeight).toBe(126.55);
	});

	it('Should convert to kilograms', () => {
		const { totalWeight } = convertWeight(mockPackItems, WeightUnit.kg);
		expect(totalWeight).toBe(3.59);
	});

	it('Should convert to grams', () => {
		const { totalWeight } = convertWeight(mockPackItems, WeightUnit.g);
		expect(totalWeight).toBe(3587.57);
	});

	it('Should multiply weight for items with quantity > 1', () => {
		const { totalWeight } = convertWeight(mockPackItemsWithMultipleItems, WeightUnit.lb);
		expect(totalWeight).toBe(12.41);
	});

	it('Should track worn weight separately', () => {
		const mockItem = [createMockPackItem({ packItemWeight: 2, packItemWeightUnit: WeightUnit.lb, wornWeight: true })];
		const { totalWornWeight } = convertWeight(mockItem, WeightUnit.lb);
		expect(totalWornWeight).toBe(2);
	});

	it('Should track consumable weight separately', () => {
		const mockItem = [createMockPackItem({ packItemWeight: 1.5, packItemWeightUnit: WeightUnit.lb, consumable: true })];
		const { totalConsumableWeight } = convertWeight(mockItem, WeightUnit.lb);
		expect(totalConsumableWeight).toBe(1.5);
	});

	it('Should accurately convert 16 oz to 1 lb', () => {
		const mockItem = [createMockPackItem({ packItemWeight: 16, packItemWeightUnit: WeightUnit.oz })];
		const { totalWeight } = convertWeight(mockItem, WeightUnit.lb);
		expect(totalWeight).toBe(1);
	});

	it('Should accurately convert 1000g to 1kg', () => {
		const mockItem = [createMockPackItem({ packItemWeight: 1000, packItemWeightUnit: WeightUnit.g })];
		const { totalWeight } = convertWeight(mockItem, WeightUnit.kg);
		expect(totalWeight).toBe(1);
	});
});

describe('Quantity Converter Utility Fn: ', () => {
	it('Should return 0 for empty list', () => {
		const result = convertQuantity([]);
		expect(result).toBe(0);
	});

	it('Should handle items with only 1 quantity each', () => {
		const result = convertQuantity(mockPackItems);
		expect(result).toBe(4);
	});

	it('Should handle items with quantity > 1', () => {
		const result = convertQuantity(mockPackItemsWithMultipleItems);
		expect(result).toBe(7);
	});
});
