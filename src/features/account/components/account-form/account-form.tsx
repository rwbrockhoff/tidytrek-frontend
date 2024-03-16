import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { type User } from '@/types/user-types';
import { type PasswordInfo, type InputEvent } from '@/types/form-types';
import { SegmentGroup, Segment as SemSegment, Button, Icon } from 'semantic-ui-react';
import { Heading } from '@radix-ui/themes';
import { Message } from '@/components/ui';
import { PasswordForm } from './password-form';
import { setFormInput } from '@/utils';
import { reauthenticateUser } from '@/api/supabaseClient';
import { ChangePassContext } from '../../routes';

type AccountFormProps = {
	user: User | null;
	changePassword: (passwordInfo: PasswordInfo) => void;
	setError: (message: string) => void;
	resetFormError: () => void;
	deleteAccount: () => void;
};

const initialState = {
	newPassword: '',
	confirmNewPassword: '',
	emailCode: '',
};

export type FormSection = 'initial' | 'passwordForm' | 'confirmationForm';

export const AccountForm = ({
	user,
	resetFormError,
	setError,
	changePassword,
	deleteAccount,
}: AccountFormProps) => {
	const { isSuccess, error } = useContext(ChangePassContext);

	const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>(initialState);
	const [displayFormSection, setDisplayFormSection] = useState<FormSection>('initial');
	const [confirmationSent, setConfirmationSent] = useState(false);

	useEffect(() => {
		// clear form on success
		if (isSuccess && passwordInfo !== initialState) handleResetForm();
	}, [isSuccess]);

	const handleChangeFormSection = (section: FormSection) =>
		setDisplayFormSection(section);

	const handleOnChange = (e: InputEvent) =>
		setFormInput<PasswordInfo>(e, setPasswordInfo);

	const handleSendConfirmation = async () => {
		try {
			handleChangeFormSection('passwordForm');
			const { error } = await reauthenticateUser();
			if (!error) setConfirmationSent(true);
		} catch (err) {
			setError(confirmationErrorMessage);
		}
	};

	const handleResetForm = () => {
		setPasswordInfo(initialState);
		resetFormError();
		handleChangeFormSection('initial');
	};

	const { firstName, lastName, email } = user || {};
	const fullName = `${firstName} ${lastName}`;

	const showMessage = error.error || isSuccess;

	return (
		<SegmentGroup>
			<Segment>
				<Heading as="h4" size="3" mb="4">
					Account Info
				</Heading>
				<p>
					<b>Name:</b> {fullName || 'A Tidy Hiker'}
				</p>
				<p>
					<b>Email:</b> {email || 'No email here. Too busy hiking.'}
				</p>
			</Segment>
			<Segment>
				<PasswordForm
					displayFormSection={displayFormSection}
					confirmationSent={confirmationSent}
					passwordInfo={passwordInfo}
					changeFormSection={handleChangeFormSection}
					sendConfirmation={handleSendConfirmation}
					resetForm={handleResetForm}
					onChange={handleOnChange}
					changePassword={changePassword}
				/>

				{showMessage && (
					<MessageContainer>
						<Message
							messageType={isSuccess ? 'success' : 'error'}
							text={isSuccess ? 'Your password has been updated!' : error.message}
							id="reset-password-message"
						/>
					</MessageContainer>
				)}
			</Segment>
			<Segment stacked>
				<Heading as="h4" size="3" mb="4">
					Delete Your Account
				</Heading>

				<p>
					Deleting your account will permanently delete all of your packs. Be sure to save
					any important information first.
				</p>
				<Button basic color="red" onClick={deleteAccount}>
					<Icon name="trash" />
					Delete Account
				</Button>
			</Segment>
		</SegmentGroup>
	);
};

const MessageContainer = styled.div`
	width: 50%;
	margin-top: 2em;
`;

export const Segment = styled(SemSegment)`
	&&& {
		padding: 3em 2em;
	}
`;

// defeaults
const confirmationErrorMessage =
	'There was an error sending a confirmation code. Please try again later.';
