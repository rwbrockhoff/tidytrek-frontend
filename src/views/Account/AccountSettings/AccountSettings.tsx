import styled from 'styled-components';
import { useState, createContext, useContext } from 'react';
import { UserContext } from '../Account';
import { DeleteModal } from '../../../shared/ui/Modals';
import AccountForm from '../../../components/Account/AccountForm/AccountForm';
import { type PasswordInfo } from '../../../types/formTypes';
import { validPassword, passwordRequirements } from '../../Authentication/authHelper';
import {
	useCombineErrors,
	type MutationError,
} from '../../Authentication/useCombineErrors';
import {
	useChangePasswordMutation,
	useDeleteAccountMutation,
} from '../../../queries/userQueries';

export const ChangePassContext = createContext({
	isPending: false,
	isSuccess: false,
	error: { error: false, message: '' },
});

const AccountSettings = () => {
	const { user } = useContext(UserContext);

	const [showModal, setShowModal] = useState(false);

	const handleToggleModal = () => setShowModal(!showModal);

	const { mutate: deleteAccount } = useDeleteAccountMutation();
	const changePassData = useChangePasswordMutation();
	const { mutate: changePassword, isSuccess, isPending } = changePassData;

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

	const handleResetFormError = () => setFormError({ error: false, message: '' });

	const [error, setFormError] = useCombineErrors([changePassData as MutationError]);

	return (
		<Container>
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
		</Container>
	);
};

export default AccountSettings;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";
