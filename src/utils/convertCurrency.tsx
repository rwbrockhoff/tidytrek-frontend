export const convertCurrency = (price: number, currency: string = 'USD') => {
	const currencyConverter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	});

	return currencyConverter.format(price);
};
