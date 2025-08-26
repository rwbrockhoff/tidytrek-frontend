import { useAuth } from '@/hooks/auth/use-auth';
import { SegmentGroup } from '@/components/primitives';
import { PasswordForm } from '../components/account-management/account-form/password-form/password-form';
import { AccountInfoDisplay } from '../components/account-management/account-info-display';
import { DeleteAccountSection } from '../components/account-management/delete-account-section';
import { UserPreferencesSection } from '../components/account-management/user-preferences-section';
import { AccountSkeleton } from '../components/account-skeleton';

export const AccountSettings = () => {
	const { user, isLoading } = useAuth();

	if (isLoading || !user) return <AccountSkeleton />;

	return (
		<SegmentGroup>
			<AccountInfoDisplay user={user} />
			<UserPreferencesSection />
			<PasswordForm />
			<DeleteAccountSection />
		</SegmentGroup>
	);
};
