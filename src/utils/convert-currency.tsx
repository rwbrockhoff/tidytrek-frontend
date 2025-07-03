// Cache currency formatter in object to avoid recreating them
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

export const convertCurrency = (price: number, currency: string = 'USD') => {
	const isInvalid = isNaN(price);
	if (isInvalid) return price;

	const formatter = getCurrencyFormatter(currency);
	return formatter.format(price);
};
