import { Flex } from '@radix-ui/themes';
import { useGetAuth } from '@/hooks';
import { AccountForm } from '../components/account-form/account-form';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import supabase from '@/api/supabaseClient';

export const AccountSettings = () => {
	const { user } = useGetAuth();
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
