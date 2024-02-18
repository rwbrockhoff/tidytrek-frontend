import styled from 'styled-components';
import ProfileForm from '../../../components/Account/ProfileForm/ProfileForm';

const ProfileSettings = () => {
	return (
		<Container>
			<ProfileForm />
		</Container>
	);
};

export default ProfileSettings;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
