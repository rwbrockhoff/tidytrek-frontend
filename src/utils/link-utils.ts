// Normalize URLs before sending to API
export const normalizeURL = (link: string): string => {
	if (!link) return '';

	const trimmed = link.trim();

	if (trimmed.startsWith('https://')) return trimmed;

	// Handle http
	if (trimmed.startsWith('http://')) {
		return trimmed.replace('http://', 'https://');
	}

	// Fallback - add https
	return `https://${trimmed}`;
};

// Shorten URL for profile badges
export const shortenURL = (link: string, socialName: string): string => {
	if (!link) return '';

	// Remove https://
	const withoutHttps = link.replace(/^https?:\/\//i, '');

	// For custom links, show the whole link
	if (socialName === 'custom') return withoutHttps;

	// For social media links, show only the username/handle
	const pathStartIndex = withoutHttps.indexOf('/');

	if (pathStartIndex === -1) return withoutHttps;

	return withoutHttps.slice(pathStartIndex);
};
