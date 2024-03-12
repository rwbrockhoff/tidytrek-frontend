import styled from 'styled-components';
import { ProfileForm } from '../components/profile-form/profile-form';
import { useGetProfileSettingsQuery } from '../../../queries/profileSettingsQueries';
import { HandlerWrapper } from '../hooks/use-profile-handlers';

export const ProfileSettings = () => {
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

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
