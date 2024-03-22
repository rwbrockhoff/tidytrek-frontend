import { type SocialLinkInfo } from '@/types/profile-types';
import styled, { css } from 'styled-components';
import { Badge, IconButton } from '@radix-ui/themes';
import { Link, CloseIcon } from '@/components/ui';

type SocialButtonProps = {
	socialName: string;
	socialLinkId?: number;
	socialLinkUrl?: string;
	colorButton?: boolean;
	color: string;
	icon: React.ReactNode;
	deleteEnabled?: boolean;
	onClick?: (socialName: string | undefined) => void;
	onDelete?: (socialLinkId: number | undefined) => void | undefined;
};

export const SocialButton = (props: SocialButtonProps) => {
	const {
		socialName,
		socialLinkId,
		colorButton = true,
		color,
		icon,
		socialLinkUrl,
		deleteEnabled = false,
		onClick,
		onDelete,
	} = props;

	const handleClick = () => onClick && onClick(socialName);

	const handleDelete = () => {
		if (deleteEnabled && onDelete) onDelete(socialLinkId);
	};

	const displayLink = socialLinkUrl ? shortenLink(socialLinkUrl) : socialName;

	return (
		<StyledBadge
			$backgroundColor={color}
			$colorButton={colorButton}
			m="2"
			radius="large"
			onClick={handleClick}>
			<Link link={socialLinkUrl} enabled externalLink>
				{icon}
				{displayLink || 'Link'}
			</Link>
			{deleteEnabled && <CloseIcon onClick={handleDelete} size={15} />}
		</StyledBadge>
	);
};

export const SocialButtonPicker = ({
	currentSocial,
}: {
	currentSocial: SocialLinkInfo;
}) => {
	const { icon, color } = currentSocial;

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
		filter: brightness(95%);
	}
	svg {
		color: white;
	}
`;

const shortenLink = (link: string) => {
	let slashIndex = link.lastIndexOf('/');
	return link.split('').splice(slashIndex).join('');
};

const StyledBadge = styled(Badge)<{ $colorButton: boolean; $backgroundColor: string }>`
	cursor: pointer;
	padding: 0.75em;
	display: flex;
	align-items: center;
	&:hover {
		filter: brightness(95%);
	}
	a,
	a:hover {
		opacity: 1;
		color: black;
	}
	background-color: var(--gray-5);
	${(props) =>
		props.$colorButton &&
		css`
			background-color: ${props.$backgroundColor ? props.$backgroundColor : '#000'};
			color: white;
			a,
			a:hover {
				color: white;
			}
		`};
`;
