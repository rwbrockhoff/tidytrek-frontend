import styles from './profile-header.module.css';
import { Heading, Text } from '@radix-ui/themes';
import { Flex, Box } from '@/components/layout';
import { cn, mx } from '@/styles/utils';
import { Stack } from '@/components/layout';
import { type UserProfile } from '@/types/profile-types';
import { LocationIcon } from '@/components/icons';
import { Avatar } from '@/components/media';
import { SocialLinkList } from '@/components';
import {
	useUploadProfilePhotoMutation,
	useUploadBannerPhotoMutation,
} from '@/queries/profile-settings-queries';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { BannerPhoto } from '../banner-photo/banner-photo';
import { ProfileOptionsMenu } from '../profile-options-menu';
import { FollowButton } from '../follow-button/follow-button';
import { FollowStats } from '../follow-stats/follow-stats';

type ProfileHeaderProps = {
	userProfile: UserProfile | null;
	userId?: string;
	notFound?: boolean;
	isPrivate?: boolean;
	hasError?: boolean;
	isFollowing?: boolean;
};

export const ProfileHeader = (props: ProfileHeaderProps) => {
	const { isCreator, isAuthenticated } = usePermissions();
	const { userProfile, userId, notFound, isPrivate, hasError, isFollowing } = props;

	// Error message to display in Profile Header UI
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

	const { mutate: uploadProfilePhoto, isPending: isPendingProfilePhoto } =
		useUploadProfilePhotoMutation();

	const { mutate: uploadBannerPhoto, isPending: isPendingBannerPhoto } =
		useUploadBannerPhotoMutation();

	const hasSocialLinks = socialLinks?.length ? true : false;

	return (
		<Box className="relative">
			<BannerPhoto
				bannerPhotoUrl={bannerPhotoUrl}
				uploadEnabled={isCreator}
				isPending={isPendingBannerPhoto}
				onUpload={uploadBannerPhoto}
			/>

			<div className={cn(styles.profileInfoContainer, 'px-8 py-6')}>
				{isCreator && (
					<div className={cn(styles.optionsMenu)}>
						<ProfileOptionsMenu username={username} />
					</div>
				)}

				<Flex className="gap-8 flex-col md:flex-row">
					{/* Left Panel - Avatar & Follow Button (Desktop only) */}
					<div className={styles.leftPanel}>
						<div className={styles.avatarContainer}>
							<Avatar
								withBorder
								uploadEnabled={isCreator}
								src={profilePhotoUrl}
								size="lg"
								isPending={isPendingProfilePhoto}
								onUpload={uploadProfilePhoto}
							/>
						</div>
						{!isCreator && isAuthenticated && userId && (
							<div className={cn(styles.followButtonContainer, 'hidden md:flex')}>
								<FollowButton username={userId} isFollowing={isFollowing ?? false} />
							</div>
						)}
					</div>

					{/* Right Panel - Profile Content */}
					<Stack className={cn(styles.rightPanel, 'justify-center gap-2 max-w-3xl')}>
						{/* Profile Header Section */}
						<Stack className="gap-1">
							<Heading as="h3" className={cn(styles.usernameHeader)}>
								{username || firstName}
								{trailName && <span className={styles.trailName}>({trailName})</span>}
							</Heading>

							{/* Follow Button (Mobile only) */}
							{!isCreator && isAuthenticated && userId && (
								<div className="flex md:hidden justify-start my-4">
									<FollowButton username={userId} isFollowing={isFollowing ?? false} />
								</div>
							)}

							{/* Follow Stats */}
							{isCreator && <FollowStats />}

							<Flex className="flex-wrap items-center gap-4 md:gap-3">
								{userLocation && (
									<Text
										className={cn(styles.locationText, 'inline-flex items-center gap-1')}>
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
						</Stack>

						{statusMessage ? (
							<Box className={cn(mx.textCenter)}>
								<Heading size="4">{statusMessage.title}</Heading>
								<Text color="gray">{statusMessage.subtitle}</Text>
							</Box>
						) : (
							<Text size="2" className={styles.userBio}>
								{userBio}
							</Text>
						)}
					</Stack>
				</Flex>
			</div>
		</Box>
	);
};
