const User = 'User';
const Pack = 'Pack';
const Packlist = 'Packlist';
const Closet = 'Closet';
const Guest = 'Guest';
const Profile = 'Profile';
const ProfileSettings = 'ProfileSettings';

export const userKeys = {
	all: [User] as const,
};

export const packKeys = {
	all: [Pack] as const,
	packId: (packId: number | null | undefined) => [Pack, packId] as const,
};

export const packListKeys = {
	all: [Packlist] as const,
};

export const closetKeys = {
	all: [Closet] as const,
};

export const guestKeys = {
	packId: (packId: number | null) => [Guest, packId] as const,
	username: (username: string | undefined) => [Guest, username] as const,
};

export const profileKeys = {
	all: [Profile] as const,
};

export const profileSettingsKeys = {
	all: [ProfileSettings] as const,
	username: [ProfileSettings, 'username'] as const,
};
