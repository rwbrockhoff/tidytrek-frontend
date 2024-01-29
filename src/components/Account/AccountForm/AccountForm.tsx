import { SegmentGroup, Segment, Button, Icon, Header } from 'semantic-ui-react';
import { type User } from '../../../redux/user/userApiSlice';
import { type ReactInput } from '../../../types/generalTypes';
import PasswordForm from '../PasswordForm/PasswordForm';
import { setFormInput } from '../../../shared/formHelpers';
import { useState } from 'react';
import './AccountForm.css';

type AccountFormProps = {
	user: User | undefined;
	changePassword: () => void;
	deleteAccount: () => void;
};

export type PasswordInfo = {
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

const AccountForm = ({ user, changePassword, deleteAccount }: AccountFormProps) => {
	const [displayPasswordForm, setTogglePasswordForm] = useState(false);

	const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>({
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	});
	const handleTogglePasswordForm = () => setTogglePasswordForm(!displayPasswordForm);

	const handleOnChange = (e: ReactInput) =>
		setFormInput<PasswordInfo>(e, setPasswordInfo);

	return (
		<SegmentGroup className="account-segment-group">
			<Segment stacked>
				<Header as="h4">Account Info</Header>
				<p>
					<b>Name:</b> {user?.name || 'A Tidy Hiker'}
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
				toggleForm={handleTogglePasswordForm}
				passwordInfo={passwordInfo}
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
