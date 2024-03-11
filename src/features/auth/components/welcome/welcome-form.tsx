import { FormError, type InputEvent } from '../../../../types/formTypes';
import { Form, Segment } from 'semantic-ui-react';
import { Header } from '../../../../components/ui/SemanticUI';
import { FooterText, FormContainer, FormMessage } from '../form-components';
import { SubText } from '../../../../components/ui/TidyUI';
import { Button } from '../../../../components/ui/SemanticUI';
import { Link } from '../../../../components/ui/Link';

type WelcomeFormProps = {
	username: string;
	trailName: string;
	formError: FormError;
	isPending: boolean;
	onChange: (e: InputEvent) => void;
	saveUsername: () => void;
};

export const WelcomeForm = (props: WelcomeFormProps) => {
	const { username, trailName, formError, isPending, onChange, saveUsername } = props;
	const { error, message } = formError;
	return (
		<FormContainer>
			<Header as="h1">tidytrek</Header>
			<Form size="large" onSubmit={saveUsername}>
				<Segment stacked>
					<Header as="h3" $tidyColor="tidyPrimary">
						Welcome to Tidytrek!
					</Header>
					<p>Go by a different name on the trail?</p>
					<SubText style={{ lineHeight: '2em' }}>
						A <strong>username</strong> has to be unique and helps people find your
						profile. <br /> A <strong>trail name</strong> can be anything you'd like.
					</SubText>
					<Form.Input
						fluid
						placeholder="Username (optional)"
						name="username"
						value={username}
						onChange={onChange}
						data-testid="welcome-form-username-input"
					/>

					<Form.Input
						fluid
						placeholder="Trail Name (optional)"
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
