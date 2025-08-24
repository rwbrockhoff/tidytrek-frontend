import { Flex } from '@/components/layout';
import { useMemo } from 'react';
import { SocialButton } from '@/features/account/components/profile-management/social-links';
import { SocialLink } from '@/types/profile-types';
import socialMediaUI from '@/features/account/constants/social-media-ui';
import { detectPlatform } from './detect-platform';

type SocialLinkListProps = {
	socialLinks: SocialLink[];
	deleteEnabled?: boolean;
	colorButton?: boolean;
};

export const SocialLinkList = (props: SocialLinkListProps) => {
	const { socialLinks, deleteEnabled = false } = props;

	const socialButtonsData = useMemo(() => {
		return socialLinks.map(({ socialLinkUrl, socialLinkId }) => {
			const platform = detectPlatform(socialLinkUrl);
			const { socialName, icon } = socialMediaUI[platform] || socialMediaUI.custom;

			return {
				socialLinkId,
				socialName,
				icon,
				socialLinkUrl,
			};
		});
	}, [socialLinks]);

	return (
		<Flex className="flex-wrap gap-2">
			{socialButtonsData.map(({ socialLinkId, socialName, icon, socialLinkUrl }) => (
				<SocialButton
					key={socialLinkId}
					socialLinkId={socialLinkId}
					socialName={socialName}
					icon={icon}
					socialLinkUrl={socialLinkUrl}
					deleteEnabled={deleteEnabled}
				/>
			))}
		</Flex>
	);
};
