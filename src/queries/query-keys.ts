const User = 'User';
const Pack = 'Pack';
const Closet = 'Closet';
const Guest = 'Guest';
const Profile = 'Profile';
const ProfileSettings = 'ProfileSettings';

export const userKeys = {
	all: [User] as const,
};

export const packKeys = {
	all: [Pack] as const,
	lists: () => [Pack, 'list'] as const,
	pack: (packId: number | null | undefined) => [Pack, packId] as const,
};

export const closetKeys = {
	all: [Closet] as const,
};

export const guestKeys = {
	pack: (packId: number | null) => [Guest, 'pack', packId] as const,
	user: (username: string | undefined) => [Guest, 'user', username] as const,
};

export const profileKeys = {
	all: [Profile] as const,
};

export const profileSettingsKeys = {
	all: [ProfileSettings] as const,
	username: [ProfileSettings, 'username'] as const,
};
