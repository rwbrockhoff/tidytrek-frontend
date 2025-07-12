const PLATFORM_DOMAINS = [
	{ name: 'instagram', domains: ['instagram.com'] },
	{ name: 'facebook', domains: ['facebook.com', 'fb.com', 'fb.me', 'm.facebook.com'] },
	{ name: 'twitter', domains: ['twitter.com', 'x.com', 'mobile.twitter.com'] },
	{ name: 'linkedin', domains: ['linkedin.com', 'lnkd.in'] },
	{ name: 'tiktok', domains: ['tiktok.com', 'vm.tiktok.com'] },
	{ name: 'youtube', domains: ['youtube.com', 'youtu.be', 'm.youtube.com'] },
	{ name: 'reddit', domains: ['reddit.com', 'redd.it', 'm.reddit.com'] },
	{ name: 'venmo', domains: ['venmo.com', 'account.venmo.com'] },
	{ name: 'paypal', domains: ['paypal.com', 'paypal.me', 'www.paypal.com'] },
	{ name: 'patreon', domains: ['patreon.com', 'www.patreon.com'] },
] as const;

export const detectPlatform = (url: string): string => {
	if (!url) return 'custom';

	// URLs from DB are normalized with https:// already
	const domain = new URL(url).hostname.toLowerCase().replace(/^www\./, '');

	for (const platform of PLATFORM_DOMAINS) {
		if (platform.domains.some((platformDomain) => platformDomain === domain)) {
			return platform.name;
		}
	}

	return 'custom';
};
