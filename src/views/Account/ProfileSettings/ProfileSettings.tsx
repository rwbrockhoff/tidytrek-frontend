import styled from 'styled-components';
import ProfileForm from '../../../components/Account/ProfileForm/ProfileForm';
import { useGetProfileSettingsQuery } from '../../../queries/userProfileQueries';
import { HandlerWrapper } from './useHandlers';

export type UserInfo = {
	userBio: string;
	userLocation: string;
};

const ProfileSettings = () => {
	const { data } = useGetProfileSettingsQuery();
	const { profileSettings, socialLinks = [] } = data || {};

	return (
		<HandlerWrapper>
			<Container>
				<ProfileForm settings={profileSettings} socialLinks={socialLinks} />
			</Container>
		</HandlerWrapper>
	);
};

export default ProfileSettings;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
