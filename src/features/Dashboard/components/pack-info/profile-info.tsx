import { Flex, Heading } from '@radix-ui/themes';
import {
	type ProfileInfo as ProfileInfoType,
	type SocialLink,
} from '@/types/profile-types';
import { Avatar, Link } from '@/components/ui';
import { SocialLinkList } from '@/components';
import { encode } from '@/utils';

type ProfileInfoProps = {
	userInfo: ProfileInfoType | undefined;
	socialLinks: SocialLink[] | undefined;
	publicProfile: boolean | undefined;
};

export const ProfileInfo = (props: ProfileInfoProps) => {
	const { userInfo, socialLinks, publicProfile } = props;
	const { username, firstName, userId, profilePhotoUrl } = userInfo || {};

	const userBasedUrl = username || (userId && encode(userId));
	return (
		<Flex mb="4">
			<Link link={`/user/${userBasedUrl}`} enabled={publicProfile}>
				<Avatar src={profilePhotoUrl} size="medium" />
			</Link>
			<Flex direction="column" justify="center" ml="4">
				<Heading as="h4" size="4" mb="2">
					<Link link={`/user/${userBasedUrl}`} enabled={publicProfile}>
						{username || firstName || 'Tidy Hiker'}
					</Link>
				</Heading>
				<SocialLinkList
					socialLinks={socialLinks || []}
					deleteEnabled={false}
					colorButton={false}
				/>
			</Flex>
		</Flex>
	);
};
