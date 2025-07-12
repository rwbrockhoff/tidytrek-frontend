import styles from './profile-header.module.css';
import { type UserProfile } from '@/types/profile-types';
import { LocationIcon } from '@/components/icons';
import { Avatar } from '@/components/media';
import { SocialLinkList } from '@/components';
import { useProfileActions } from '@/features/account/hooks/use-profile-actions';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { BannerPhoto } from '../banner-photo/banner-photo';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';

type ProfileHeaderProps = {
	userProfile: UserProfile | null;
	notFound?: boolean;
	isPrivate?: boolean;
	hasError?: boolean;
};

export const ProfileHeader = (props: ProfileHeaderProps) => {
	const userView = useUserContext();
	const { userProfile, notFound, isPrivate, hasError } = props;

	// Show message for error within default UI
	const getStatusMessage = () => {
		if (notFound)
			return {
				title: 'User not found',
				subtitle: "This user doesn't exist or the link is incorrect.",
			};
		if (isPrivate)
			return {
				title: 'Private Profile',
				subtitle: 'This user has set their profile to private.',
			};
		if (hasError)
			return { title: 'Something went wrong', subtitle: 'Please try again later.' };
		return null;
	};

	const statusMessage = getStatusMessage();

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
			uploadProfilePhoto: {
				mutate: uploadProfilePhoto,
				isPending: isPendingProfilePhoto,
			},
			uploadBannerPhoto: { mutate: uploadBannerPhoto, isPending: isPendingBannerPhoto },
		},
	} = useProfileActions();

	const hasSocialLinks = socialLinks?.length ? true : false;

	return (
		<Box position="relative">
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
				<div className={styles.profileTextContainer}>
					<Heading as="h3" className={styles.usernameHeader}>
						{username || firstName}
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

					{statusMessage ? (
						<Box mt="3" style={{ textAlign: 'center' }}>
							<Heading size="4" mb="1">
								{statusMessage.title}
							</Heading>
							<Text color="gray">{statusMessage.subtitle}</Text>
						</Box>
					) : (
						<Text mt="4">{userBio}</Text>
					)}
				</div>
			</div>
		</Box>
	);
};
