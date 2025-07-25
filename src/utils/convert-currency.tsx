import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useMemo } from 'react';

const formatters: Record<string, Intl.NumberFormat> = {};

const getCurrencyFormatter = (currency: string): Intl.NumberFormat => {
	if (!formatters[currency]) {
		formatters[currency] = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
		});
	}
	return formatters[currency];
};

export const useConvertCurrency = () => {
	const { settings } = useGetAuth();
	const userCurrency = settings?.currencyUnit || 'USD';

	return useMemo(
		() => (price: number) => {
			const isInvalid = isNaN(price);
			if (isInvalid) return price;

			const formatter = getCurrencyFormatter(userCurrency);
			return formatter.format(price);
		},
		[userCurrency]
	);
};
