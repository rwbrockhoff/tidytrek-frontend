import { useGetAuth } from '@/hooks/auth/use-get-auth';
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

export const useConvertCurrency = () => {
	const { settings } = useGetAuth();
	const userCurrency = settings?.currencyUnit || 'USD';

	return useMemo(
		() => (price: number) => {
			const validPrice = !Number.isFinite(price) || price < 0 ? 0 : price;

			const formatter = getCurrencyFormatter(userCurrency);
			return formatter.format(validPrice);
		},
		[userCurrency]
	);
};
