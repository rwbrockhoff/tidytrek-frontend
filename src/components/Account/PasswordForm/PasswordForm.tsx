import {
	Segment,
	Form,
	Input,
	FormField,
	Icon,
	Header,
	Divider,
} from 'semantic-ui-react';
import { Button } from '../../../shared/ui/SemanticUI';
import { Link } from 'react-router-dom';
import { type PasswordInfo } from '../../../types/generalTypes';
import { type ReactInput } from '../../../types/generalTypes';
import Message from '../../../shared/ui/Message';
import { useContext } from 'react';
import { ChangePassContext } from '../../../views/Account/Account';

type PasswordFormProps = {
	displayForm: boolean;
	toggleForm: () => void;
	resetFormError: () => void;
	passwordInfo: PasswordInfo;
	onChange: (e: ReactInput) => void;
	changePassword: (passwordInfo: PasswordInfo) => void;
};

const PasswordForm = (props: PasswordFormProps) => {
	const {
		displayForm,
		toggleForm,
		resetFormError,
		passwordInfo,
		onChange,
		changePassword,
	} = props;
	const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;

	const { isPending, isSuccess, error } = useContext(ChangePassContext);

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
						<FormField width={8}>
							<label>Current Password</label>
							<Input
								name="currentPassword"
								placeholder="Current Password"
								type="password"
								value={currentPassword}
								onChange={onChange}
							/>
						</FormField>
						<FormField width={8}>
							<label>New Password</label>
							<Input
								name="newPassword"
								placeholder="New Password"
								type="password"
								value={newPassword}
								onChange={onChange}
							/>
						</FormField>
						<FormField width={8}>
							<label>Confirm</label>
							<Input
								name="confirmNewPassword"
								placeholder="Confirm New Password"
								type="password"
								value={confirmNewPassword}
								onChange={onChange}
							/>
						</FormField>
						<Link to="/reset-password">
							<p className="reset-password-link">Reset Your Password</p>
						</Link>
						<div className="form-button-container">
							<Button onClick={resetFormError}>{isSuccess ? 'Close' : 'Cancel'}</Button>
							<Button
								$themeColor="primary"
								disabled={isPending}
								onClick={() => changePassword(passwordInfo)}>
								Save Password
							</Button>
						</div>
					</Form>

					<Message
						loading={isPending}
						error={error}
						success={isSuccess}
						successMessage="Your password has been updated!"
					/>
				</>
			)}
		</Segment>
	);
};

export default PasswordForm;
