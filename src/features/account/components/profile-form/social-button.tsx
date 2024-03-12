import { type SocialLinkInfo } from '@/types/profile-types';
import { Label, Icon, Button } from 'semantic-ui-react';
import styled, { css } from 'styled-components';
import { Link } from '@/components/ui';

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
		<StyledLabel
			$backgroundColor={color}
			$colorButton={colorButton}
			onClick={handleClick}>
			<Link link={socialLinkUrl} enabled externalLink>
				{icon}
				{displayLink || 'Link'}
			</Link>
			{deleteEnabled && (
				<Icon name="delete" style={{ marginLeft: 10 }} onClick={handleDelete} />
			)}
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
		${({ theme: t }) => t.mx.wh('30px')}
		${({ theme: t }) => t.mx.flexCenter()}
		border-radius: 15px;
		background-color: ${(props) =>
			props.$backgroundColor ? props.$backgroundColor : 'grey'};
		i {
			color: white;
		}
	}
`;

const shortenLink = (link: string) => {
	let slashIndex = link.lastIndexOf('/');
	return link.split('').splice(slashIndex).join('');
};

const StyledLabel = styled(Label)`
	&&& {
		cursor: pointer;
		a {
			opacity: 1;
			&:hover {
				opacity: 0.8;
			}
		}
		${(props) =>
			props.$colorButton &&
			css`
				color: white;
				background-color: ${props.$backgroundColor ? props.$backgroundColor : 'blue'};
				i {
					color: white;
					margin-right: 5px;
				}
			`};
	}
`;
