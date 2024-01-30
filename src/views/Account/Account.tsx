import {
	useGetAuthStatusQuery,
	useChangePasswordMutation,
	useDeleteAccountMutation,
} from '../../redux/user/userApiSlice';
import { useState, createContext } from 'react';
import { Icon, Header } from 'semantic-ui-react';
import AccountForm, {
	PasswordInfo,
} from '../../components/Account/AccountForm/AccountForm';
import { DeleteModal } from '../../components/Dashboard/PackCategory/Modals/Modals';
import './Account.css';
import { validPassword, passwordRequirements } from '../Authentication/authHelper';
import { useFormInfo } from '../Authentication/useFormInfo';

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

export const ChangePassContext = createContext({
	isLoading: false,
	isSuccess: false,
	error: { error: false, message: '' },
});

const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const [deleteAccount] = useDeleteAccountMutation();
	const [changePassword, changePassData] = useChangePasswordMutation();

	const { isLoading, isSuccess, isError, error: passError } = changePassData;

	const changePassStatus = { isError, error: passError };
	const user = data?.user;

	const [showModal, setShowModal] = useState(false);

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

	const handleResetFormError = () => {
		setFormError({ error: false, message: '' });
		changePassData.reset();
	};

	const [error, setFormError] = useFormInfo([changePassStatus], isLoading);

	return (
		<div className="account-container">
			<Header as="h3">
				<Icon name="user outline" />
				Account Info
			</Header>
			<ChangePassContext.Provider value={{ isSuccess, isLoading, error }}>
				<AccountForm
					user={user}
					success={isSuccess}
					resetFormError={handleResetFormError}
					changePassword={handleChangePassword}
					deleteAccount={handleToggleModal}
				/>
			</ChangePassContext.Provider>
			<DeleteModal
				simple
				open={showModal}
				header="Delete Your Account"
				message={deleteMessage}
				onClose={handleToggleModal}
				onClickDelete={deleteAccount}
			/>
		</div>
	);
};

export default Account;
