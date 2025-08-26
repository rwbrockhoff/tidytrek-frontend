// Normalize URLs before sending to API
export const normalizeURL = (link: string): string => {
	if (!link) return '';

	const trimmed = link.trim();
	if (!trimmed) return '';

	// Only allow http/https
	if (trimmed.includes('://') && !trimmed.startsWith('http')) {
		return '';
	}

	if (trimmed.startsWith('https://')) return trimmed;

	if (trimmed.startsWith('http://')) {
		return trimmed.replace('http://', 'https://');
	}

	try {
		new URL(`https://${trimmed}`);
		return `https://${trimmed}`;
	} catch {
		return '';
	}
};

// Shorten URL for profile badges
export const shortenURL = (link: string, socialName: string): string => {
	if (!link) return '';

	// Remove https://
	let cleaned = link.replace(/^https?:\/\//i, '');

	// Remove www. prefix
	cleaned = cleaned.replace(/^www\./i, '');

	// For custom links, show the whole link
	if (socialName === 'custom') return cleaned;

	// For social media links, show only the username/handle
	const pathStartIndex = cleaned.indexOf('/');

	if (pathStartIndex === -1) return cleaned;

	return cleaned.slice(pathStartIndex);
};
