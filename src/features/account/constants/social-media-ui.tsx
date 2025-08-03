import { type SocialObject } from '@/types/profile-types';
import { LinkIcon } from '@/components/icons';
import {
	FacebookIcon,
	TwitterIcon,
	InstagramIcon,
	TiktokIcon,
	YoutubeIcon,
	RedditIcon,
	VenmoIcon,
	PaypalIcon,
	PatreonIcon,
} from '@/components/icons/social-icons';

const socialMediaUI: SocialObject = {
	custom: {
		socialName: 'custom',
		color: 'var(--gray-800)',
		icon: <LinkIcon />,
	},
	facebook: { socialName: 'facebook', color: '#3b5998', icon: <FacebookIcon /> },
	instagram: {
		socialName: 'instagram',
		color: '#d62976',
		icon: <InstagramIcon />,
	},
	twitter: {
		socialName: 'twitter',
		color: '#000000',
		icon: <TwitterIcon />,
	},
	tiktok: {
		socialName: 'tiktok',
		color: '#000000',
		icon: <TiktokIcon />,
	},
	youtube: { socialName: 'youtube', color: '#ff0000', icon: <YoutubeIcon /> },
	reddit: { socialName: 'reddit', color: '#ff4500', icon: <RedditIcon /> },
	venmo: {
		socialName: 'venmo',
		color: '#008cff',
		icon: <VenmoIcon />,
	},
	paypal: { socialName: 'paypal', color: '#001c64', icon: <PaypalIcon /> },
	patreon: { socialName: 'patreon', color: '#000000', icon: <PatreonIcon /> },
};

export default socialMediaUI;
