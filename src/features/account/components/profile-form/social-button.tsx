import { type SocialLinkInfo } from '@/types/profile-types';
import styles from './social-button.module.css';
import { cn, mx } from '@/styles/utils';
import { Badge, IconButton, Flex } from '@radix-ui/themes';
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
		<Flex
			asChild
			align="center"
			m="2"
			className={cn(styles.styledBadge, mx.pointer)}
			onClick={handleClick}>
			<Badge radius="large" variant="soft">
				<Link link={socialLinkUrl} enabled externalLink>
					{icon}
					{displayLink || 'Link'}
				</Link>
				{deleteEnabled && <CloseIcon onClick={handleDelete} size={15} />}
			</Badge>
		</Flex>
	);
};

export const SocialButtonPicker = (props: { currentSocial: SocialLinkInfo }) => {
	const { icon, color } = props.currentSocial;

	return (
		<IconButton
			radius="full"
			className={cn(mx.pointer, mx.whiteText)}
			style={{
				backgroundColor: color || 'var(--gray-500)',
			}}>
			{icon}
		</IconButton>
	);
};

const shortenLink = (link: string, socialName: string) => {
	const baseLink = link.replace(/^https?\:\/\//i, '');
	// handle custom links
	if (socialName === 'custom') return baseLink;
	// handle social media links
	const initialIndex = baseLink.indexOf('/');
	const index = initialIndex >= 0 ? initialIndex : 0;

	return baseLink.slice(index);
};
