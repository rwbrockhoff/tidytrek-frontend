import styled from 'styled-components';
import Avatar from '../../../shared/ui/Avatar';
import { type ProfileInfo } from '../../../types/profileTypes';
import { Header, Icon } from 'semantic-ui-react';
import SocialLinkList from '../../Account/ProfileForm/SocialLinkList';

type ProfileHeaderProps = {
	userProfile: ProfileInfo | undefined;
};

const ProfileHeader = (props: ProfileHeaderProps) => {
	const { userProfile } = props;
	const { profileSettings, socialLinks, user } = userProfile || {};
	const { profilePhotoUrl, backgroundPhotoUrl, userLocation, userBio } =
		profileSettings || {};

	return (
		<ProfileHeaderContainer>
			<BackgroundImage src={backgroundPhotoUrl} />
			<AvatarContainer>
				<Avatar withBorder src={profilePhotoUrl} size="large" />
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
`;

const BackgroundImage = styled.img`
	width: 100%;
	height: 250px;
	object-fit: cover;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	margin-bottom: -5px;
`;

const AvatarContainer = styled.div`
	width: fit-content;
	position: absolute;
	top: 200px;
	left: 50px;
`;

const ProfileInfoContainer = styled.div`
	height: 175px;
	background-color: #e8e8e8;
	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;
`;

const ProfileTextContainer = styled.div`
	height: 100%;
	width: 30vw;
	margin-left: 250px;
	margin-right: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
