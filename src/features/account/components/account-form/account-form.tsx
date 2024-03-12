import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { type User } from '@/types/userTypes';
import { type PasswordInfo, type InputEvent } from '@/types/formTypes';
import { SegmentGroup, Segment as SemSegment, Button, Icon } from 'semantic-ui-react';
import { Header } from '@/components/ui/SemanticUI';
import { PasswordForm } from './password-form';
import { setFormInput } from '@/utils/formHelpers';
import { reauthenticateUser } from '@/api/supabaseClient';
import { ChangePassContext } from '../../routes';
import { Message } from '@/components/ui';

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
				<Header as="h4" $marginBottom="2rem">
					Account Info
				</Header>
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
							error={error}
							success={isSuccess}
							successMessage="Your password has been updated!"
						/>
					</MessageContainer>
				)}
			</Segment>
			<Segment stacked>
				<Header as="h4">Delete Your Account</Header>
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
