import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { AccountForm } from '../components';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import supabase from '@/api/supabase-client';

export const AccountSettings = () => {
	const { user, isLoading } = useGetAuth();
	const { mutate: deleteAccount } = useDeleteAccountMutation();

	const handleDeleteAccount = async () => {
		deleteAccount();
		await supabase.auth.signOut();
	};

	if (isLoading || !user) return null;

	return <AccountForm user={user} deleteAccount={handleDeleteAccount} />;
};
