import {
	useChangePasswordMutation,
	useGetAuthStatusQuery,
	useDeleteAccountMutation,
} from '../../queries/userQueries';
import { useState, createContext } from 'react';
import { Icon, Header } from 'semantic-ui-react';
import { type PasswordInfo } from '../../types/generalTypes';
import AccountForm from '../../components/Account/AccountForm/AccountForm';
import { DeleteModal } from '../../shared/ui/Modals';
import './Account.css';
import { validPassword, passwordRequirements } from '../Authentication/authHelper';
import { useCombineErrors, type MutationError } from '../Authentication/useCombineErrors';

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

export const ChangePassContext = createContext({
	isPending: false,
	isSuccess: false,
	error: { error: false, message: '' },
});

const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const { mutate: deleteAccount } = useDeleteAccountMutation();
	const changePassData = useChangePasswordMutation();
	const { mutate: changePassword, isSuccess, isPending } = changePassData;

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
		// changePassData.reset();
	};

	const [error, setFormError] = useCombineErrors([changePassData as MutationError]);

	return (
		<div className="account-container">
			<Header as="h3">
				<Icon name="user outline" />
				Account Info
			</Header>
			<ChangePassContext.Provider value={{ isSuccess, isPending, error }}>
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
