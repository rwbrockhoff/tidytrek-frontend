import { type SocialObject } from '@/types/profile-types';
import { LinkIcon } from '@/components/ui';
import { FaPaypal as PaypalIcon } from 'react-icons/fa';
import { FaXTwitter as TwitterIcon } from 'react-icons/fa6';
import { FaFacebookF as FacebookIcon } from 'react-icons/fa';
import { GrInstagram as InstagramIcon } from 'react-icons/gr';
import { FaTiktok as TiktokIcon } from 'react-icons/fa6';
import { FaYoutube as YoutubeIcon } from 'react-icons/fa6';
import { FaReddit as RedditIcon } from 'react-icons/fa';
import { BiLogoVenmo as VenmoIcon } from 'react-icons/bi';
import { FaPatreon as PatreonIcon } from 'react-icons/fa';

const socialMediaUI: SocialObject = {
	custom: {
		socialName: 'custom',
		color: 'grey',
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
