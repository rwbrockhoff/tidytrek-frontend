import { useAuth } from '@/hooks/auth/use-auth';
import { AccountForm } from '../components';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import supabase from '@/api/supabase-client';
import { AccountSkeleton } from '../components/account-skeleton';

export const AccountSettings = () => {
	const { user, isLoading } = useAuth();
	const { mutate: deleteAccount } = useDeleteAccountMutation();

	const handleDeleteAccount = async () => {
		deleteAccount();
		await supabase.auth.signOut();
	};

	if (isLoading || !user) return <AccountSkeleton />;

	return <AccountForm user={user} deleteAccount={handleDeleteAccount} />;
};
