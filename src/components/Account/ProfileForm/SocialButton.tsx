import { Label, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { SocialLinkInfo } from '../../../types/profileSettingsTypes';
import { CustomLink } from '../../../shared/ui/CustomLinks';

type SocialButtonProps = {
	socialName: string;
	socialLinkId?: number;
	socialLinkUrl?: string;
	color: string;
	icon: React.ReactNode;
	linkEnabled?: boolean;
	deleteEnabled?: boolean;
	onClick?: (socialName: string | undefined) => void;
	onDelete?: (socialLinkId: number | undefined) => void;
};

export const SocialButton = (props: SocialButtonProps) => {
	const {
		socialName,
		socialLinkId,
		color,
		icon,
		socialLinkUrl,
		linkEnabled,
		deleteEnabled,
		onClick,
		onDelete,
	} = props;

	const handleClick = () => onClick && onClick(socialName);
	const handleDelete = () => onDelete && onDelete(socialLinkId);

	const displayLink = socialLinkUrl ? shortenLink(socialLinkUrl) : socialName;

	return (
		<StyledLabel $backgroundColor={color} onClick={handleClick}>
			<CustomLink link={socialLinkUrl} enabled={linkEnabled} externalLink>
				{icon}
				{displayLink || 'Link'}
			</CustomLink>
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

const shortenLink = (link: string) => {
	let slashIndex = link.lastIndexOf('/');
	return link.split('').splice(slashIndex).join('');
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
		a {
			opacity: 1;
		}
		a:hover {
			opacity: 0.8;
		}
	}
`;
