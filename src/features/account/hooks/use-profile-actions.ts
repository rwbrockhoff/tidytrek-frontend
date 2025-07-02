import { useCallback } from 'react';
import { type UserInfo } from '@/types/profile-types';
import { useProfileSettingsMutations } from './use-profile-mutations';
import { cleanUpLink } from '@/utils/link-utils';

export const useProfileActions = () => {
	const mutations = useProfileSettingsMutations();
	const { addSocialLink, deleteSocialLink, editProfile, deleteProfilePhoto } = mutations;

	// Add socia link
	const handleAddSocialLink = useCallback(
		(platformName: string, socialLinkUrl: string) => {
			const cleanLink = cleanUpLink(socialLinkUrl);
			addSocialLink.mutate({ platformName, socialLinkUrl: cleanLink });
		},
		[addSocialLink],
	);

	// Delete social link
	const handleDeleteSocialLink = useCallback(
		(socialLinkId: number | undefined) => {
			const { isPending, mutate } = deleteSocialLink;
			if (socialLinkId && !isPending) mutate(socialLinkId);
		},
		[deleteSocialLink],
	);

	// Edit profile
	const handleEditProfile = useCallback(
		(userInfo: UserInfo) => editProfile.mutate(userInfo),
		[editProfile],
	);

	// Delete profile photo
	const handleDeleteProfilePhoto = useCallback(
		() => deleteProfilePhoto.mutate(),
		[deleteProfilePhoto],
	);

	// Use as const to infer exact types from SimpleMutation
	return {
		addSocialLink: handleAddSocialLink,
		deleteSocialLink: handleDeleteSocialLink,
		editProfile: handleEditProfile,
		deleteProfilePhoto: handleDeleteProfilePhoto,
		// Raw mutations to use mutation status for UI changes (isPending)
		mutations,
	} as const;
};
