import { formatNumber } from '../format-number';

describe('formatNumber', () => {
	it('returns numbers under 1000 as-is', () => {
		expect(formatNumber(0)).toBe('0');
		expect(formatNumber(42)).toBe('42');
		expect(formatNumber(999)).toBe('999');
	});

	it('formats thousands with k', () => {
		expect(formatNumber(1000)).toBe('1k');
		expect(formatNumber(1500)).toBe('1.5k');
		expect(formatNumber(2000)).toBe('2k');
		expect(formatNumber(15500)).toBe('15.5k');
	});

	it('formats millions with M', () => {
		expect(formatNumber(1000000)).toBe('1M');
		expect(formatNumber(1200000)).toBe('1.2M');
		expect(formatNumber(2500000)).toBe('2.5M');
	});
});