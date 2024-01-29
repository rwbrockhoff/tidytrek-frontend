import {
	Segment,
	Form,
	Input,
	FormField,
	Button,
	Icon,
	Header,
	Divider,
	Message,
} from 'semantic-ui-react';

type PasswordFormProps = {
	displayForm: boolean;
	toggleForm: () => void;
	savePassword: () => void;
};

const PasswordForm = ({ displayForm, toggleForm, savePassword }: PasswordFormProps) => {
	return (
		<Segment stacked>
			<Header as="h4">Update Your Password</Header>
			{!displayForm && (
				<Button basic onClick={toggleForm}>
					<Icon name="key" />
					Change Password
				</Button>
			)}

			{displayForm && (
				<>
					<Divider />
					<Form>
						<FormField width={6}>
							<label>Current Password</label>
							<Input
								name="currentPassword"
								placeholder="Current Password"
								type="password"
							/>
						</FormField>
						<FormField width={6}>
							<label>Current Password</label>
							<Input name="newPassword" placeholder="New Password" type="password" />
						</FormField>
						<FormField width={6}>
							<label>Current Password</label>
							<Input
								name="confirmPassword"
								placeholder="Confirm New Password"
								type="password"
							/>
						</FormField>
						<Button onClick={toggleForm}>Cancel</Button>
						<Button color="blue" onClick={savePassword}>
							Save Password
						</Button>
					</Form>
					<Message warning data-testid="account-change-password-message">
						<Icon name="hand point right outline" />
						{'Oops! There was an error.'}
					</Message>
				</>
			)}
		</Segment>
	);
};

export default PasswordForm;
