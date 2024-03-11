import { Form, Input, Icon, Header } from 'semantic-ui-react';
import { Button, FormField } from '../../../components/ui/SemanticUI';
import { Link } from '../../../components/ui/Link';
import { type PasswordInfo, type InputEvent } from '../../../types/formTypes';
import { useContext } from 'react';
import { ChangePassContext } from '../../../pages/Account/AccountSettings/AccountSettings';
import { FormSection } from './AccountForm';
import styled from 'styled-components';
import ConfirmationForm from './ConfirmationForm';

type PasswordFormProps = {
	displayFormSection: FormSection;
	confirmationSent: boolean;
	passwordInfo: PasswordInfo;
	changeFormSection: (section: FormSection) => void;
	sendConfirmation: () => void;
	resetForm: () => void;
	onChange: (e: InputEvent) => void;
	changePassword: (passwordInfo: PasswordInfo) => void;
};

const PasswordForm = (props: PasswordFormProps) => {
	const {
		displayFormSection,
		confirmationSent,
		passwordInfo,
		changeFormSection,
		sendConfirmation,
		resetForm,
		onChange,
		changePassword,
	} = props;
	const { newPassword, confirmNewPassword, emailCode } = passwordInfo;

	const { isSuccess } = useContext(ChangePassContext);

	// show confirmation form when the section is chosen,
	// or to show 'email sent' message when passwordForm is visible
	const showConfirmationForm =
		(!isSuccess && displayFormSection === 'confirmationForm') ||
		(displayFormSection === 'passwordForm' && confirmationSent);
	return (
		<>
			<Header as="h4">Update Your Password</Header>
			{displayFormSection === 'initial' && (
				<Button basic onClick={() => changeFormSection('confirmationForm')}>
					<Icon name="key" />
					Change Password
				</Button>
			)}

			{showConfirmationForm && (
				<ConfirmationForm
					sendConfirmation={sendConfirmation}
					confirmationSent={confirmationSent}
				/>
			)}

			{displayFormSection === 'passwordForm' && (
				<Form>
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
					<FormField $width={'50%'}>
						<label>Email Code</label>
						<Input
							name="emailCode"
							placeholder="Email Code"
							value={emailCode}
							onChange={onChange}
						/>
					</FormField>
					<Link link="/reset-password">
						<p>Reset Your Password</p>
					</Link>
					<ButtonContainer>
						<Button onClick={resetForm}>{isSuccess ? 'Close' : 'Cancel'}</Button>
						<Button $themeColor="primary" onClick={() => changePassword(passwordInfo)}>
							Save Password
						</Button>
					</ButtonContainer>
				</Form>
			)}
		</>
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

	${({ theme: t }) =>
		t.mx.mobile(`
		width: 100%;
		margin-top: 2em;
	`)}
`;
