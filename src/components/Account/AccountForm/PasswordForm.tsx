import { Form, Input, Icon, Header } from 'semantic-ui-react';
import { Button, FormField } from '../../../shared/ui/SemanticUI';
import { Link } from 'react-router-dom';
import { type PasswordInfo, type InputEvent } from '../../../types/formTypes';
import Message from '../../../shared/ui/Message';
import { useContext } from 'react';
import { ChangePassContext } from '../../../views/Account/AccountSettings/AccountSettings';
import { Segment } from './AccountForm';
import styled from 'styled-components';
import { mobile } from '../../../shared/mixins/mixins';

type PasswordFormProps = {
	displayForm: boolean;
	passwordInfo: PasswordInfo;
	toggleForm: () => void;
	resetFormError: () => void;
	onChange: (e: InputEvent) => void;
	changePassword: (passwordInfo: PasswordInfo) => void;
};

const PasswordForm = (props: PasswordFormProps) => {
	const {
		displayForm,
		passwordInfo,
		toggleForm,
		resetFormError,
		onChange,
		changePassword,
	} = props;
	const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;

	const { isPending, isSuccess, error } = useContext(ChangePassContext);

	return (
		<Segment>
			<Header as="h4">Update Your Password</Header>
			{!displayForm && (
				<Button basic onClick={toggleForm}>
					<Icon name="key" />
					Change Password
				</Button>
			)}

			{displayForm && (
				<>
					<Form>
						<FormField $width={'50%'}>
							<label>Current Password</label>
							<Input
								name="currentPassword"
								placeholder="Current Password"
								type="password"
								value={currentPassword}
								onChange={onChange}
							/>
						</FormField>
						<FormField $width={'50%'}>
							<label>New Password</label>
							<Input
								name="newPassword"
								placeholder="New Password"
								type="password"
								value={newPassword}
								onChange={onChange}
							/>
						</FormField>
						<FormField $width={'50%'}>
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
						<ButtonContainer>
							<Button onClick={resetFormError}>{isSuccess ? 'Close' : 'Cancel'}</Button>
							<Button
								$themeColor="primary"
								disabled={isPending}
								onClick={() => changePassword(passwordInfo)}>
								Save Password
							</Button>
						</ButtonContainer>
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

const ButtonContainer = styled.div`
	width: 50%;
	display: flex;
	justify-content: flex-end;

	&&& {
		button {
			margin: 5px;
		}
	}

	${mobile(`
		width: 100%;
		margin-top: 25px;
	`)}
`;
