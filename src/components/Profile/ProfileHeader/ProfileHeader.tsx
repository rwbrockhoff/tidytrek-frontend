import styled from 'styled-components';
import Avatar from '../../../shared/ui/Avatar';
import { type ProfileInfo } from '../../../types/profileTypes';
import { Header, Icon } from 'semantic-ui-react';
import SocialLinkList from '../../Account/ProfileForm/SocialLinkList';
import { useHandlers } from '../../../views/Account/ProfileSettings/useProfileHandlers';
import { useUserContext } from '../../../views/Dashboard/hooks/useUserContext';
import BannerPhoto from '../BannerPhoto/BannerPhoto';

type ProfileHeaderProps = {
	userProfile: ProfileInfo | undefined;
};

const ProfileHeader = (props: ProfileHeaderProps) => {
	const userView = useUserContext();
	const { userProfile } = props;
	const { profileSettings, socialLinks, user } = userProfile || {};
	const { profilePhotoUrl, backgroundPhotoUrl, userLocation, userBio } =
		profileSettings || {};

	const {
		uploadProfilePhoto: { mutate: uploadProfilePhoto, isPending: isPendingProfilePhoto },
		uploadBannerPhoto: { mutate: uploadBannerPhoto, isPending: isPendingBannerPhoto },
	} = useHandlers().mutations;

	return (
		<ProfileHeaderContainer>
			<BannerPhoto
				bannerPhotoUrl={backgroundPhotoUrl}
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
				<ProfileTextContainer>
					<UsernameHeader as="h3">
						{user?.username || user?.firstName || 'Tidy Hiker'}
					</UsernameHeader>
					<InnerContainer>
						<LocationText>
							<Icon name="location arrow" />
							{userLocation}
						</LocationText>
						<SocialLinkList
							socialLinks={socialLinks || []}
							deleteEnabled={false}
							colorButton={true}
						/>
					</InnerContainer>

					<p>{userBio}</p>
				</ProfileTextContainer>
			</ProfileInfoContainer>
		</ProfileHeaderContainer>
	);
};

export default ProfileHeader;

const ProfileHeaderContainer = styled.div`
	position: relative;
	margin-top: 25px;
`;

const AvatarContainer = styled.div`
	width: fit-content;
	position: absolute;
	top: 200px;
	left: 50px;
	@media only screen and (max-width: 768px) {
		top: 175px;
		left: calc(50% - 75px);
	}
`;

const ProfileInfoContainer = styled.div`
	min-height: 175px;
	height: fit-content;
	padding: 25px 0px;
	background-color: #e8e8e8;
	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;

	@media only screen and (max-width: 768px) {
	}
`;

const ProfileTextContainer = styled.div`
	height: 100%;
	width: 30vw;
	margin-left: 250px;
	margin-right: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media only screen and (max-width: 768px) {
		margin: 0px 20px;
		margin-top: 75px;
		width: 80vw;
		justify-content: flex-start;
	}
`;

const LocationText = styled.p`
	margin: 0;
	margin-right: 15px;
`;

const UsernameHeader = styled(Header)`
	margin-bottom: 10px;
`;

const InnerContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 15px;
`;
