import { FormError, type InputEvent } from '../../../types/formTypes';
import { Form, Header, Segment } from 'semantic-ui-react';
import { FooterText, FormContainer, FormMessage } from '../FormComponents';
import { SubText } from '../../../shared/ui/TidyUI';
import { Button } from '../../../shared/ui/SemanticUI';
import { Link } from '../../../shared/ui/Link';

type WelcomeFormProps = {
	username: string;
	trailName: string;
	formError: FormError;
	isPending: boolean;
	onChange: (e: InputEvent) => void;
	saveUsername: () => void;
};

const WelcomeForm = (props: WelcomeFormProps) => {
	const { username, trailName, formError, isPending, onChange, saveUsername } = props;
	const { error, message } = formError;
	return (
		<FormContainer>
			<Header as="h1">tidytrek</Header>
			<Form size="large" onSubmit={saveUsername}>
				<Segment stacked>
					<Header as="h3">Set Up Your Username</Header>
					<SubText>
						If you go by a different name out on the trail, we'd love to know.
					</SubText>
					<Form.Input
						fluid
						placeholder="Username"
						name="username"
						value={username}
						onChange={onChange}
						data-testid="welcome-form-username-input"
					/>

					<Form.Input
						fluid
						placeholder="Trail Name"
						name="trailName"
						value={trailName}
						onChange={onChange}
						data-testid="welcome-form-trailname-input"
					/>

					<Button
						$tidyColor="tidyPrimary"
						fluid
						size="large"
						disabled={isPending}
						type="submit">
						Save
					</Button>

					{error && (
						<FormMessage
							messageType="error"
							text={message || 'Oops! There was an error.'}
							id="welcome-form-error-message"
						/>
					)}

					<FooterText>
						<Link link={'/'}>Skip For Now</Link>
					</FooterText>
				</Segment>
			</Form>
		</FormContainer>
	);
};

export default WelcomeForm;
