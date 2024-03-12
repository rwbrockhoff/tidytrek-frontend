import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import {
	type ProfileInfo as ProfileInfoType,
	type SocialLink,
} from '@/types/profile-types';
import { Avatar, Link } from '@/components/ui';
import { SocialLinkList } from '@/components';
import { encode } from '@/utils';

type ProfileInfoProps = {
	userInfo: ProfileInfoType | undefined;
	socialLinks: SocialLink[] | undefined;
	publicProfile: boolean | undefined;
};

export const ProfileInfo = (props: ProfileInfoProps) => {
	const { userInfo, socialLinks, publicProfile } = props;
	const { username, firstName, userId, profilePhotoUrl } = userInfo || {};

	const userBasedUrl = username || (userId && encode(userId));
	return (
		<ProfileInfoContainer>
			<Link link={`/user/${userBasedUrl}`} enabled={publicProfile}>
				<Avatar src={profilePhotoUrl} size="medium" />
			</Link>
			<TextContainer>
				<UsernameHeader as="h4">
					<Link link={`/user/${userBasedUrl}`} enabled={publicProfile}>
						{username || firstName || 'Tidy Hiker'}
					</Link>
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
