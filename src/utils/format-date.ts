export const formatDate = (date: string | Date) => {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	return dateObj.toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: '2-digit',
	});
};
