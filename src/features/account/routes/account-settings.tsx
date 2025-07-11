import { useGetAuth } from '@/hooks/auth/use-get-auth';
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
