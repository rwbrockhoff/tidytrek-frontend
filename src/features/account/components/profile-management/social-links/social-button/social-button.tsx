import styles from './social-button.module.css';
import { Badge } from '@radix-ui/themes';
import { useMemo } from 'react';
import { cn } from '@/styles/utils';
import { ExternalLink } from '@/components/ui';
import { CloseIcon } from '@/components/icons';
import { useDeleteSocialLinkMutation } from '@/queries/profile-settings-queries';
import { shortenURL } from '@/utils';

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

	const { mutate: deleteSocialLink, isPending } = useDeleteSocialLinkMutation();

	const handleClick = () => onClick && onClick(socialName);

	const handleDelete = () => {
		if (deleteEnabled && socialLinkId && !isPending) {
			deleteSocialLink(socialLinkId);
		}
	};

	const displayLink = useMemo(() => {
		return socialLinkUrl ? shortenURL(socialLinkUrl, socialName) : socialName;
	}, [socialLinkUrl, socialName]);

	return (
		<Badge 
			radius="large" 
			className={cn(styles.styledBadge, 'flex items-center py-1 px-2')} 
			onClick={handleClick}
		>
			<ExternalLink href={socialLinkUrl || ''}>
				{icon}
				{displayLink || 'Link'}
			</ExternalLink>
			{deleteEnabled && <CloseIcon onClick={handleDelete} size={15} />}
		</Badge>
	);
};
