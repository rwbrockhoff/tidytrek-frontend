import { SemanticICONS } from 'semantic-ui-react';

export type InitialState = {
	profileSettings: ProfileSettings;
};

export type ProfileSettings = {
	userBio: string;
	profilePhotoUrl: string;
	userLocation: string;
};

export type SocialLink = {
	socialName: SemanticICONS | undefined;
	color: string;
	icon?: React.ReactNode;
};

export type SocialObject = {
	[K: string]: SocialLink;
};
