const useCurrency = (price: number, currency: string) => {
	const currencyConverter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	});

	return currencyConverter.format(price);
};

export default useCurrency;
