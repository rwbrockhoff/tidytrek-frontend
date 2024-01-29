import {
	useGetAuthStatusQuery,
	useChangePasswordMutation,
	useDeleteAccountMutation,
} from '../../redux/user/userApiSlice';
import { useState } from 'react';
import { Icon, Header } from 'semantic-ui-react';
import AccountForm, {
	PasswordInfo,
} from '../../components/Account/AccountForm/AccountForm';
import { DeleteModal } from '../../components/Dashboard/PackCategory/Modals/Modals';
import './Account.css';
import { validPassword, passwordRequirements } from '../Authentication/authHelper';
import { useFormErrorInfo } from '../Authentication/useFormErrorInfo';
import { FormError } from '../../types/generalTypes';

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const [deleteAccount] = useDeleteAccountMutation();
	const [changePassword, changePassData] = useChangePasswordMutation();

	const changePassStatus = {
		isError: changePassData.isError,
		error: changePassData.error,
	};

	const user = data?.user;

	const [showModal, setShowModal] = useState(false);
	const [formError, setFormError] = useState<FormError>({
		error: false,
		message: '',
	});

	const handleToggleModal = () => setShowModal(!showModal);

	const handleChangePassword = (passwordInfo: PasswordInfo) => {
		const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;
		if (!currentPassword) return handleError('Please type in your current password.');
		if (newPassword !== confirmNewPassword)
			return handleError('Your passwords do not match.');
		if (!validPassword(newPassword)) return handleError(passwordRequirements);
		if (currentPassword) changePassword(passwordInfo);
	};

	const handleError = (message: string) =>
		setFormError({ error: true, message: message });

	const handleDeleteAccount = () => {
		deleteAccount();
	};

	const error = useFormErrorInfo(formError, [changePassStatus]);

	return (
		<div className="account-container">
			<Header as="h3">
				<Icon name="user outline" />
				Account Info
			</Header>
			<AccountForm
				user={user}
				error={error}
				changePassword={handleChangePassword}
				deleteAccount={handleToggleModal}
			/>
			<DeleteModal
				simple
				open={showModal}
				header="Delete Your Account"
				message={deleteMessage}
				onClose={handleToggleModal}
				onClickDelete={handleDeleteAccount}
			/>
		</div>
	);
};

export default Account;
