import styles from './profile-header.module.css';
import { mx } from '@/styles/utils';
import { type UserProfile } from '@/types/profile-types';
import { LocationIcon } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { SocialLinkList } from '@/components';
import { useProfileActions } from '../../account/hooks/use-profile-actions';
import { useUserContext } from '@/hooks/use-viewer-context';
import { BannerPhoto } from './banner-photo';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { cn } from '@/styles/utils/cn';

type ProfileHeaderProps = {
	userProfile: UserProfile | null;
};

export const ProfileHeader = (props: ProfileHeaderProps) => {
	const userView = useUserContext();
	const { userProfile } = props;

	const { socialLinks, profileInfo } = userProfile || {};

	const {
		profilePhotoUrl,
		bannerPhotoUrl,
		userLocation,
		userBio,
		username,
		trailName,
		firstName,
	} = profileInfo || {};

	const {
		mutations: {
			uploadProfilePhoto: { mutate: uploadProfilePhoto, isPending: isPendingProfilePhoto },
			uploadBannerPhoto: { mutate: uploadBannerPhoto, isPending: isPendingBannerPhoto },
		},
	} = useProfileActions();

	const hasSocialLinks = socialLinks?.length ? true : false;

	return (
		<Box position="relative" mt={userView ? '9' : '4'}>
			<BannerPhoto
				bannerPhotoUrl={bannerPhotoUrl}
				uploadEnabled={userView}
				isPending={isPendingBannerPhoto}
				onUpload={uploadBannerPhoto}
			/>

			<div className={styles.avatarContainer}>
				<Avatar
					withBorder
					uploadEnabled={userView}
					src={profilePhotoUrl}
					size="large"
					isPending={isPendingProfilePhoto}
					onUpload={uploadProfilePhoto}
				/>
			</div>
			<div className={styles.profileInfoContainer}>
				<div className={cn(styles.profileTextContainer, mx.responsiveContent)}>
					<Heading as="h3" className={styles.usernameHeader}>
						{username || firstName || 'Tidy Hiker'}
						{trailName && <span className={styles.trailName}>{trailName}</span>}
					</Heading>

					<Flex align="center" wrap="wrap">
						{userLocation && (
							<Text mr="4" className={styles.locationText}>
								<LocationIcon /> {userLocation}
							</Text>
						)}

						{hasSocialLinks && (
							<SocialLinkList
								socialLinks={socialLinks || []}
								deleteEnabled={false}
								colorButton={true}
							/>
						)}
					</Flex>

					<Text mt="0">{userBio}</Text>
				</div>
			</div>
		</Box>
	);
};
