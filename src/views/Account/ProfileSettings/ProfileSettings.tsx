import styled from 'styled-components';
import ProfileForm from '../../../components/Account/ProfileForm/ProfileForm';
import { useGetProfileSettingsQuery } from '../../../queries/userProfileQueries';

const ProfileSettings = () => {
	const { data } = useGetProfileSettingsQuery();
	const settings = data?.profileSettings;

	return (
		<Container>
			<ProfileForm settings={settings} />
		</Container>
	);
};

export default ProfileSettings;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
