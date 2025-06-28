import { Flex } from '@radix-ui/themes';
import { ProfileForm } from '../components/profile-form/profile-form';
import { useGetProfileSettingsQuery } from '@/queries/profile-settings-queries';

export const ProfileSettings = () => {
	const { data } = useGetProfileSettingsQuery();
	const { profileInfo, socialLinks = [] } = data || {};

	return (
		<Flex direction="column">
			<ProfileForm profileInfo={profileInfo} socialLinks={socialLinks} />
		</Flex>
	);
};
