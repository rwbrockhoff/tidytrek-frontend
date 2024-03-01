import { type User } from '../../../types/userTypes';
import { type PasswordInfo } from '../../../types/formTypes';
import { type InputEvent } from '../../../types/formTypes';
import { SegmentGroup, Segment as SemSegment, Button, Icon } from 'semantic-ui-react';
import { Header } from '../../../shared/ui/SemanticUI';
import PasswordForm from './PasswordForm';
import { setFormInput } from '../../../shared/formHelpers';
import { useState } from 'react';
import styled from 'styled-components';

type AccountFormProps = {
	user: User | null;
	success: boolean;
	changePassword: (passwordInfo: PasswordInfo) => void;
	resetFormError: () => void;
	deleteAccount: () => void;
};

const initialState = {
	currentPassword: '',
	newPassword: '',
	confirmNewPassword: '',
};

const AccountForm = ({
	user,
	success,
	resetFormError,
	changePassword,
	deleteAccount,
}: AccountFormProps) => {
	const [displayPasswordForm, setTogglePasswordForm] = useState(false);

	const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>(initialState);
	const handleTogglePasswordForm = () => setTogglePasswordForm(!displayPasswordForm);

	if (success && passwordInfo !== initialState) setPasswordInfo(initialState);

	const handleOnChange = (e: InputEvent) =>
		setFormInput<PasswordInfo>(e, setPasswordInfo);

	const handleResetForm = () => {
		setPasswordInfo(initialState);
		handleTogglePasswordForm();
		resetFormError();
	};
	const { firstName, lastName, email } = user || {};

	const fullName = `${firstName} ${lastName}`;
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
			<PasswordForm
				displayForm={displayPasswordForm}
				passwordInfo={passwordInfo}
				toggleForm={handleTogglePasswordForm}
				resetFormError={handleResetForm}
				onChange={handleOnChange}
				changePassword={changePassword}
			/>
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

export default AccountForm;

export const Segment = styled(SemSegment)`
	&&& {
		padding: 35px 25px;
	}
}
`;
