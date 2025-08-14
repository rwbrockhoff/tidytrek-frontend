import { ProfileForm } from '../components';
import { useGetProfileSettingsQuery } from '@/queries/profile-settings-queries';
import { AccountSkeleton } from '../components/account-skeleton';

export const ProfileSettings = () => {
	const { data, isLoading } = useGetProfileSettingsQuery();
	const { profileInfo, socialLinks = [] } = data || {};

	if (isLoading) return <AccountSkeleton />;

	return <ProfileForm profileInfo={profileInfo} socialLinks={socialLinks} />;
};
