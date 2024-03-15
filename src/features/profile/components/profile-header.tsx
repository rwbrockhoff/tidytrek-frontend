import styled from 'styled-components';
import { type UserProfile } from '@/types/profile-types';
import { FaLocationArrow } from 'react-icons/fa6';
import { Avatar } from '@/components/ui';
import { SocialLinkList } from '@/components';
import { useHandlers } from '../../account/hooks/use-profile-handlers';
import { useUserContext } from '@/hooks/use-viewer-context';
import { BannerPhoto } from './banner-photo';
import { Flex, Heading } from '@radix-ui/themes';
import { Text } from '@/components/ui/text';

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

	return (
		<ProfileHeaderContainer>
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
						{trailName && <span>({trailName})</span>}
					</UsernameHeader>

					<Flex align="center" mb="2">
						{userLocation && <Text icon={<FaLocationArrow />}>{userLocation}</Text>}

						<SocialLinkList
							socialLinks={socialLinks || []}
							deleteEnabled={false}
							colorButton={true}
						/>
					</Flex>

					<p>{userBio}</p>
				</ProfileTextContainer>
			</ProfileInfoContainer>
		</ProfileHeaderContainer>
	);
};

const ProfileHeaderContainer = styled.div`
	position: relative;
	margin-top: 25px;
`;

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
	width: 30vw;
	margin-left: 250px;
	margin-right: 250px;

	${({ theme: t }) =>
		t.mx.mobile(`
			margin: 0px 20px;
			margin-top: 75px;
			width: 80vw;
			justify-content: flex-start;
	`)}
`;

const UsernameHeader = styled(Heading)`
	span {
		opacity: 0.7;
		margin-left: 0.5rem;
	}
`;
