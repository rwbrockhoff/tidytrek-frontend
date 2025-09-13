import { Stack } from '@/components/layout';
import { SegmentGroup } from '@/components/primitives';
import { SocialLinks } from '../components/profile-management/social-links';
import { AvatarSettings } from '../components/profile-management/avatar-settings';
import { ProfileFormFields } from '../components/profile-management/profile-form-fields';
import { ProfilePalette } from '../components/profile-management/profile-palette-section';
import { useGetProfileSettingsQuery } from '@/queries/profile-settings-queries';
import { useProfileForm } from '../hooks/use-profile-form';
import { AccountSkeleton } from '../components/shared/account-skeleton';

export const ProfileSettings = () => {
	const { data, isLoading } = useGetProfileSettingsQuery();
	const { profileInfo, socialLinks = [] } = data || {};
	
	const {
		userInfo,
		isProfileChanged,
		isSuccess,
		isError,
		error,
		formErrors,
		handleInput,
		handleEditProfile,
		handleGenerateUsername,
	} = useProfileForm({ profileInfo });

	if (isLoading) return <AccountSkeleton />;

	const { profilePhotoUrl } = profileInfo || {};
	
	return (
		<Stack>
			<SegmentGroup>
				<AvatarSettings profilePhotoUrl={profilePhotoUrl} />
				<ProfileFormFields
					userInfo={userInfo}
					isProfileChanged={isProfileChanged}
					isSuccess={isSuccess}
					isError={isError}
					error={error}
					formErrors={formErrors}
					onInput={handleInput}
					onSubmit={handleEditProfile}
					onGenerateUsername={handleGenerateUsername}
				/>
				<SocialLinks socialLinks={socialLinks} />
				<ProfilePalette />
			</SegmentGroup>
		</Stack>
	);
};
