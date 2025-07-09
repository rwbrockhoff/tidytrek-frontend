import { ProfileForm } from '../components';
import { useGetProfileSettingsQuery } from '@/queries/profile-settings-queries';

export const ProfileSettings = () => {
	const { data } = useGetProfileSettingsQuery();
	const { profileInfo, socialLinks = [] } = data || {};

	return <ProfileForm profileInfo={profileInfo} socialLinks={socialLinks} />;
};
