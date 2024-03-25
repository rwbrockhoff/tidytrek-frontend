export const convertCurrency = (price: number, currency: string = 'USD') => {
	const currencyConverter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	});
	const isInvalid = isNaN(price);
	if (isInvalid) return price;
	else return currencyConverter.format(price);
};
