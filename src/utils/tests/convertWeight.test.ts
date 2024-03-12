import { convertWeight, convertQuantity } from '../convertWeight';
import { mockPackItems, mockPackItemsWithMultipleItems } from '@/tests/mock-data';

describe('Weight Converter Utility Fn', () => {
	it('Should return 0 for empty array of pack items', () => {
		const { totalWeight } = convertWeight([], 'lb');
		expect(totalWeight).toBe(0);
	});

	it('Should still return 0 given bad metric argument', () => {
		const { totalWeight } = convertWeight([], 'badMetric');
		expect(totalWeight).toBe(0);
	});

	it('Should return float with decimal', () => {
		const { totalWeight } = convertWeight(mockPackItems, 'lb');
		expect(String(totalWeight)).toContain('.');
	});

	it('Should convert to pounds', () => {
		const { totalWeight } = convertWeight(mockPackItems, 'lb');
		expect(totalWeight).toBe(7.91);
	});

	it('Should convert to ounces', () => {
		const { totalWeight } = convertWeight(mockPackItems, 'oz');
		expect(totalWeight).toBe(14230.79);
	});

	it('Should convert to kilograms', () => {
		const { totalWeight } = convertWeight(mockPackItems, 'kg');
		expect(totalWeight).toBe(3.59);
	});

	it('Should convert to grams', () => {
		const { totalWeight } = convertWeight(mockPackItems, 'g');
		expect(totalWeight).toBe(3587.57);
	});

	it('Should multiply weight for items with quantity > 1', () => {
		const { totalWeight } = convertWeight(mockPackItemsWithMultipleItems, 'lb');
		expect(totalWeight).toBe(12.41);
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
