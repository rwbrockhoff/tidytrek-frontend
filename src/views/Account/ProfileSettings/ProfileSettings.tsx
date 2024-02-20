import styled from 'styled-components';
import ProfileForm from '../../../components/Account/ProfileForm/ProfileForm';
import {
	useGetProfileSettingsQuery,
	useAddSocialLinkMutation,
	useDeleteSocialLinkMutation,
	useEditProfileMutation,
	useDeleteProfilePhotoMutation,
} from '../../../queries/userProfileQueries';
import { cleanUpLink } from '../../../shared/ui/CustomLinks';

export type UserInfo = {
	userBio: string;
	userLocation: string;
};

const ProfileSettings = () => {
	const { data } = useGetProfileSettingsQuery();
	const { profileSettings, socialLinks = [] } = data || {};

	const { mutate: addSocialLink, isPending } = useAddSocialLinkMutation();
	const { mutate: deleteSocialLink, isPending: isPendingDeleteItem } =
		useDeleteSocialLinkMutation();
	const { mutate: editProfile } = useEditProfileMutation();
	const { mutate: deleteProfilePhoto } = useDeleteProfilePhotoMutation();

	const handleAddSocialLink = (service: string, socialLink: string) => {
		const cleanLink = cleanUpLink(socialLink);
		addSocialLink({ service, socialLink: cleanLink });
	};

	const handleDeleteSocialLink = (socialLinkId: number | undefined) => {
		if (socialLinkId && !isPendingDeleteItem) deleteSocialLink(socialLinkId);
	};

	const handleEditProfile = (userInfo: UserInfo) => editProfile(userInfo);

	return (
		<Container>
			<ProfileForm
				settings={profileSettings}
				socialLinks={socialLinks}
				isPending={isPending}
				addLink={handleAddSocialLink}
				deleteLink={handleDeleteSocialLink}
				editProfile={handleEditProfile}
				deleteProfilePhoto={deleteProfilePhoto}
			/>
		</Container>
	);
};

export default ProfileSettings;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
