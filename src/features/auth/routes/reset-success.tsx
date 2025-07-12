import { Segment } from '@/components/ui';
import { Heading, Text } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import {
	AuthContainer,
	FormContainer,
} from '../components/form-components/form-components';
import { useNavigate, Link } from 'react-router-dom';

export const ResetSuccess = () => {
	const navigate = useNavigate();
	return (
		<AuthContainer>
			<FormContainer>
				<Heading as="h1" mb="4">
					<Link to="/">tidytrek</Link>
				</Heading>

				<Segment radius="2">
					<Heading as="h2" size="6" color="jade" mb="4">
						Success!
					</Heading>
					<Text>
						Your password has been successfully updated and you are now logged in.
					</Text>
					<Button size="lg" style={{ width: '100%' }} onClick={() => navigate('/')}>
						Go To Dashboard
					</Button>
				</Segment>
			</FormContainer>
		</AuthContainer>
	);
};
