import styled from 'styled-components';
import ProfileForm from '../../../components/Account/ProfileForm/ProfileForm';
import { useGetProfileSettingsQuery } from '../../../queries/profileSettingsQueries';
import { HandlerWrapper } from './useProfileHandlers';

const ProfileSettings = () => {
	const { data } = useGetProfileSettingsQuery();
	const { profileInfo, socialLinks = [] } = data || {};

	return (
		<HandlerWrapper>
			<Container>
				<ProfileForm profileInfo={profileInfo} socialLinks={socialLinks} />
			</Container>
		</HandlerWrapper>
	);
};

export default ProfileSettings;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
