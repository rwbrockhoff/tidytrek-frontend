import { Pack } from './packTypes';

export type InitialState = {
	profileInfo: ProfileInfo;
	socialLinks: SocialLink[];
};

export type ProfileInfo = {
	userBio: string;
	userLocation: string;
	firstName: string;
	username: string;
	trailName: string;
	profilePhotoUrl: string;
	bannerPhotoUrl: string;
};

export type UserInfo = {
	userBio: string;
	userLocation: string;
	username: string;
	trailName: string;
};

export type UserProfile = {
	profileInfo: ProfileInfo;
	socialLinks: SocialLink[];
};

export type UserProfileWithPack = {
	userProfile: UserProfile;
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
