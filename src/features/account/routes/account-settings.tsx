import styled from 'styled-components';
import { useState, createContext, useContext } from 'react';
import { UserContext } from './account';
import { DeleteModal } from '@/components/ui';
import { AccountForm } from '../components/account-form/account-form';
import { type PasswordInfo } from '@/types/form-types';
import { validPassword, passwordRequirements } from '../../auth/utils/auth-helpers';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import supabase, { updatePassword } from '@/api/supabaseClient';

export const ChangePassContext = createContext({
	isSuccess: false,
	error: { error: false, message: '' },
});

export const AccountSettings = () => {
	const { user } = useContext(UserContext);

	const { mutate: deleteAccount } = useDeleteAccountMutation();
	const [showModal, setShowModal] = useState(false);

	const [formError, setFormError] = useState({ error: false, message: '' });
	const [formSuccess, setFormSuccess] = useState(false);

	const handleToggleModal = () => setShowModal(!showModal);

	const handleChangePassword = async (passwordInfo: PasswordInfo) => {
		// Check passwords meet requirements
		const { newPassword, confirmNewPassword, emailCode } = passwordInfo;
		if (newPassword !== confirmNewPassword)
			return handleError('Your passwords do not match.');
		if (!validPassword(newPassword)) return handleError(passwordRequirements);
		if (!emailCode) return handleError('Please include the code we sent to your email.');
		// Send request to Supabase
		const { error } = await updatePassword(newPassword, emailCode);
		if (error)
			return handleError(
				'There was an error updating your password. You might need to try again.',
			);
		else setFormSuccess(true);
	};

	const handleDeleteAccount = async () => {
		await deleteAccount();
		await supabase.auth.signOut();
	};

	const handleError = (message: string) =>
		setFormError({ error: true, message: message });

	const handleResetFormError = () => setFormError({ error: false, message: '' });

	return (
		<Container>
			<ChangePassContext.Provider value={{ isSuccess: formSuccess, error: formError }}>
				<AccountForm
					user={user}
					setError={handleError}
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
				onClickDelete={handleDeleteAccount}
			/>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";
