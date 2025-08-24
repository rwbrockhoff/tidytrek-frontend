import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';
import { AccountForm } from '../components';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import { AccountSkeleton } from '../components/account-skeleton';

export const AccountSettings = () => {
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();
	const { mutate: deleteAccount } = useDeleteAccountMutation();

	const handleDeleteAccount = () => {
		deleteAccount(undefined, {
			onSuccess: () => {
				navigate('/login', { replace: true, viewTransition: true });
			}
		});
	};

	if (isLoading || !user) return <AccountSkeleton />;

	return <AccountForm user={user} deleteAccount={handleDeleteAccount} />;
};
