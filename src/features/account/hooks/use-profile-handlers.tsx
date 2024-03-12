import { type UserInfo } from '../../../types/profileTypes';
import { type InternalMutation } from '../../../types/formTypes';
import { useProfileSettingsMutations } from './use-profile-mutations';
import { cleanUpLink } from '../../../components/ui/Link';
import { createContext, useContext } from 'react';

type Handlers = {
	addSocialLink: (service: string, socialLink: string) => void;
	deleteSocialLink: (socialLinkId: number | undefined) => void;
	editProfile: (userInfo: UserInfo) => void;
	deleteProfilePhoto: () => void;
};

type Mutations = {
	addSocialLink: InternalMutation<{ service: string; socialLink: string }>;
	deleteSocialLink: InternalMutation<{ socialLinkId: number | undefined }>;
	editProfile: InternalMutation<UserInfo>;
	uploadProfilePhoto: InternalMutation<FormData>;
	deleteProfilePhoto: InternalMutation<void>;
	uploadBannerPhoto: InternalMutation<FormData>;
};

type HandlerData = { handlers: Handlers; mutations: Mutations };

const useCreateHandlers = () => {
	const mutations = useProfileSettingsMutations();

	const { addSocialLink, deleteSocialLink, editProfile, deleteProfilePhoto } = mutations;

	const handleAddSocialLink = (service: string, socialLink: string) => {
		const cleanLink = cleanUpLink(socialLink);
		addSocialLink.mutate({ service, socialLink: cleanLink });
	};

	const handleDeleteSocialLink = (socialLinkId: number | undefined) => {
		const { isPending, mutate } = deleteSocialLink;
		if (socialLinkId && !isPending) mutate(socialLinkId);
	};

	const handleEditProfile = (userInfo: UserInfo) => editProfile.mutate(userInfo);

	const handleDeleteProfilePhoto = () => deleteProfilePhoto.mutate();

	const handlers: Handlers = {
		addSocialLink: handleAddSocialLink,
		deleteSocialLink: handleDeleteSocialLink,
		editProfile: handleEditProfile,
		deleteProfilePhoto: handleDeleteProfilePhoto,
	};
	return { handlers, mutations };
};

export const HandlerContext = createContext<HandlerData | {}>({});

export const useHandlers = () => useContext(HandlerContext) as HandlerData;

export const HandlerWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<HandlerContext.Provider value={useCreateHandlers()}>
			{children}
		</HandlerContext.Provider>
	);
};
