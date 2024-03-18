import { type PasswordInfo, type InputEvent } from '@/types/form-types';
import { useContext } from 'react';
import styled from 'styled-components';
import { Flex, Heading, Button } from '@radix-ui/themes';
import { Form, Input } from 'semantic-ui-react';
import { FormField } from '@/components/ui/SemanticUI';
import { Link, PasswordIcon } from '@/components/ui';
import { ChangePassContext } from '../../routes';
import { FormSection } from './account-form';
import { ConfirmationForm } from './confirmation-form';

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

export const PasswordForm = (props: PasswordFormProps) => {
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
			<Heading as="h4" size="3" mb="4">
				Update Your Password
			</Heading>
			{displayFormSection === 'initial' && (
				<Button
					variant="outline"
					color="gray"
					onClick={() => changeFormSection('confirmationForm')}>
					<PasswordIcon />
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
					<ButtonContainer justify="end">
						<Button onClick={resetForm}>{isSuccess ? 'Close' : 'Cancel'}</Button>
						<Button onClick={() => changePassword(passwordInfo)}>Save Password</Button>
					</ButtonContainer>
				</Form>
			)}
		</>
	);
};

const ButtonContainer = styled(Flex)`
	width: 50%;
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
