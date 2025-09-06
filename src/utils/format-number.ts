export const formatNumber = (num: number | string | null | undefined): string => {
	const validNum = Number(num);

	// Handle invalid inputs
	if (isNaN(validNum) || validNum < 0) {
		return '0';
	}

	if (validNum < 1000) {
		return validNum.toString();
	}

	if (validNum < 1000000) {
		const thousands = validNum / 1000;
		if (thousands % 1 === 0) {
			return `${thousands}k`;
		}
		return `${thousands.toFixed(1)}k`;
	}

	const millions = validNum / 1000000;
	if (millions % 1 === 0) {
		return `${millions}M`;
	}
	return `${millions.toFixed(1)}M`;
};
