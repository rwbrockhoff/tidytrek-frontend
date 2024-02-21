import { UserInfo } from './ProfileSettings';
import { useProfileSettingsMutations } from './useMutations';
import { cleanUpLink } from '../../../shared/ui/CustomLinks';
import { createContext, useContext } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type InternalMutation<T> = UseMutationResult<AxiosResponse<any, any>, Error, T, unknown>;

type Handlers = {
	addSocialLink: (service: string, socialLink: string) => void;
	deleteSocialLink: (socialLinkId: number | undefined) => void;
	editProfile: (userInfo: UserInfo) => void;
	deleteProfilePhoto: () => void;
};

type Mutations = {
	addSocialLink: InternalMutation<{ service: string; socialLink: string }>;
	deleteSocialLink: InternalMutation<{ socialLinkId: number | undefined }>;
	editProfile: InternalMutation<{ userInfo: UserInfo }>;
	uploadPhoto: InternalMutation<FormData>;
	deleteProfilePhoto: InternalMutation<void>;
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

	const handlers = {
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
