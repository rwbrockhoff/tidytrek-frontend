import { useGetAuth } from '@/hooks';
import { AccountForm } from '../components';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import supabase from '@/api/supabaseClient';

export const AccountSettings = () => {
	const { user } = useGetAuth();
	const { mutate: deleteAccount } = useDeleteAccountMutation();

	const handleDeleteAccount = async () => {
		deleteAccount();
		await supabase.auth.signOut();
	};

	return <AccountForm user={user} deleteAccount={handleDeleteAccount} />;
};
