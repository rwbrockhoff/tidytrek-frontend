import {
	SegmentGroup,
	Segment as SemSegment,
	Button,
	Icon,
	Header,
} from 'semantic-ui-react';
import { type User } from '../../../types/userTypes';
import { type PasswordInfo } from '../../../types/generalTypes';
import { type ReactInput } from '../../../types/generalTypes';
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

	const handleOnChange = (e: ReactInput) =>
		setFormInput<PasswordInfo>(e, setPasswordInfo);

	const handleResetForm = () => {
		setPasswordInfo(initialState);
		handleTogglePasswordForm();
		resetFormError();
	};

	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Account Info</Header>
				<p>
					<b>Name:</b> {user?.firstName || 'A Tidy Hiker'}
				</p>
				<p>
					<b>Email:</b> {user?.email || 'No email here. Too busy hiking.'}
				</p>
				<p>
					<b>Username:</b> {user?.username || 'No trail name yet? Take your time.'}
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
