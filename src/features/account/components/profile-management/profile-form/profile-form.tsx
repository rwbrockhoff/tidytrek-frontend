import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { Stack } from '@/components/layout';
import { SegmentGroup } from '@/components/primitives';
import { SocialLinks } from '../social-links';
import { AvatarSettings } from '../avatar-settings';
import { ProfileFormFields } from '../profile-form-fields';
import { useProfileForm } from '../../../hooks/use-profile-form';
import { ProfilePalette } from '../profile-palette-section';

type ProfileFormProps = {
	profileInfo: ProfileInfo | undefined;
	socialLinks: SocialLink[];
};

export const ProfileForm = ({ profileInfo, socialLinks }: ProfileFormProps) => {
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
