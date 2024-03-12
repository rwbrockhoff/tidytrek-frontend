import { Icon } from 'semantic-ui-react';
import { type SocialObject } from '../../types/profile-types';

const socialMediaUI: SocialObject = {
	custom: {
		socialName: 'custom',
		color: 'grey',
		icon: <Icon name="linkify" />,
	},
	facebook: { socialName: 'facebook', color: '#3b5998', icon: <Icon name="facebook" /> },
	instagram: {
		socialName: 'instagram',
		color: '#d62976',
		icon: <Icon name="instagram" />,
	},
	twitter: {
		socialName: 'twitter',
		color: '#000000',
		icon: <i className="fa-brands fa-x-twitter" />,
	},
	tiktok: {
		socialName: 'tiktok',
		color: '#000000',
		icon: <i className="fa-brands fa-tiktok" />,
	},
	youtube: { socialName: 'youtube', color: '#ff0000', icon: <Icon name="youtube" /> },
	reddit: { socialName: 'reddit', color: '#ff4500', icon: <Icon name="reddit" /> },
	venmo: {
		socialName: 'venmo',
		color: '#008cff',
		icon: <Icon name="vimeo v" />,
	},
	paypal: { socialName: 'paypal', color: '#001c64', icon: <Icon name="paypal" /> },
	patreon: { socialName: 'patreon', color: '#000000', icon: <Icon name="patreon" /> },
};

export default socialMediaUI;
