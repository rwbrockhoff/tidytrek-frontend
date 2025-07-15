import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { Stack } from '@/components/layout';
import { Segment, SegmentGroup } from '@/components/primitives';
import { SocialLinks } from '../social-links';
import { AvatarSettings } from '../avatar-settings';
import { ProfileFormFields } from '../profile-form-fields';
import { useProfileForm } from '../../../hooks/use-profile-form';

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
				<Segment>
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
				</Segment>
				<Segment>
					<SocialLinks socialLinks={socialLinks} />
				</Segment>
			</SegmentGroup>
		</Stack>
	);
};
