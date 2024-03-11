import { Form, Header, Segment } from 'semantic-ui-react';
import { Button } from '../../../components/ui/SemanticUI';
import { AuthContainer, FormContainer } from '../FormComponents';
import { useNavigate } from 'react-router-dom';

const ResetSuccess = () => {
	const navigate = useNavigate();
	return (
		<AuthContainer>
			<FormContainer>
				<Header as="h1">tidytrek</Header>
				<Form size="large">
					<Segment stacked>
						<Header as="h2">Success!</Header>
						<p>Your password has been successfully updated and you are now logged in.</p>
						<Button
							$tidyColor="tidyPrimary"
							fluid
							size="large"
							onClick={() => navigate('/')}>
							Go To Dashboard
						</Button>
					</Segment>
				</Form>
			</FormContainer>
		</AuthContainer>
	);
};

export default ResetSuccess;
