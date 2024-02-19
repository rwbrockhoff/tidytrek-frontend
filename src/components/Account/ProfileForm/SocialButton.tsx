import { Label, Icon, Button, SemanticICONS } from 'semantic-ui-react';
import styled from 'styled-components';
import { SocialLink, SocialObject } from '../../../types/profileSettingsTypes';

type SocialButtonProps = {
	social: SocialLink;
	onClick: (socialName: string | undefined) => void;
};

export const SocialButton = ({ social, onClick }: SocialButtonProps) => {
	const { socialName, color, icon } = social;

	return (
		<StyledLabel $backgroundColor={color} onClick={() => onClick(socialName)}>
			{icon ? icon : <Icon name={socialName} />}
			{socialName}
		</StyledLabel>
	);
};

export const SocialButtonPicker = ({ currentSocial }: { currentSocial: SocialLink }) => {
	const { socialName, color } = currentSocial;

	return (
		<CircleButton
			$backgroundColor={color}
			icon={currentSocial?.icon ? currentSocial?.icon : <Icon name={socialName} />}
		/>
	);
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
		socialName: 'custom' as SemanticICONS,
		color: 'grey',
		icon: <Icon name="linkify" />,
	},
	facebook: { socialName: 'facebook', color: '#3b5998' },
	instagram: { socialName: 'instagram', color: '#d62976' },
	twitter: {
		socialName: 'twitter',
		color: '#000000',
		icon: <i className="fa-brands fa-x-twitter" />,
	},
	tiktok: {
		socialName: 'tiktok' as SemanticICONS,
		color: '#000000',
		icon: <i className="fa-brands fa-tiktok" />,
	},
	youtube: { socialName: 'youtube', color: '#ff0000' },
	reddit: { socialName: 'reddit', color: '#ff4500' },
	venmo: {
		socialName: 'venmo' as SemanticICONS,
		color: '#008cff',
		icon: <Icon name="vimeo v" />,
	},
	paypal: { socialName: 'paypal', color: '#001c64' },
	patreon: { socialName: 'patreon', color: '#000000' },
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
