import styled from 'styled-components';
import { type UserProfile } from '@/types/profile-types';
import { LocationIcon } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { SocialLinkList } from '@/components';
import { useHandlers } from '../../account/hooks/use-profile-handlers';
import { useUserContext } from '@/hooks/use-viewer-context';
import { BannerPhoto } from './banner-photo';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';

type ProfileHeaderProps = {
	userProfile: UserProfile | undefined;
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
		uploadProfilePhoto: { mutate: uploadProfilePhoto, isPending: isPendingProfilePhoto },
		uploadBannerPhoto: { mutate: uploadBannerPhoto, isPending: isPendingBannerPhoto },
	} = useHandlers().mutations;

	const hasSocialLinks = socialLinks?.length ? true : false;

	return (
		<Box position="relative" mt={userView ? '8' : '4'}>
			<BannerPhoto
				bannerPhotoUrl={bannerPhotoUrl}
				uploadEnabled={userView}
				isPending={isPendingBannerPhoto}
				onUpload={uploadBannerPhoto}
			/>

			<AvatarContainer>
				<Avatar
					withBorder
					uploadEnabled={userView}
					src={profilePhotoUrl}
					size="large"
					isPending={isPendingProfilePhoto}
					onUpload={uploadProfilePhoto}
				/>
			</AvatarContainer>
			<ProfileInfoContainer>
				<ProfileTextContainer direction="column" justify="center">
					<UsernameHeader as="h3">
						{username || firstName || 'Tidy Hiker'}
						{trailName && <span className="trailName">{trailName}</span>}
					</UsernameHeader>

					<Flex align="center" wrap="wrap">
						{userLocation && (
							<LocationText mr="4">
								<LocationIcon /> {userLocation}
							</LocationText>
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
				</ProfileTextContainer>
			</ProfileInfoContainer>
		</Box>
	);
};

const AvatarContainer = styled.div`
	width: fit-content;
	position: absolute;
	top: 200px;
	left: 50px;
	${({ theme: t }) =>
		t.mx.mobile(`
			top: 175px;
			left: calc(50% - 75px);
	`)}
`;

const ProfileInfoContainer = styled.div`
	min-height: 175px;
	height: fit-content;
	padding: 25px 0px;
	background-color: #e8e8e8;
	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;
`;

const ProfileTextContainer = styled(Flex)`
	height: 100%;
	width: 50%;
	margin-left: 250px;

	${({ theme: t }) =>
		t.mx.mobile(`
			margin: 0px 20px;
			margin-top: 75px;
			width: 90%;
			justify-content: flex-start;
	`)}
`;

const LocationText = styled(Text)`
	white-space: nowrap;
	display: inline-flex;
	align-items: center;

	svg {
		margin-right: 0.25em;
		color: var(--gray-9);
	}
`;

const UsernameHeader = styled(Heading)`
	margin-bottom: 0.25em;
	span.trailName {
		color: var(--gray-10);
		margin-left: 0.5em;
	}
`;
