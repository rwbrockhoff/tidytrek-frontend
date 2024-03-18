import { useState, createContext, useContext } from 'react';
import { Flex } from '@radix-ui/themes';
import { UserContext } from './account';
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

	const [formError, setFormError] = useState({ error: false, message: '' });
	const [formSuccess, setFormSuccess] = useState(false);

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
		deleteAccount();
		await supabase.auth.signOut();
	};

	const handleError = (message: string) =>
		setFormError({ error: true, message: message });

	const handleResetFormError = () => setFormError({ error: false, message: '' });

	return (
		<Flex direction="column">
			<ChangePassContext.Provider value={{ isSuccess: formSuccess, error: formError }}>
				<AccountForm
					user={user}
					setError={handleError}
					resetFormError={handleResetFormError}
					changePassword={handleChangePassword}
					deleteAccount={handleDeleteAccount}
				/>
			</ChangePassContext.Provider>
		</Flex>
	);
};
