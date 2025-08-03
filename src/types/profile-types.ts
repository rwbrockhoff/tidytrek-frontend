import { Pack } from './pack-types';
import { Settings } from './settings-types';

export type ProfileQueryState = {
	profileInfo: ProfileInfo;
	socialLinks: SocialLink[];
};

export type ProfileInfo = {
	userId: number;
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

export type BaseProfileState = {
	userProfile: UserProfile | null;
	packThumbnailList: Pack[];
	settings: Settings | null;
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
	socialLinkUrl: string;
	socialLinkId: number;
	userId: number;
};
