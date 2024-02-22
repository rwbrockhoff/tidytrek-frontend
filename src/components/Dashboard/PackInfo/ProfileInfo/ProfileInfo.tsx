import Avatar from '../../../../shared/ui/Avatar';
import { Header } from 'semantic-ui-react';
import { SocialLink } from '../../../../types/profileSettingsTypes';
import SocialLinkList from '../../../Account/ProfileForm/SocialLinkList';
import styled from 'styled-components';
import { type UserNames } from '../../../../types/userTypes';

type ProfileInfoProps = {
	profilePhotoUrl: string | undefined;
	socialLinks: SocialLink[] | null;
	user: UserNames | null;
};

const ProfileInfo = ({ profilePhotoUrl, socialLinks, user }: ProfileInfoProps) => {
	return (
		<ProfileInfoContainer>
			<Avatar src={profilePhotoUrl} size="medium" />
			<TextContainer>
				<UsernameHeader as="h4">
					{user?.username || user?.firstName || 'Tidy Hiker'}
				</UsernameHeader>
				<SocialLinkList
					socialLinks={socialLinks || []}
					deleteEnabled={false}
					colorButton={false}
				/>
			</TextContainer>
		</ProfileInfoContainer>
	);
};

export default ProfileInfo;

const ProfileInfoContainer = styled.div`
	display: flex;
`;

const TextContainer = styled.div`
	padding-left: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const UsernameHeader = styled(Header)`
	margin-bottom: 10px;
`;
