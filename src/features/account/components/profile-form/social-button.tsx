import { type SocialLinkInfo } from '@/types/profile-types';
import styled from 'styled-components';
import { Badge, IconButton } from '@radix-ui/themes';
import { Link, CloseIcon } from '@/components/ui';
import { useHandlers } from '../../hooks/use-profile-handlers';

type SocialButtonProps = {
	socialName: string;
	socialLinkId?: number;
	socialLinkUrl?: string;
	icon: React.ReactNode;
	deleteEnabled?: boolean;
	onClick?: (socialName: string | undefined) => void;
};

export const SocialButton = (props: SocialButtonProps) => {
	const {
		socialName,
		socialLinkId,
		icon,
		socialLinkUrl,
		deleteEnabled = false,
		onClick,
	} = props;

	const { deleteSocialLink } = useHandlers().handlers || {};

	const handleClick = () => onClick && onClick(socialName);

	const handleDelete = () => {
		if (deleteEnabled) deleteSocialLink(socialLinkId);
	};

	const displayLink = socialLinkUrl ? shortenLink(socialLinkUrl, socialName) : socialName;

	return (
		<StyledBadge m="2" radius="large" variant="soft" onClick={handleClick}>
			<Link link={socialLinkUrl} enabled externalLink>
				{icon}
				{displayLink || 'Link'}
			</Link>
			{deleteEnabled && <CloseIcon onClick={handleDelete} size={15} />}
		</StyledBadge>
	);
};

export const SocialButtonPicker = (props: { currentSocial: SocialLinkInfo }) => {
	const { icon, color } = props.currentSocial;

	return (
		<CircleButton $backgroundColor={color} radius="full">
			{icon}
		</CircleButton>
	);
};

const CircleButton = styled(IconButton)<{ $backgroundColor: string }>`
	background-color: ${(props) =>
		props.$backgroundColor ? props.$backgroundColor : 'grey'};
	cursor: pointer;
	&:hover {
		filter: var(--hover-dark-1);
	}
	svg {
		color: white;
	}
`;

const shortenLink = (link: string, socialName: string) => {
	// handle custom links
	if (socialName === 'custom') return link.replace(/^https?\:\/\//i, '');
	// handle social media links
	let slashIndex = link.lastIndexOf('/');
	return link.split('').splice(slashIndex).join('');
};

const StyledBadge = styled(Badge)`
	cursor: pointer;
	padding: 0.75em;
	display: flex;
	align-items: center;
	&:hover {
		filter: var(--hover-dark-1);
	}
	a,
	a:hover {
		color: black;
	}
	background-color: var(--gray-5);
	color: var(--jade-9);
`;
