import { Heading } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import {
	type ProfileInfo as ProfileInfoType,
	type SocialLink,
} from '@/types/profile-types';
import { Link } from '@/components/ui';
import { Avatar } from '@/components/media';
import { SocialLinkList } from '@/components';
import styles from './profile-info.module.css';

type ProfileInfoProps = {
	userInfo: ProfileInfoType | undefined;
	socialLinks: SocialLink[] | undefined;
	publicProfile: boolean | undefined;
};

export const ProfileInfo = (props: ProfileInfoProps) => {
	const { userInfo, socialLinks, publicProfile } = props;
	const { username, trailName, firstName, profilePhotoUrl } = userInfo || {};

	return (
		<Flex className="items-center mb-8 md:mb-4">
			<Link to={`/u/${username}`} enabled={publicProfile}>
				<Avatar src={profilePhotoUrl} size="sm" />
			</Link>

			<Stack className="justify-center gap-2 ml-4">
				<Heading as="h4" size="4" className={styles.usernameHeader}>
					<Link to={`/u/${username}`} enabled={publicProfile}>
						{username || firstName || 'Tidy Hiker'}
						{trailName && <span className={styles.trailName}>{trailName}</span>}
					</Link>
				</Heading>
				<SocialLinkList
					socialLinks={socialLinks || []}
					deleteEnabled={false}
					colorButton={false}
				/>
			</Stack>
		</Flex>
	);
};
