import { Label, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { SocialLinkInfo, SocialObject } from '../../../types/profileSettingsTypes';

type SocialButtonProps = {
	socialName: string;
	color: string;
	icon: React.ReactNode;
	displayUrl?: string;
	onClick: (socialName: string | undefined) => void;
};

export const SocialButton = (props: SocialButtonProps) => {
	const { socialName, color, icon, displayUrl, onClick } = props;

	return (
		<StyledLabel $backgroundColor={color} onClick={() => onClick(socialName)}>
			{icon}
			{displayUrl || socialName || 'Link'}
		</StyledLabel>
	);
};

export const SocialButtonPicker = ({
	currentSocial,
}: {
	currentSocial: SocialLinkInfo;
}) => {
	const { icon, color } = currentSocial;

	return <CircleButton $backgroundColor={color} icon={icon} />;
};

const CircleButton = styled(Button)<{ $backgroundColor: string }>`
	&&&& {
		width: 30px;
		height: 30px;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: ${(props) =>
			props.$backgroundColor ? props.$backgroundColor : 'grey'};
		i {
			color: white;
		}
	}
`;

export const socialObject: SocialObject = {
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

const StyledLabel = styled(Label)`
	&&& {
		cursor: pointer;
		color: white;
		background-color: ${(props) =>
			props.$backgroundColor ? props.$backgroundColor : 'blue'};
		i {
			color: white;
			margin-right: 5px;
		}
	}
`;
