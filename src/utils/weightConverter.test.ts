import { quantityConverter, weightConverter } from './weightConverter';
import { mockPackItems, mockPackItemsWithMultipleItems } from './mockData';

describe('Weight Converter Utility Fn', () => {
  it('Should return 0 for empty array of pack items', () => {
    const result = weightConverter([], 'lb');
    expect(result).toBe(0);
  });

  it('Should still return 0 given bad metric argument', () => {
    const result = weightConverter([], 'badMetric');
    expect(result).toBe(0);
  });

  it('Should return float with decimal', () => {
    const result = weightConverter(mockPackItems, 'lb');
    expect(String(result)).toContain('.');
  });

  it('Should convert to pounds', () => {
    const result = weightConverter(mockPackItems, 'lb');
    expect(result).toBe(7.91);
  });

  it('Should convert to ounces', () => {
    const result = weightConverter(mockPackItems, 'oz');
    expect(result).toBe(14230.79);
  });

  it('Should convert to kilograms', () => {
    const result = weightConverter(mockPackItems, 'kg');
    expect(result).toBe(3.59);
  });

  it('Should convert to grams', () => {
    const result = weightConverter(mockPackItems, 'g');
    expect(result).toBe(3587.57);
  });

  it('Should multiply weight for items with quantity > 1', () => {
    const result = weightConverter(mockPackItemsWithMultipleItems, 'lb');
    expect(result).toBe(12.41);
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
