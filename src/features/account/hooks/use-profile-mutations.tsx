import {
	useAddSocialLinkMutation,
	useDeleteSocialLinkMutation,
	useEditProfileMutation,
	useUploadProfilePhotoMutation,
	useDeleteProfilePhotoMutation,
	useUploadBannerPhotoMutation,
} from '@/queries/profile-settings-queries';

export const useProfileSettingsMutations = () => {
	const addSocialLink = useAddSocialLinkMutation();
	const deleteSocialLink = useDeleteSocialLinkMutation();
	const editProfile = useEditProfileMutation();
	const uploadProfilePhoto = useUploadProfilePhotoMutation();
	const deleteProfilePhoto = useDeleteProfilePhotoMutation();
	const uploadBannerPhoto = useUploadBannerPhotoMutation();
	return {
		addSocialLink,
		deleteSocialLink,
		editProfile,
		uploadProfilePhoto,
		deleteProfilePhoto,
		uploadBannerPhoto,
	};
};
