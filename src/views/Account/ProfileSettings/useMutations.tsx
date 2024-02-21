import {
	useAddSocialLinkMutation,
	useDeleteSocialLinkMutation,
	useEditProfileMutation,
	useUploadProfilePhotoMutation,
	useDeleteProfilePhotoMutation,
} from '../../../queries/userProfileQueries';

export const useProfileSettingsMutations = () => {
	const addSocialLink = useAddSocialLinkMutation();
	const deleteSocialLink = useDeleteSocialLinkMutation();
	const editProfile = useEditProfileMutation();
	const uploadPhoto = useUploadProfilePhotoMutation();
	const deleteProfilePhoto = useDeleteProfilePhotoMutation();

	return {
		addSocialLink,
		deleteSocialLink,
		editProfile,
		uploadPhoto,
		deleteProfilePhoto,
	};
};
