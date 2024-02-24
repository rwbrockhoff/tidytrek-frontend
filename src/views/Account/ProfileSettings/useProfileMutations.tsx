import {
	useAddSocialLinkMutation,
	useDeleteSocialLinkMutation,
	useEditProfileMutation,
	useUploadProfilePhotoMutation,
	useDeleteProfilePhotoMutation,
} from '../../../queries/profileSettingsQueries';

export const useProfileSettingsMutations = () => {
	const addSocialLink = useAddSocialLinkMutation();
	const deleteSocialLink = useDeleteSocialLinkMutation();
	const editProfile = useEditProfileMutation();
	const uploadProfilePhoto = useUploadProfilePhotoMutation();
	const deleteProfilePhoto = useDeleteProfilePhotoMutation();

	return {
		addSocialLink,
		deleteSocialLink,
		editProfile,
		uploadProfilePhoto,
		deleteProfilePhoto,
	};
};
