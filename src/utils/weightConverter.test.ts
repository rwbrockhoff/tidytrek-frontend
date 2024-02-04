import { quantityConverter, weightConverter } from './weightConverter';
import { mockPackItems, mockPackItemsWithMultipleItems } from './mockData';

describe('Weight Converter Utility Fn', () => {
	it('Should return 0 for empty array of pack items', () => {
		const { totalWeight } = weightConverter([], 'lb');
		expect(totalWeight).toBe(0);
	});

	it('Should still return 0 given bad metric argument', () => {
		const { totalWeight } = weightConverter([], 'badMetric');
		expect(totalWeight).toBe(0);
	});

	it('Should return float with decimal', () => {
		const { totalWeight } = weightConverter(mockPackItems, 'lb');
		expect(String(totalWeight)).toContain('.');
	});

	it('Should convert to pounds', () => {
		const { totalWeight } = weightConverter(mockPackItems, 'lb');
		expect(totalWeight).toBe(7.91);
	});

	it('Should convert to ounces', () => {
		const { totalWeight } = weightConverter(mockPackItems, 'oz');
		expect(totalWeight).toBe(14230.79);
	});

	it('Should convert to kilograms', () => {
		const { totalWeight } = weightConverter(mockPackItems, 'kg');
		expect(totalWeight).toBe(3.59);
	});

	it('Should convert to grams', () => {
		const { totalWeight } = weightConverter(mockPackItems, 'g');
		expect(totalWeight).toBe(3587.57);
	});

	it('Should multiply weight for items with quantity > 1', () => {
		const { totalWeight } = weightConverter(mockPackItemsWithMultipleItems, 'lb');
		expect(totalWeight).toBe(12.41);
	});
});

describe('Quantity Converter Utility Fn: ', () => {
	it('Should return 0 for empty list', () => {
		const result = quantityConverter([]);
		expect(result).toBe(0);
	});

	it('Should handle items with only 1 quantity each', () => {
		const result = quantityConverter(mockPackItems);
		expect(result).toBe(4);
	});

	it('Should handle items with quantity > 1', () => {
		const result = quantityConverter(mockPackItemsWithMultipleItems);
		expect(result).toBe(7);
	});
});
