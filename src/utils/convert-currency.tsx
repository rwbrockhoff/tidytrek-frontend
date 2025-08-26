import { useMemo } from 'react';

const formatters: Record<string, Intl.NumberFormat> = {};

const getCurrencyFormatter = (currency: string): Intl.NumberFormat => {
	if (!formatters[currency]) {
		formatters[currency] = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		});
	}
	return formatters[currency];
};

export const useConvertCurrency = (currency: string) => {
	return useMemo(
		() => (price: number) => {
			const validPrice = !Number.isFinite(price) || price < 0 ? 0 : price;
			const validCurrency = currency || 'USD';

			const formatter = getCurrencyFormatter(validCurrency);
			return formatter.format(validPrice);
		},
		[currency],
	);
};
