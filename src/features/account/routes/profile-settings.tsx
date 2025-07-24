import { ProfileForm } from '../components';
import { useGetProfileSettingsQuery } from '@/queries/profile-settings-queries';

export const ProfileSettings = () => {
	const { data, isLoading } = useGetProfileSettingsQuery();
	const { profileInfo, socialLinks = [] } = data || {};

	if (isLoading) return null;

	return <ProfileForm profileInfo={profileInfo} socialLinks={socialLinks} />;
};
