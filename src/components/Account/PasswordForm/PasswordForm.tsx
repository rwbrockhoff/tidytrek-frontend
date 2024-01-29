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
import { type PasswordInfo } from '../AccountForm/AccountForm';
import { ReactInput } from '../../../types/generalTypes';

type PasswordFormProps = {
	displayForm: boolean;
	toggleForm: () => void;
	passwordInfo: PasswordInfo;
	onChange: (e: ReactInput) => void;
	changePassword: () => void;
};

const PasswordForm = (props: PasswordFormProps) => {
	const { displayForm, toggleForm, passwordInfo, onChange, changePassword } = props;
	const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;

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
								value={currentPassword}
								onChange={onChange}
							/>
						</FormField>
						<FormField width={6}>
							<label>Current Password</label>
							<Input
								name="newPassword"
								placeholder="New Password"
								type="password"
								value={newPassword}
								onChange={onChange}
							/>
						</FormField>
						<FormField width={6}>
							<label>Current Password</label>
							<Input
								name="confirmNewPassword"
								placeholder="Confirm New Password"
								type="password"
								value={confirmNewPassword}
								onChange={onChange}
							/>
						</FormField>
						<Button onClick={toggleForm}>Cancel</Button>
						<Button color="blue" onClick={changePassword}>
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
