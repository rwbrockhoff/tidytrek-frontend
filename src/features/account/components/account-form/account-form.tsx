import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { type User } from '@/types/user-types';
import { type PasswordInfo, type InputEvent } from '@/types/form-types';
import { SegmentGroup, Segment as SemSegment } from 'semantic-ui-react';
import { Heading, Button } from '@radix-ui/themes';
import { DeleteModal, Message, TrashIcon } from '@/components/ui';
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

export const AccountForm = (props: AccountFormProps) => {
	const { user, resetFormError, setError, changePassword, deleteAccount } = props;

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
				<DeleteModal
					simple
					header="Delete Your Account"
					message={deleteMessage}
					onClickDelete={deleteAccount}>
					<div>
						<Button variant="outline" color="tomato">
							<TrashIcon />
							Delete Account
						</Button>
					</div>
				</DeleteModal>
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

// defaults
const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

const confirmationErrorMessage =
	'There was an error sending a confirmation code. Please try again later.';
