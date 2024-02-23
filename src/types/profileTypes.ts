import { Pack } from './packTypes';
import { UserNames } from './userTypes';

export type InitialState = {
	profileSettings: ProfileSettings;
	socialLinks: SocialLink[];
};

export type ProfileSettings = {
	userBio: string;
	userLocation: string;
	profilePhotoUrl: string;
	backgroundPhotoUrl: string;
};

export type ProfileInfo = {
	profileSettings: ProfileSettings;
	socialLinks: SocialLink[];
	user: UserNames;
};

export type UserProfile = {
	userProfile: ProfileInfo;
	packThumbnailList: Pack[];
};

export type SocialLinkInfo = {
	socialName: string;
	color: string;
	icon?: React.ReactNode;
};

export type SocialObject = {
	[K: string]: SocialLinkInfo;
};

export type SocialLink = {
	socialLinkName: string;
	socialLinkUrl: string;
	socialLinkListId: number;
	socialLinkId: number;
	userId: number;
};
