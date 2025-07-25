import { Flex } from '@radix-ui/themes';
import { SocialButton } from '../features/account/components/profile-form/social-button';
import { SocialLink } from '../types/profile-types';
import socialMediaUI from '@/features/account/constants/social-media-ui';
import styles from './social-link-list.module.css';

type SocialLinkListProps = {
	socialLinks: SocialLink[];
	deleteEnabled?: boolean;
	colorButton?: boolean;
};

export const SocialLinkList = (props: SocialLinkListProps) => {
	const { socialLinks, deleteEnabled = false } = props;

	return (
		<Flex className={styles.socialLinks}>
			{socialLinks.map((link, index) => {
				const socialInfo = socialMediaUI[link.platformName] || socialMediaUI.custom;
				const { socialName, icon } = socialInfo;
				const { socialLinkId: id } = link;
				return (
					<SocialButton
						key={index}
						socialLinkId={id}
						socialName={socialName}
						icon={icon}
						socialLinkUrl={link.socialLinkUrl}
						deleteEnabled={deleteEnabled}
					/>
				);
			})}
		</Flex>
	);
};

