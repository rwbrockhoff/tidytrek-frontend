export type InitialState = {
	profileSettings: ProfileSettings;
	socialLinks: SocialLink[];
};

export type ProfileSettings = {
	userBio: string;
	profilePhotoUrl: string;
	userLocation: string;
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
