import Avatar from '../../../../shared/ui/Avatar';
import { Header } from 'semantic-ui-react';
import { SocialLink } from '../../../../types/profileTypes';
import SocialLinkList from '../../../Account/ProfileForm/SocialLinkList';
import styled from 'styled-components';
import { type UserNames } from '../../../../types/userTypes';
import { CustomLink } from '../../../../shared/ui/CustomLinks';
import { encode } from '../../../../utils/generateDisplayId';

type ProfileInfoProps = {
	profilePhotoUrl: string | undefined;
	socialLinks: SocialLink[] | null;
	user: UserNames | null;
	publicProfile: boolean | undefined;
};

const ProfileInfo = (props: ProfileInfoProps) => {
	const { profilePhotoUrl, publicProfile, socialLinks, user } = props;
	const { username, firstName, userId } = user || {};

	const userBasedUrl = username || (userId && encode(userId));
	return (
		<ProfileInfoContainer>
			<CustomLink link={`/user/${userBasedUrl}`} enabled={publicProfile}>
				<Avatar src={profilePhotoUrl} size="medium" />
			</CustomLink>
			<TextContainer>
				<UsernameHeader as="h4">
					<CustomLink link={`/user/${userBasedUrl}`} enabled={publicProfile}>
						{username || firstName || 'Tidy Hiker'}
					</CustomLink>
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
