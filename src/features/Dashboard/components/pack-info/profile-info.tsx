import { Flex, Heading } from '@radix-ui/themes';
import {
	type ProfileInfo as ProfileInfoType,
	type SocialLink,
} from '@/types/profile-types';
import { Avatar, Link } from '@/components/ui';
import { SocialLinkList } from '@/components';
import styled from 'styled-components';

type ProfileInfoProps = {
	userInfo: ProfileInfoType | undefined;
	socialLinks: SocialLink[] | undefined;
	publicProfile: boolean | undefined;
};

export const ProfileInfo = (props: ProfileInfoProps) => {
	const { userInfo, socialLinks, publicProfile } = props;
	const { username, trailName, firstName, profilePhotoUrl } = userInfo || {};

	return (
		<Flex mb="4" align="center">
			<Link link={`/user/${username}`} enabled={publicProfile}>
				<Avatar src={profilePhotoUrl} size="medium" />
			</Link>
			<Flex direction="column" justify="center" ml="4">
				<UsernameHeader as="h4" size="4">
					<Link link={`/user/${username}`} enabled={publicProfile}>
						{username || firstName || 'Tidy Hiker'}
						{trailName && <span className="trailName">{trailName}</span>}
					</Link>
				</UsernameHeader>
				<SocialLinkList
					socialLinks={socialLinks || []}
					deleteEnabled={false}
					colorButton={false}
				/>
			</Flex>
		</Flex>
	);
};

const UsernameHeader = styled(Heading)`
	margin: 0;
	span.trailName {
		color: var(--gray-10);
		margin-left: 0.5em;
	}
`;
