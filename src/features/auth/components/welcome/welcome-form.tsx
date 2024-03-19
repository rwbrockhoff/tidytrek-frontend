import { FormError, type InputEvent } from '@/types/form-types';
import { Form } from 'semantic-ui-react';
import { Flex, Text, Heading, Button } from '@radix-ui/themes';
import { Link, Message, Segment } from '@/components/ui';
import { FormContainer } from '../form-components';

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
			<Heading as="h1" mb="4">
				tidytrek
			</Heading>

			<Segment $radius="2">
				<Heading as="h3" size="6" color="jade" mb="4">
					Welcome to Tidytrek!
				</Heading>
				<Text size="4" mb="4">
					Go by a different name on the trail?
				</Text>
				<br />
				<Text color="gray" size="3">
					A <strong>username</strong> has to be unique and helps people find your profile.{' '}
					<br /> A <strong>trail name</strong> can be anything you'd like.
				</Text>
				<Form size="large" onSubmit={saveUsername} style={{ marginTop: '1em' }}>
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

					<Button size="3" style={{ width: '100%' }} disabled={isPending} type="submit">
						Save
					</Button>

					{error && (
						<Message
							messageType="error"
							text={message || 'Oops! There was an error.'}
							id="welcome-form-error-message"
						/>
					)}
				</Form>

				<Flex justify="center" mt="4">
					<Link link={'/'}>
						<Text size="3">Skip For Now</Text>
					</Link>
				</Flex>
			</Segment>
		</FormContainer>
	);
};
