import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useConvertCurrency } from '../convert-currency';

describe('useConvertCurrency', () => {
	it('formats USD currency correctly', () => {
		const { result } = renderHook(() => useConvertCurrency('USD'));
		const formatCurrency = result.current;

		expect(formatCurrency(25.5)).toBe('$25.5');
		expect(formatCurrency(100)).toBe('$100');
	});

	it('formats EUR currency correctly', () => {
		const { result } = renderHook(() => useConvertCurrency('EUR'));
		const formatCurrency = result.current;

		expect(formatCurrency(25.5)).toBe('€25.5');
		expect(formatCurrency(100)).toBe('€100');
	});

	it('handles invalid prices', () => {
		const { result } = renderHook(() => useConvertCurrency('USD'));
		const formatCurrency = result.current;

		expect(formatCurrency(-10)).toBe('$0');
		expect(formatCurrency(NaN)).toBe('$0');
	});

	it('defaults to USD when currency is empty', () => {
		const { result } = renderHook(() => useConvertCurrency(''));
		const formatCurrency = result.current;

		expect(formatCurrency(50)).toBe('$50');
	});
});
