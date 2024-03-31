import { Flex } from '@radix-ui/themes';
import { SocialButton } from '../features/account/components/profile-form/social-button';
import { SocialLink } from '../types/profile-types';
import socialMediaUI from '../styles/theme/social-media-ui';
import styled from 'styled-components';

type SocialLinkListProps = {
	socialLinks: SocialLink[];
	deleteEnabled?: boolean;
	colorButton?: boolean;
};

export const SocialLinkList = (props: SocialLinkListProps) => {
	const { socialLinks, deleteEnabled = false } = props;

	return (
		<StyledFlex>
			{socialLinks.map((link, index) => {
				const { socialName, icon } = socialMediaUI[link.socialLinkName];
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
		</StyledFlex>
	);
};

const StyledFlex = styled(Flex)`
	span.rt-Badge:first-of-type {
		margin-left: 0;
	}
`;
