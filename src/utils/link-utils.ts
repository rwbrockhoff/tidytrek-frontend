export const normalizeURL = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};

// Shorten social link for display in profile badges
export const shortenURL = (link: string, socialName: string) => {
	const baseLink = link.replace(/^https?\:\/\//i, '');
	// handle custom links
	if (socialName === 'custom') return baseLink;
	// handle social media links
	const initialIndex = baseLink.indexOf('/');
	const index = initialIndex >= 0 ? initialIndex : 0;

	return baseLink.slice(index);
};
