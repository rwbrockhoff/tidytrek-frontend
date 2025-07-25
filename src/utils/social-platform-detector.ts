/**
 * Social media platform detection from URL
 */
export const detectPlatformFromUrl = (url: string): string => {
	if (!url) return 'custom';

	// Normalize URL and add protocol if missing
	let normalizedUrl = url.toLowerCase();
	if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
		normalizedUrl = 'https://' + normalizedUrl;
	}

	// Platform detection - order matters (more specific first)
	const platforms = [
		{ name: 'instagram', keywords: ['instagram'] },
		{ name: 'facebook', keywords: ['facebook', 'fb.com'] },
		{ name: 'twitter', keywords: ['twitter', 'x.com'] },
		{ name: 'linkedin', keywords: ['linkedin'] },
		{ name: 'tiktok', keywords: ['tiktok'] },
		{ name: 'youtube', keywords: ['youtube', 'youtu.be'] },
		{ name: 'reddit', keywords: ['reddit'] },
		{ name: 'venmo', keywords: ['venmo'] },
		{ name: 'paypal', keywords: ['paypal'] },
		{ name: 'patreon', keywords: ['patreon'] },
	];

	for (const platform of platforms) {
		if (platform.keywords.some((keyword) => normalizedUrl.includes(keyword))) {
			return platform.name;
		}
	}

	return 'custom';
};
