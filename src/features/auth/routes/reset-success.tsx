import { Segment } from '@/components/ui';
import { Heading, Button, Text } from '@radix-ui/themes';
import { AuthContainer, FormContainer } from '../components/form-components';
import { useNavigate } from 'react-router-dom';

export const ResetSuccess = () => {
	const navigate = useNavigate();
	return (
		<AuthContainer>
			<FormContainer>
				<Heading as="h1" mb="4">
					tidytrek
				</Heading>

				<Segment $radius="2">
					<Heading as="h2" size="6" color="jade" mb="4">
						Success!
					</Heading>
					<Text>
						Your password has been successfully updated and you are now logged in.
					</Text>
					<Button size="3" style={{ width: '100%' }} mt="4" onClick={() => navigate('/')}>
						Go To Dashboard
					</Button>
				</Segment>
			</FormContainer>
		</AuthContainer>
	);
};
