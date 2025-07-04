import { type ProfileInfo, type SocialLink, type UserProfile } from '@/types/profile-types';

// Create mock data
export const createMockProfileInfo = (overrides?: Partial<ProfileInfo>): ProfileInfo => ({
	userId: 1,
	userBio: 'Love hiking and exploring the great outdoors',
	userLocation: 'Scranton, Pennsylvania',
	firstName: 'Jim',
	username: 'jim_halpert',
	trailName: 'Paper Salesman',
	profilePhotoUrl: 'https://example.com/jim.jpg',
	bannerPhotoUrl: 'https://example.com/banner.jpg',
	...overrides,
});

export const createMockSocialLinks = (): SocialLink[] => [
	{
		socialLinkUrl: 'https://instagram.com/jimhalpert',
		platformName: 'Instagram',
		socialLinkId: 1,
		userId: 1,
	},
	{
		socialLinkUrl: 'https://twitter.com/jimhalpert',
		platformName: 'Twitter',
		socialLinkId: 2,
		userId: 1,
	},
];

export const createMockUserProfile = (overrides?: Partial<UserProfile>): UserProfile => ({
	profileInfo: createMockProfileInfo(),
	socialLinks: createMockSocialLinks(),
	...overrides,
});
