import { useContext } from 'react';
import { Flex } from '@radix-ui/themes';
import { UserContext } from './account';
import { AccountForm } from '../components/account-form/account-form';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import supabase from '@/api/supabaseClient';

export const AccountSettings = () => {
	const { user } = useContext(UserContext);

	const { mutate: deleteAccount } = useDeleteAccountMutation();

	const handleDeleteAccount = async () => {
		deleteAccount();
		await supabase.auth.signOut();
	};

	return (
		<Flex direction="column">
			<AccountForm user={user} deleteAccount={handleDeleteAccount} />
		</Flex>
	);
};
