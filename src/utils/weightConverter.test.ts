import weightConverter from './weightConverter';
import { mockPackItems } from './mockData';

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
});
